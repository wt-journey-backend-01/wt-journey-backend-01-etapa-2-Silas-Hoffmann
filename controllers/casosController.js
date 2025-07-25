const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

const { v4: uuidv4 } = require('uuid');

function getAllcasos(req, res) {
    const casos = casosRepository.findAll();

    let html = `
            <html>
            <head>
                <title>Lista de Casos</title>
            </head>
            <body>
                <h1>Casos Registrados</h1>
                <div style="border: 1px solid black; border-radius: 5px; padding: 10px">
        `;
    casos.forEach(caso => {
        html += `
                <div style="border: 1px solid black; border-radius: 5px; padding: 10px">
                    <h2><strong>${caso.titulo}</strong></h2>
                    <p><strong>${caso.status}</strong></p>
                    <p>${caso.descricao}</p>
                    <p>Agente responsável: ${caso.agente_id}</p>
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
function getCasosById(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);

    let html;

    if (!caso) {
        return res.status(404).send("<p>Caso não encontrado</p>");
    } else {
        html = `
            <html>
            <head>
                <title>Lista de Casos</title>
            </head>
            <body>
                <h1>Casos Encontrados</h1>
                <div style="border: 1px solid black; border-radius: 5px; padding: 10px">
                    <h2><strong>${caso.titulo}</strong></h2>
                    <p><strong>${caso.status}</strong></p>
                    <p>${caso.descricao}</p>
                    <p>Agente responsável: ${caso.agente_id}</p>
                </div>
            </body>
            </html>
            `
    }

    res.status(200).send(html);
}
function create(req, res) {
    const { titulo, descricao, status, agente_nome } = req.body;
    if (!titulo) {
        return res.status(400).send("<p>Titulo obrigatorio</p>");
    }
    if (!descricao) {
        return res.status(400).send("<p>Descrição obrigatoria</p>");
    }
    if (!status) {
        return res.status(400).send("<p>Status obrigatorio (aberto / solucionado)</p>");
    }
    if (status != 'aberto' && status != 'solucionado') {
        return res.status(400).send("<p>Status deve ser 'aberto' ou 'solucionado'</p>");
    }
    if (!agente_nome) {
        return res.status(400).send("<p>Agente responsável obrigatorio</p>");
    }
    const agente = agentesRepository.findByNome(agente_nome);
    if (!agente) {
        return res.status(404).send("<p>Agente nao encontrado</p>");
    }
    const newCaso = { id: uuidv4(), titulo, descricao, status, agente_id: agente.id };
    casosRepository.add(newCaso);
    res.status(201).json(newCaso);
}
function update(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);
    const { titulo, descricao, status, agente_nome } = req.body;
    if (!caso) {
        return res.status(404).send("<p>Caso não encontrado</p>");
    } else {
        if (!titulo) {
            return res.status(400).send("<p>Titulo obrigatorio</p>");
        }
        if (!descricao) {
            return res.status(400).send("<p>Descrição obrigatoria</p>");
        }
        if (!status) {
            return res.status(400).send("<p>Status obrigatorio (aberto / solucionado)</p>");
        }
        if (status != 'aberto' && status != 'solucionado') {
            return res.status(400).send("<p>Status deve ser 'aberto' ou 'solucionado'</p>");
        }
        if (!agente_nome) {
            return res.status(400).send("<p>Agente responsável obrigatorio</p>");
        }
        const agente = agentesRepository.findByNome(agente_nome);
        if (!agente) {
            return res.status(404).send("<p>Agente nao encontrado</p>");
        }
        caso.titulo = titulo;
        caso.descricao = descricao;
        caso.status = status;
        caso.agente_id = agente.id;
        res.status(200).json(caso);
    }
}
function updateParcial(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);
    const { titulo, descricao, status, agente_nome } = req.body;
    if (!caso) {
        return res.status(404).send("<p>Caso não encontrado</p>");
    } else {
        if (titulo) {
            caso.titulo = titulo;
        }
        if (descricao) {
            caso.descricao = descricao;
        }
        if (status) {
            if (status != 'aberto' && status != 'solucionado') {
                return res.status(400).send("<p>Status deve ser 'aberto' ou 'solucionado'</p>");
            }
            caso.status = status;
        }

        if (agente_nome) {
            const agente = agentesRepository.findByNome(agente_nome);
            if (!agente) {
                return res.status(404).send("<p>Agente nao encontrado</p>");
            } else {
                caso.agente_id = agente.id;
            }
        }
        res.status(200).json(caso);
    }
}
function deleteCaso(req, res) {
    const id = req.params.id;
    const sucesso = casosRepository.removeById(id);
    if (!sucesso) {
        return res.status(404).send("<p>Caso não encontrado</p>");
    }
    res.status(204).send();
}

module.exports = {
    getAllcasos,
    getCasosById,
    create,
    update,
    deleteCaso,
    updateParcial
}