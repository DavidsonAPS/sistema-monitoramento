const express = require('express');

const router = express.Router();

const sensoresController = require(
    '../controllers/sensoresController'
);

router.get(
    '/',
    sensoresController.listarSensores
);

router.get(
    '/:id',
    sensoresController.buscarSensor
);

router.post(
    '/',
    sensoresController.criarSensor
);

router.put(
    '/:id',
    sensoresController.atualizarSensor
);

router.delete(
    '/:id',
    sensoresController.deletarSensor
);

module.exports = router;