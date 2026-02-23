import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, CheckCircle, Phone } from 'lucide-react';

export default function RescuerView({ onBack }: { onBack: () => void }) {
  const [activeRequest, setActiveRequest] = useState<any | null>(null);
  const [status, setStatus] = useState<'a_caminho' | 'no_local' | 'transportando'>('a_caminho');
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);

  const fetchSolicitacoes = () => {
    fetch('/api/solicitacoes').then(r => r.json()).then(setSolicitacoes);
  };

  useEffect(() => {
    fetchSolicitacoes();
    const interval = setInterval(fetchSolicitacoes, 5000);
    return () => clearInterval(interval);
  }, []);

  const pendingRequests = solicitacoes.filter(s => s.status === 'Pendente');

  const handleAccept = async (req: any) => {
    try {
      await fetch(`/api/solicitacoes/${req.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Aceito' })
      });
      setActiveRequest(req);
      setStatus('a_caminho');
      fetchSolicitacoes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinish = async () => {
    try {
      await fetch(`/api/solicitacoes/${activeRequest.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Concluído' })
      });
      
      await fetch('/api/historico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solicitacao: activeRequest.id,
          paciente: activeRequest.nomePaciente,
          agente: activeRequest.origem === 'Agente' ? 'Agente de Saúde' : '-',
          socorrista: 'Pedro Almeida',
          data: new Date().toISOString().split('T')[0],
          hora: new Date().toTimeString().split(' ')[0].slice(0, 5),
          resultado: 'Concluído'
        })
      });

      setActiveRequest(null);
      fetchSolicitacoes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative">
      <header className="bg-red-600 text-white p-4 flex items-center">
        <button onClick={onBack} className="mr-4"><ArrowLeft /></button>
        <h1 className="text-xl font-bold">Área do Socorrista</h1>
      </header>

      {!activeRequest ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Chamados Pendentes</h2>
          {pendingRequests.map(req => (
            <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{req.nomePaciente}</h3>
                  <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded-full">Urgente</span>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                    <span><strong>Origem:</strong> {req.enderecoPaciente}</span>
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-red-400 flex-shrink-0" />
                    <span><strong>Destino:</strong> {req.postoSaude}</span>
                  </div>
                  {req.observacoes && (
                    <div className="text-sm text-gray-500 italic mt-2">
                      Obs: {req.observacoes}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 p-3 flex gap-3">
                <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-100">
                  Recusar
                </button>
                <button 
                  onClick={() => handleAccept(req)}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                >
                  Aceitar
                </button>
              </div>
            </div>
          ))}
          {pendingRequests.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              Nenhum chamado pendente no momento.
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="bg-white p-4 shadow-sm z-10">
            <h2 className="font-bold text-lg text-gray-900">{activeRequest.nomePaciente}</h2>
            <p className="text-sm text-gray-600">{activeRequest.enderecoPaciente} → {activeRequest.postoSaude}</p>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm">
                <Phone className="w-4 h-4 mr-2" /> Ligar
              </button>
              <button className="flex-1 flex items-center justify-center py-2 bg-blue-100 text-blue-700 rounded-lg font-medium text-sm">
                <Navigation className="w-4 h-4 mr-2" /> Rotas
              </button>
            </div>
          </div>

          <div className="flex-1 bg-gray-200 relative">
            <div className="absolute inset-0 opacity-50 bg-[url('https://picsum.photos/seed/map2/400/600')] bg-cover bg-center mix-blend-multiply"></div>
            
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path d="M 100 100 Q 200 150 150 300 T 300 400" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 8" />
            </svg>
            
            <div className="absolute top-[100px] left-[100px] transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            </div>
            <div className="absolute top-[400px] left-[300px] transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="space-y-3">
              <button 
                onClick={() => setStatus('no_local')}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-colors ${
                  status === 'a_caminho' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}
                disabled={status !== 'a_caminho'}
              >
                {status !== 'a_caminho' && <CheckCircle className="w-5 h-5 mr-2" />}
                Cheguei no Local
              </button>
              
              <button 
                onClick={() => setStatus('transportando')}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-colors ${
                  status === 'no_local' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}
                disabled={status !== 'no_local'}
              >
                {status === 'transportando' && <CheckCircle className="w-5 h-5 mr-2" />}
                Paciente Embarcado
              </button>

              <button 
                onClick={handleFinish}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-colors ${
                  status === 'transportando' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-400'
                }`}
                disabled={status !== 'transportando'}
              >
                Finalizar Transporte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
