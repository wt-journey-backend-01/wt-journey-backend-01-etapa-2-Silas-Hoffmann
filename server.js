const express = require('express')
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
    res.send('Servidor do Departamento de Polícia rodando em localhost:3000');
});

/*--------------------------------------------
---------------Rotas dos casos----------------
--------------------------------------------*/
app.post('/casos', (req, res) => {
    
});

app.delete('/casos/:id', (req, res) => {
    
});

app.get('/casos', (req, res) => {
    
});

app.get('/casos/:id', (req, res) => {
    
});

app.put('/casos/:id', (req, res) => {
    
});

app.patch('/casos/:id', (req, res) => {
    
});

/*--------------------------------------------
--------------Rotas dos agentes---------------
--------------------------------------------*/
app.post('/agentes', (req, res) => {
    
});

app.delete('/agentes/:id', (req, res) => {
    
});

app.get('/agentes', (req, res) => {
    
});

app.get('/agentes/:id', (req, res) => {
    
});

app.put('/agentes/:id', (req, res) => {
    
});

app.patch('/agentes/:id', (req, res) => {
    
});