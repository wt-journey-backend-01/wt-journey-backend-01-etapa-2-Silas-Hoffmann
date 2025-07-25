const express = require('express')
const app = express();
app.use(express.json());

const agentesRouter = require("./routes/agentesRoutes")
app.use(agentesRouter);

const casosRouter = require("./routes/casosRoutes")
app.use(casosRouter);

const PORT = 3000;

//---------------------------------------------------------------------
// excluir depois de implementar os patch
const { v4: uuidv4 } = require('uuid');
const casosRepository = require('./repositories/casosRepository')
const agentesRepository = require('./repositories/agentesRepository')
//---------------------------------------------------------------------

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
app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.status(200).send('Bem vindo ao Departamento de Policia!');
});

/*--------------------------------------------
---------------Rotas pendentes----------------
--------------------------------------------*/
app.patch('/casos/:id', (req, res) => {
    const id = req.params.id;
    res.status(200);
});

app.patch('/agentes/:id', (req, res) => {
    res.status(200);
});