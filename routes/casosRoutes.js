const express = require('express')
const router = express.Router();
const casosController = require('../controllers/casosController');
app.use('/casos', casosRouter);

router.get('/', casosController.getAllcasos);
router.get('/:id', casosController.getCasosById);
router.post('/', casosController.create);
router.put('/:id', casosController.update);
router.patch('/:id', casosController.updateParcial);
router.delete('/:id', casosController.deleteCaso);

module.exports = router