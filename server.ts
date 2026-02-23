import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new Database("database.sqlite");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS pacientes (
    id TEXT PRIMARY KEY,
    nome TEXT,
    endereco TEXT,
    postoSaude TEXT,
    dataConsulta TEXT,
    horaConsulta TEXT,
    idaVolta TEXT,
    acompanhante TEXT,
    agenteResponsavel TEXT
  );

  CREATE TABLE IF NOT EXISTS agentes (
    id TEXT PRIMARY KEY,
    nome TEXT,
    postoSaude TEXT,
    endereco TEXT,
    solicitacao TEXT,
    dataConsulta TEXT,
    horaConsulta TEXT,
    idaVolta TEXT,
    observacoes TEXT
  );

  CREATE TABLE IF NOT EXISTS solicitacoes (
    id TEXT PRIMARY KEY,
    origem TEXT,
    nomePaciente TEXT,
    enderecoPaciente TEXT,
    postoSaude TEXT,
    data TEXT,
    hora TEXT,
    idaVolta TEXT,
    acompanhante TEXT,
    status TEXT,
    observacoes TEXT
  );

  CREATE TABLE IF NOT EXISTS socorristas (
    id TEXT PRIMARY KEY,
    nome TEXT,
    equipe TEXT,
    solicitacaoAceita TEXT,
    localizacaoPaciente TEXT,
    localizacaoPosto TEXT,
    acompanhanteConfirmado TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS historico (
    id TEXT PRIMARY KEY,
    solicitacao TEXT,
    paciente TEXT,
    agente TEXT,
    socorrista TEXT,
    data TEXT,
    hora TEXT,
    resultado TEXT
  );
`);

// Insert initial data if empty
const countPacientes = db.prepare("SELECT COUNT(*) as count FROM pacientes").get() as { count: number };
if (countPacientes.count === 0) {
  const insertPaciente = db.prepare("INSERT INTO pacientes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  insertPaciente.run("P001", "Maria Silva", "Rua das Flores, 120", "Posto Central", "25/02/2026", "09:00", "Ida e Volta", "Sim", "João Santos");
  insertPaciente.run("P002", "Carlos Souza", "Av. Brasil, 450", "Posto Norte", "26/02/2026", "14:30", "Ida", "Não", "Ana Lima");
  insertPaciente.run("P003", "Joana Costa", "Rua Verde, 88", "Posto Sul", "27/02/2026", "10:00", "Ida e Volta", "Sim", "Marcos Dias");

  const insertAgente = db.prepare("INSERT INTO agentes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  insertAgente.run("A001", "João Santos", "Posto Central", "Rua das Palmeiras, 50", "Sim", "25/02/2026", "09:00", "Ida e Volta", "Paciente com mobilidade reduzida");
  insertAgente.run("A002", "Ana Lima", "Posto Norte", "Av. Rio Branco, 200", "Sim", "26/02/2026", "14:30", "Ida", "Precisa de cadeira de rodas");
  insertAgente.run("A003", "Marcos Dias", "Posto Sul", "Rua Azul, 300", "Sim", "27/02/2026", "10:00", "Ida e Volta", "Paciente idoso, acompanhante");

  const insertSolicitacao = db.prepare("INSERT INTO solicitacoes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  insertSolicitacao.run("S001", "Paciente", "Maria Silva", "Rua das Flores, 120", "Posto Central", "25/02/2026", "09:00", "Ida e Volta", "Sim", "Pendente", "");
  insertSolicitacao.run("S002", "Agente", "Carlos Souza", "Av. Brasil, 450", "Posto Norte", "26/02/2026", "14:30", "Ida", "Não", "Aceito", "");
  insertSolicitacao.run("S003", "Agente", "Joana Costa", "Rua Verde, 88", "Posto Sul", "27/02/2026", "10:00", "Ida e Volta", "Sim", "Pendente", "");

  const insertSocorrista = db.prepare("INSERT INTO socorristas VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  insertSocorrista.run("SC001", "Pedro Almeida", "Equipe Bravo", "S002", "Av. Brasil, 450", "Posto Norte", "Não", "Em andamento");
  insertSocorrista.run("SC002", "Carla Mendes", "Equipe Alfa", "-", "-", "-", "-", "Disponível");
  insertSocorrista.run("SC003", "Lucas Rocha", "Equipe Delta", "S003", "Rua Verde, 88", "Posto Sul", "Sim", "Pendente");

  const insertHistorico = db.prepare("INSERT INTO historico VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  insertHistorico.run("H001", "S002", "Carlos Souza", "Ana Lima", "Pedro Almeida", "26/02/2026", "14:30", "Concluído");
  insertHistorico.run("H002", "S000", "Joana Costa", "Marcos Dias", "Carla Mendes", "24/02/2026", "08:00", "Concluído");
  insertHistorico.run("H003", "S003", "Joana Costa", "Marcos Dias", "Lucas Rocha", "27/02/2026", "10:00", "Concluído");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/pacientes", (req, res) => {
    const pacientes = db.prepare("SELECT * FROM pacientes").all();
    res.json(pacientes);
  });

  app.get("/api/agentes", (req, res) => {
    const agentes = db.prepare("SELECT * FROM agentes").all();
    res.json(agentes);
  });

  app.get("/api/solicitacoes", (req, res) => {
    const solicitacoes = db.prepare("SELECT * FROM solicitacoes ORDER BY id DESC").all();
    res.json(solicitacoes);
  });

  app.post("/api/solicitacoes", (req, res) => {
    const id = "S" + Date.now().toString().slice(-4);
    const { origem, nomePaciente, enderecoPaciente, postoSaude, data, hora, idaVolta, acompanhante, observacoes } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO solicitacoes (id, origem, nomePaciente, enderecoPaciente, postoSaude, data, hora, idaVolta, acompanhante, status, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, origem, nomePaciente, enderecoPaciente, postoSaude, data, hora, idaVolta, acompanhante, "Pendente", observacoes || "");
    res.json({ success: true, id });
  });

  app.put("/api/solicitacoes/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const stmt = db.prepare("UPDATE solicitacoes SET status = ? WHERE id = ?");
    stmt.run(status, id);
    
    res.json({ success: true });
  });

  app.get("/api/socorristas", (req, res) => {
    const socorristas = db.prepare("SELECT * FROM socorristas").all();
    res.json(socorristas);
  });

  app.get("/api/historico", (req, res) => {
    const historico = db.prepare("SELECT * FROM historico").all();
    res.json(historico);
  });

  app.post("/api/historico", (req, res) => {
    const id = "H" + Date.now().toString().slice(-4);
    const { solicitacao, paciente, agente, socorrista, data, hora, resultado } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO historico (id, solicitacao, paciente, agente, socorrista, data, hora, resultado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, solicitacao, paciente, agente, socorrista, data, hora, resultado);
    res.json({ success: true, id });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
  });
}

startServer();
