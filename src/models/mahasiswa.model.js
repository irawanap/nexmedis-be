// models/mahasiswa.model.js
const mongoose = require('mongoose');

const MahasiswaSchema = new mongoose.Schema({
  nim: {
    type: String,
    required: true,
    unique: true
  },
  nama: {
    type: String,
    required: true
  },
  alamat: {
    type: String,
    required: true
  },
  jenisKelamin: {
    type: String,
    enum: ['L', 'P'],
    required: true
  },
  umur: {
    type: Number,
    required: true
  },
  noTelepon: {
    type: String,
    required: true
  }
}, {
  collection: 'mahasiswa',
  timestamps: false
});

module.exports = mongoose.model('Mahasiswa', MahasiswaSchema);
