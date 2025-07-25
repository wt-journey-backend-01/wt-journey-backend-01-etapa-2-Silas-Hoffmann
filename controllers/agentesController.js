const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function getAllagentes(req, res) {
    const agentes = agentesRepository.findAll();

    let html = `
            <html>
            <head>
                <title>Lista de Agentes</title>
            </head>
            <body>
                <h1>Agentes Registrados</h1>
                <div style="border: 1px solid black; border-radius: 5px; padding: 10px">
        `;
    agentes.forEach(agente => {
        html += `
                <div style="border: 1px solid black; border-radius: 5px; padding: 10px">
                    <h2><strong>${agente.nome}</strong></h2>
                    <p><strong>${agente.cargo}</strong></p>
                    <p>${agente.dataDeIncorporacao}</p>
                </div>
                <br>
            `;
    });
    html += `
                </div>
            </body>
            </html>
        `;
    res.status(200).send(html);
}
function getAgentesById(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);

    let html;

    if (!agente) {
        return res.status(404).send("<p>Agente não encontrado</p>");
    } else {
        html = `
            <html>
            <head>
                <title>Lista de Agentes</title>
            </head>
            <body>
                <h1>Agentes Encontrados</h1>
                <div style="border: 1px solid black; border-radius: 5px; padding: 10px">
                    <h2><strong>${agente.nome}</strong></h2>
                    <p><strong>${agente.cargo}</strong></p>
                    <p>${agente.dataDeIncorporacao}</p>
                </div>
            </body>
            </html>
            `
    }

    res.status(200).send(html);
}
function create(req, res) {
    const { nome, cargo, dataDeIncorporacao } = req.body;
    if (!nome) {
        return res.status(400).send("<p>Nome obrigatório</p>");
    }
    if (!cargo) {
        return res.status(400).send("<p>Cargo obrigatório</p>");
    }
    if (!dataDeIncorporacao) {
        return res.status(400).send("<p>Data de Incorporacao obrigatória</p>");
    }
    const newAgente = { id: uuidv4(), nome, dataDeIncorporacao, cargo };
    agentesRepository.add(newAgente);
    res.status(201).json(newAgente);
}
function update(req, res) {
    const id = req.params.id;
    const { nome, cargo, dataDeIncorporacao } = req.body;
    if (!nome) {
        return res.status(400).send("<p>Nome obrigatório</p>");
    }
    if (!cargo) {
        return res.status(400).send("<p>Cargo obrigatório</p>");
    }
    if (!dataDeIncorporacao) {
        return res.status(400).send("<p>Data de Incorporacao obrigatória</p>");
    }
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).send("<p>Agente nao encontrado</p>");
    }
    agente.nome = nome;
    agente.cargo = cargo;
    agente.dataDeIncorporacao = dataDeIncorporacao;
    res.status(200).json(agente);
}
function deleteAgente(req, res){
    const id = req.params.id;
    const sucesso = agentesRepository.removeById(id);
    if (!sucesso) {
        return res.status(404).send("<p>Agente nao encontrado</p>");
    }
    res.status(204).send();
}
function updateParcial(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    const { nome, cargo, dataDeIncorporacao } = req.body;
    if (!agente) {
        return res.dataDeIncorporacao(404).send("<p>Agente não encontrado</p>");
    } else {
        if (nome) {
            agente.nome = nome;
        }
        if (cargo) {
            agente.cargo = cargo;
        }
        if (dataDeIncorporacao) {
            agente.dataDeIncorporacao = dataDeIncorporacao;
        }
        res.status(200).json(agente);
    }
}

module.exports = {
    getAllagentes,
    getAgentesById,
    create,
    update,
    deleteAgente,
    updateParcial
};