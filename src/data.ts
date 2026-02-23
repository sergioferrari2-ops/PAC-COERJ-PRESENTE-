import { Paciente, Agente, Solicitacao, Socorrista, Historico } from './types';

export const pacientesData: Paciente[] = [
  { id: "P001", nome: "Maria Silva", endereco: "Rua das Flores, 120", postoSaude: "Posto Central", dataConsulta: "25/02/2026", horaConsulta: "09:00", idaVolta: "Ida e Volta", acompanhante: "Sim", agenteResponsavel: "João Santos" },
  { id: "P002", nome: "Carlos Souza", endereco: "Av. Brasil, 450", postoSaude: "Posto Norte", dataConsulta: "26/02/2026", horaConsulta: "14:30", idaVolta: "Ida", acompanhante: "Não", agenteResponsavel: "Ana Lima" },
  { id: "P003", nome: "Joana Costa", endereco: "Rua Verde, 88", postoSaude: "Posto Sul", dataConsulta: "27/02/2026", horaConsulta: "10:00", idaVolta: "Ida e Volta", acompanhante: "Sim", agenteResponsavel: "Marcos Dias" }
];

export const agentesData: Agente[] = [
  { id: "A001", nome: "João Santos", postoSaude: "Posto Central", endereco: "Rua das Palmeiras, 50", solicitacao: "Sim", dataConsulta: "25/02/2026", horaConsulta: "09:00", idaVolta: "Ida e Volta", observacoes: "Paciente com mobilidade reduzida" },
  { id: "A002", nome: "Ana Lima", postoSaude: "Posto Norte", endereco: "Av. Rio Branco, 200", solicitacao: "Sim", dataConsulta: "26/02/2026", horaConsulta: "14:30", idaVolta: "Ida", observacoes: "Precisa de cadeira de rodas" },
  { id: "A003", nome: "Marcos Dias", postoSaude: "Posto Sul", endereco: "Rua Azul, 300", solicitacao: "Sim", dataConsulta: "27/02/2026", horaConsulta: "10:00", idaVolta: "Ida e Volta", observacoes: "Paciente idoso, acompanhante" }
];

export const solicitacoesData: Solicitacao[] = [
  { id: "S001", origem: "Paciente", nomePaciente: "Maria Silva", enderecoPaciente: "Rua das Flores, 120", postoSaude: "Posto Central", data: "25/02/2026", hora: "09:00", idaVolta: "Ida e Volta", acompanhante: "Sim", status: "Pendente" },
  { id: "S002", origem: "Agente", nomePaciente: "Carlos Souza", enderecoPaciente: "Av. Brasil, 450", postoSaude: "Posto Norte", data: "26/02/2026", hora: "14:30", idaVolta: "Ida", acompanhante: "Não", status: "Aceito" },
  { id: "S003", origem: "Agente", nomePaciente: "Joana Costa", enderecoPaciente: "Rua Verde, 88", postoSaude: "Posto Sul", data: "27/02/2026", hora: "10:00", idaVolta: "Ida e Volta", acompanhante: "Sim", status: "Pendente" }
];

export const socorristasData: Socorrista[] = [
  { id: "SC001", nome: "Pedro Almeida", equipe: "Equipe Bravo", solicitacaoAceita: "S002", localizacaoPaciente: "Av. Brasil, 450", localizacaoPosto: "Posto Norte", acompanhanteConfirmado: "Não", status: "Em andamento" },
  { id: "SC002", nome: "Carla Mendes", equipe: "Equipe Alfa", solicitacaoAceita: "-", localizacaoPaciente: "-", localizacaoPosto: "-", acompanhanteConfirmado: "-", status: "Disponível" },
  { id: "SC003", nome: "Lucas Rocha", equipe: "Equipe Delta", solicitacaoAceita: "S003", localizacaoPaciente: "Rua Verde, 88", localizacaoPosto: "Posto Sul", acompanhanteConfirmado: "Sim", status: "Pendente" }
];

export const historicoData: Historico[] = [
  { id: "H001", solicitacao: "S002", paciente: "Carlos Souza", agente: "Ana Lima", socorrista: "Pedro Almeida", data: "26/02/2026", hora: "14:30", resultado: "Concluído" },
  { id: "H002", solicitacao: "S000", paciente: "Joana Costa", agente: "Marcos Dias", socorrista: "Carla Mendes", data: "24/02/2026", hora: "08:00", resultado: "Concluído" },
  { id: "H003", solicitacao: "S003", paciente: "Joana Costa", agente: "Marcos Dias", socorrista: "Lucas Rocha", data: "27/02/2026", hora: "10:00", resultado: "Concluído" }
];
