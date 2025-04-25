const express = require('express');
const router = express.Router();
const controller = require('../controllers/nilai.controller');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/with-mahasiswa', controller.findAllWithMahasiswa);
router.get('/summary/mahasiswa', controller.getMahasiswaSummary);
router.get('/summary/matkul', controller.findMatkulSummary);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);


module.exports = router;
