const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswa.controller');

router.post('/', mahasiswaController.create);
router.get('/', mahasiswaController.findAll);
router.get('/:nim', mahasiswaController.findOne);
router.put('/:nim', mahasiswaController.update);
router.delete('/:nim', mahasiswaController.delete);

module.exports = router;
