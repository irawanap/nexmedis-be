// models/nilaiMahasiswa.model.js
const mongoose = require('mongoose');

const NilaiMahasiswaSchema = new mongoose.Schema({
  nim: {
    type: String,
    ref: 'Mahasiswa',
    required: true
  },
  kodeMk: {
    type: String,
    required: true
  },
  namaMk: {
    type: String,
    required: true
  },
  nilaiAngka: {
    type: Number,
    required: true
  },
  nilaiHuruf: {
    type: String,
    required: true
  }
}, {
  collection: 'nilai_mahasiswa',
  timestamps: false
});

NilaiMahasiswaSchema.index({ nim: 1, kodeMk: 1 }, { unique: true });

module.exports = mongoose.model('NilaiMahasiswa', NilaiMahasiswaSchema);
