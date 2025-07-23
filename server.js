const express = require('express')
const casosRepository = require('./repositories/casosRepository')
const agentesRepository = require('./repositories/agentesRepository')
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});

/*
 ______________
|    Status    |
|--------------|
|  GET   | 200 |
|  POST  | 201 |
|  PUT   | 200 |
| PATCH  | 200 |
| DELETE | 204 |
 --------------
*/

/*--------------------------------------------
-----------------Rotas raiz-------------------
--------------------------------------------*/
app.get('/', (req, res) => {
    res.status(200).send('Servidor do Departamento de Polícia rodando em localhost:3000');
});

/*--------------------------------------------
---------------Rotas dos casos----------------
--------------------------------------------*/
app.post('/casos', (req, res) => {
    res.status(201);
});

app.delete('/casos/:id', (req, res) => {
    const id = req.params.id;
    res.status(204);
});

app.get('/casos', (req, res) => {
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
});

app.get('/casos/:id', (req, res) => {
    const id = req.params.id;
    const caso = casosRepository.findById(id);

    let html;

    if (!caso) {
        return res.status(404).send("<p>Caso não encontrado<p>");
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
});

app.put('/casos/:id', (req, res) => {
    const id = req.params.id;
    res.status(200);
});

app.patch('/casos/:id', (req, res) => {
    const id = req.params.id;
    res.status(200);
});

/*--------------------------------------------
--------------Rotas dos agentes---------------
--------------------------------------------*/
app.post('/agentes', (req, res) => {
    res.status(201);
});

app.delete('/agentes/:id', (req, res) => {
    res.status(204);
});

app.get('/agentes', (req, res) => {
    res.status(200);
});

app.get('/agentes/:id', (req, res) => {
    res.status(200);
});

app.put('/agentes/:id', (req, res) => {
    res.status(200);
});

app.patch('/agentes/:id', (req, res) => {
    res.status(200);
});