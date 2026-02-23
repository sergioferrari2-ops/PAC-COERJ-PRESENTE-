import React, { useState } from 'react';
import RoleSelection from './components/RoleSelection';
import PatientView from './components/PatientView';
import HealthAgentView from './components/HealthAgentView';
import RescuerView from './components/RescuerView';
import AdminDashboard from './components/AdminDashboard';

export type Role = 'none' | 'patient' | 'agent' | 'rescuer' | 'admin';

export default function App() {
  const [role, setRole] = useState<Role>('none');

  return (
    <div className="min-h-screen bg-gray-50">
      {role === 'none' && <RoleSelection onSelectRole={setRole} />}
      {role === 'patient' && <PatientView onBack={() => setRole('none')} />}
      {role === 'agent' && <HealthAgentView onBack={() => setRole('none')} />}
      {role === 'rescuer' && <RescuerView onBack={() => setRole('none')} />}
      {role === 'admin' && <AdminDashboard onBack={() => setRole('none')} />}
    </div>
  );
}
