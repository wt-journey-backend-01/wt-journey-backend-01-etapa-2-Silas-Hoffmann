const express = require('express')
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/agentes', agentesController.getAllagentes);
router.get('/agentes/:id', agentesController.getAgentesById);
router.post('/agentes', agentesController.create);
router.put('/agentes/:id', agentesController.update);
router.patch('/agentes/:id', agentesController.updateParcial);
router.delete('/agentes/:id', agentesController.deleteAgente);

module.exports = router