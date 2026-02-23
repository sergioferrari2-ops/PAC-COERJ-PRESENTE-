import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, Ambulance } from 'lucide-react';

export default function PatientView({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'form' | 'tracking'>('form');
  const [formData, setFormData] = useState({
    nomePaciente: 'Maria Silva',
    enderecoPaciente: 'Rua das Flores, 120',
    postoSaude: 'Posto Central',
    data: new Date().toISOString().split('T')[0],
    hora: '09:00',
    idaVolta: 'Ida e Volta',
    acompanhante: false
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/solicitacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origem: 'Paciente',
          ...formData,
          acompanhante: formData.acompanhante ? 'Sim' : 'Não'
        })
      });
      if (res.ok) {
        setStep('tracking');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative">
      <header className="bg-blue-600 text-white p-4 flex items-center">
        <button onClick={onBack} className="mr-4"><ArrowLeft /></button>
        <h1 className="text-xl font-bold">Área do Paciente</h1>
      </header>

      {step === 'form' ? (
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Solicitar Transporte</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de Origem</label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                  <input 
                    type="text" 
                    className="bg-transparent w-full outline-none" 
                    placeholder="Sua localização atual" 
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
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  id="acompanhante" 
                  className="mr-2 rounded text-blue-600" 
                  checked={formData.acompanhante}
                  onChange={e => setFormData({...formData, acompanhante: e.target.checked})}
                />
                <label htmlFor="acompanhante" className="text-sm text-gray-700">Preciso de acompanhante</label>
              </div>
            </div>
            <button 
              onClick={handleSubmit}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Solicitar Ambulância
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="bg-blue-50 p-6 text-center border-b border-blue-100">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Ambulance className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-blue-900">Ambulância a Caminho</h2>
            <p className="text-blue-700 mt-1">Previsão de chegada: <span className="font-bold">5 min</span></p>
          </div>
          <div className="flex-1 bg-gray-200 relative">
            <div className="absolute inset-0 opacity-50 bg-[url('https://picsum.photos/seed/map/400/600')] bg-cover bg-center mix-blend-multiply"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-ping"></div>
            </div>
          </div>
          <div className="p-4 bg-white">
            <button 
              onClick={() => setStep('form')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
