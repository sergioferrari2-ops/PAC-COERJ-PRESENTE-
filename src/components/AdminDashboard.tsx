import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  ClipboardList, 
  Ambulance, 
  History,
  Search,
  Menu,
  Bell,
  ArrowLeft
} from 'lucide-react';

type Tab = 'pacientes' | 'agentes' | 'solicitacoes' | 'socorristas' | 'historico';

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('pacientes');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [pacientesData, setPacientesData] = useState<any[]>([]);
  const [agentesData, setAgentesData] = useState<any[]>([]);
  const [solicitacoesData, setSolicitacoesData] = useState<any[]>([]);
  const [socorristasData, setSocorristasData] = useState<any[]>([]);
  const [historicoData, setHistoricoData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/pacientes').then(r => r.json()).then(setPacientesData);
    fetch('/api/agentes').then(r => r.json()).then(setAgentesData);
    fetch('/api/solicitacoes').then(r => r.json()).then(setSolicitacoesData);
    fetch('/api/socorristas').then(r => r.json()).then(setSocorristasData);
    fetch('/api/historico').then(r => r.json()).then(setHistoricoData);
  }, []);

  const tabs = [
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'agentes', label: 'Agentes de Saúde', icon: UserPlus },
    { id: 'solicitacoes', label: 'Solicitações', icon: ClipboardList },
    { id: 'socorristas', label: 'Socorristas', icon: Ambulance },
    { id: 'historico', label: 'Histórico', icon: History },
  ] as const;

  const renderTable = () => {
    switch (activeTab) {
      case 'pacientes':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posto de Saúde</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ida/Volta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acompanhante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agente</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pacientesData.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.endereco}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.postoSaude}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.dataConsulta} às {p.horaConsulta}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.idaVolta}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.acompanhante === 'Sim' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {p.acompanhante}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.agenteResponsavel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'agentes':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posto de Saúde</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ida/Volta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agentesData.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{a.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.postoSaude}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.endereco}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${a.solicitacao === 'Sim' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {a.solicitacao}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.dataConsulta} às {a.horaConsulta}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.idaVolta}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={a.observacoes}>{a.observacoes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'solicitacoes':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ida/Volta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {solicitacoesData.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.origem}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.nomePaciente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.enderecoPaciente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.postoSaude}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.data} às {s.hora}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.idaVolta}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${s.status === 'Aceito' ? 'bg-green-100 text-green-800' : 
                          s.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'socorristas':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipe</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local. Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local. Posto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acomp.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {socorristasData.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.equipe}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.solicitacaoAceita}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.localizacaoPaciente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.localizacaoPosto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.acompanhanteConfirmado}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${s.status === 'Disponível' ? 'bg-green-100 text-green-800' : 
                          s.status === 'Em andamento' ? 'bg-blue-100 text-blue-800' : 
                          s.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'historico':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Socorrista</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historicoData.map((h) => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{h.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.solicitacao}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.paciente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.agente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.socorrista}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.data} às {h.hora}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${h.resultado === 'Concluído' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {h.resultado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-900 border-r border-gray-800 text-white">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <button onClick={onBack} className="mr-3 text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></button>
          <span className="text-lg font-bold">Admin Panel</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white border-b border-gray-800 flex items-center justify-between px-4 h-16">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3 text-gray-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></button>
          <span className="text-lg font-bold">Admin Panel</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white border-b border-gray-800">
          <nav className="px-2 pt-2 pb-3 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-base font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className={`mr-4 h-5 w-5 ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Pesquisar..."
                />
              </div>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white shadow rounded-lg">
            {renderTable()}
          </div>
        </div>
      </main>
    </div>
  );
}
