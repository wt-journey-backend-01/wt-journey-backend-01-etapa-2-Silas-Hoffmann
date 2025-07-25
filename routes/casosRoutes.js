const express = require('express')
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/casos', casosController.getAllcasos);
router.get('/casos/:id', casosController.getCasosById);
router.post('/casos', casosController.create);
router.put('/casos/:id', casosController.update);
//router.patch('/casos/:id', casosController.update);
router.delete('/casos/:id', casosController.deleteCaso);

module.exports = router