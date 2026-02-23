import React from 'react';
import { User, Stethoscope, Ambulance, ShieldPlus } from 'lucide-react';
import { Role } from '../App';

interface Props {
  onSelectRole: (role: Role) => void;
}

export default function RoleSelection({ onSelectRole }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <ShieldPlus className="w-20 h-20 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">Patrulha Aérea Civil</h1>
          <p className="text-gray-500 text-center mt-2">Health Transport Manager</p>
        </div>
        
        <button 
          onClick={() => onSelectRole('patient')}
          className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xl font-semibold shadow-lg flex items-center justify-center transition-colors"
        >
          <User className="mr-3 h-6 w-6" />
          Sou Paciente
        </button>

        <button 
          onClick={() => onSelectRole('agent')}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xl font-semibold shadow-lg flex items-center justify-center transition-colors"
        >
          <Stethoscope className="mr-3 h-6 w-6" />
          Sou Agente de Saúde
        </button>

        <button 
          onClick={() => onSelectRole('rescuer')}
          className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xl font-semibold shadow-lg flex items-center justify-center transition-colors"
        >
          <Ambulance className="mr-3 h-6 w-6" />
          Sou Socorrista
        </button>

        <button 
          onClick={() => onSelectRole('admin')}
          className="w-full py-4 px-6 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xl font-semibold shadow-lg flex items-center justify-center transition-colors mt-8"
        >
          Painel Administrativo
        </button>
      </div>
    </div>
  );
}
