const agentes = [
    {
        id: "2b62a6f4-1b23-4c82-87de-8cdb8ae987bc",
        nome: "Claudio de Souza",
        dataDeIncorporacao: "2025-05-20",
        cargo: "inspetor",
    
    },
    {
        id: "d3471f83-7c7f-4609-a892-bbcad6b36294",
        nome: "Silas Hoffmann",
        dataDeIncorporacao: "2023-08-21",
        cargo: "delegado",
    
    }
]

function findAll() {
    return agentes
}
function findById(id) {
    return agentes.find(agente => agente.id === id);
}
module.exports = {
    findAll,
    findById
}