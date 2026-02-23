import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock } from 'lucide-react';

export default function HealthAgentView({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'solicitar' | 'historico'>('solicitar');
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [historico, setHistorico] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    nomePaciente: '',
    enderecoPaciente: '',
    postoSaude: 'Posto Central',
    data: new Date().toISOString().split('T')[0],
    hora: '09:00',
    idaVolta: 'Ida e Volta',
    observacoes: ''
  });

  useEffect(() => {
    fetch('/api/pacientes').then(r => r.json()).then(setPacientes);
    fetch('/api/solicitacoes').then(r => r.json()).then(setHistorico);
  }, [activeTab]);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/solicitacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origem: 'Agente',
          ...formData,
          acompanhante: 'Não'
        })
      });
      if (res.ok) {
        setActiveTab('historico');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative">
      <header className="bg-green-600 text-white p-4 flex items-center">
        <button onClick={onBack} className="mr-4"><ArrowLeft /></button>
        <h1 className="text-xl font-bold">Área do Agente</h1>
      </header>

      <div className="flex border-b bg-white">
        <button 
          className={`flex-1 py-3 text-sm font-medium text-center ${activeTab === 'solicitar' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('solicitar')}
        >
          Nova Solicitação
        </button>
        <button 
          className={`flex-1 py-3 text-sm font-medium text-center ${activeTab === 'historico' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('historico')}
        >
          Histórico
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'solicitar' ? (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Solicitar para Paciente</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
                  <select 
                    className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none"
                    value={formData.nomePaciente}
                    onChange={e => {
                      const p = pacientes.find(x => x.nome === e.target.value);
                      setFormData({
                        ...formData, 
                        nomePaciente: e.target.value,
                        enderecoPaciente: p ? p.endereco : ''
                      });
                    }}
                  >
                    <option value="">Selecione um paciente</option>
                    {pacientes.map(p => <option key={p.id} value={p.nome}>{p.nome}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de Origem</label>
                  <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                    <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                    <input 
                      type="text" 
                      className="bg-transparent w-full outline-none" 
                      placeholder="Endereço do paciente" 
                      value={formData.enderecoPaciente}
                      onChange={e => setFormData({...formData, enderecoPaciente: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posto de Saúde (Destino)</label>
                  <select 
                    className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none"
                    value={formData.postoSaude}
                    onChange={e => setFormData({...formData, postoSaude: e.target.value})}
                  >
                    <option>Posto Central</option>
                    <option>Posto Norte</option>
                    <option>Posto Sul</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                      <Calendar className="text-gray-400 w-4 h-4 mr-2" />
                      <input 
                        type="date" 
                        className="bg-transparent w-full outline-none text-sm" 
                        value={formData.data}
                        onChange={e => setFormData({...formData, data: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                    <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                      <Clock className="text-gray-400 w-4 h-4 mr-2" />
                      <input 
                        type="time" 
                        className="bg-transparent w-full outline-none text-sm" 
                        value={formData.hora}
                        onChange={e => setFormData({...formData, hora: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Viagem</label>
                  <select 
                    className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none"
                    value={formData.idaVolta}
                    onChange={e => setFormData({...formData, idaVolta: e.target.value})}
                  >
                    <option>Ida e Volta</option>
                    <option>Apenas Ida</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <textarea 
                    className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none" 
                    rows={2} 
                    placeholder="Ex: Paciente com mobilidade reduzida"
                    value={formData.observacoes}
                    onChange={e => setFormData({...formData, observacoes: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Solicitar Ambulância
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {historico.map(s => (
              <div key={s.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-gray-800">{s.nomePaciente}</div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    s.status === 'Aceito' ? 'bg-green-100 text-green-700' : 
                    s.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {s.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" /> {s.data} às {s.hora}
                </div>
                <div className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" /> {s.postoSaude}
                </div>
              </div>
            ))}
            {historico.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                Nenhum histórico encontrado.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
