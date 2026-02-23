export interface Paciente {
  id: string;
  nome: string;
  endereco: string;
  postoSaude: string;
  dataConsulta: string;
  horaConsulta: string;
  idaVolta: string;
  acompanhante: string;
  agenteResponsavel: string;
}

export interface Agente {
  id: string;
  nome: string;
  postoSaude: string;
  endereco: string;
  solicitacao: string;
  dataConsulta: string;
  horaConsulta: string;
  idaVolta: string;
  observacoes: string;
}

export interface Solicitacao {
  id: string;
  origem: string;
  nomePaciente: string;
  enderecoPaciente: string;
  postoSaude: string;
  data: string;
  hora: string;
  idaVolta: string;
  acompanhante: string;
  status: string;
}

export interface Socorrista {
  id: string;
  nome: string;
  equipe: string;
  solicitacaoAceita: string;
  localizacaoPaciente: string;
  localizacaoPosto: string;
  acompanhanteConfirmado: string;
  status: string;
}

export interface Historico {
  id: string;
  solicitacao: string;
  paciente: string;
  agente: string;
  socorrista: string;
  data: string;
  hora: string;
  resultado: string;
}
