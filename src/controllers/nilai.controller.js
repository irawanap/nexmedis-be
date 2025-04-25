const NilaiMahasiswa = require('../models/nilaiMahasiswa.model');
const Mahasiswa = require('../models/mahasiswa.model');

// Tambah Nilai
exports.create = async (req, res) => {
  try {
    const { nim } = req.body;

    // Cek apakah mahasiswa dengan NIM ini ada
    const mahasiswa = await Mahasiswa.findOne({ nim });
    if (!mahasiswa) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    const nilai = new NilaiMahasiswa(req.body);
    const saved = await nilai.save();
    res.status(201).json(saved);
    
  } catch (err) {
    if (err.code === 11000) {
      // Duplikat data (karena index unik nim + kodeMk)
      return res.status(400).json({ message: "Data nilai untuk mata kuliah ini sudah ada" });
    }
    res.status(400).json({ error: err.message });
  }
};

// Get Semua Nilai dengan Info Mahasiswa
exports.findAll = async (req, res) => {
    try {
      const data = await NilaiMahasiswa.find().populate('nim');
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Update Nilai berdasarkan ID
exports.update = async (req, res) => {
  try {
    const updated = await NilaiMahasiswa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Nilai tidak ditemukan" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Hapus Nilai berdasarkan ID
exports.delete = async (req, res) => {
  try {
    const deleted = await NilaiMahasiswa.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Nilai tidak ditemukan" });
    }
    res.json({ message: "Nilai berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//get semua nilai+mahasiswa
exports.findAllWithMahasiswa = async (req, res) => {
  try {
    const data = await NilaiMahasiswa.find().populate({
      path: 'nim',
      model: 'Mahasiswa',
      localField: 'nim',
      foreignField: 'nim',
      justOne: true
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Statistik Per Mahasiswa
exports.getMahasiswaSummary = async (req, res) => {
  try {
    const result = await NilaiMahasiswa.aggregate([
      {
        $lookup: {
          from: "mahasiswa",
          localField: "nim",
          foreignField: "nim",
          as: "mahasiswa"
        }
      },
      { $unwind: "$mahasiswa" },
      {
        $group: {
          _id: "$nim",
          nama: { $first: "$mahasiswa.nama" },
          nilaiTertinggi: { $max: "$nilaiAngka" },
          nilaiTerendah: { $min: "$nilaiAngka" },
          rataRata: { $avg: "$nilaiAngka" },
          jumlahMk: { $sum: 1 },
          dataMk: {
            $push: {
              namaMk: "$namaMk",
              nilaiAngka: "$nilaiAngka"
            }
          }
        }
      },
      {
        $addFields: {
          mkNilaiTertinggi: {
            $reduce: {
              input: "$dataMk",
              initialValue: { namaMk: "", nilaiAngka: -Infinity },
              in: {
                $cond: [
                  { $gt: ["$$this.nilaiAngka", "$$value.nilaiAngka"] },
                  "$$this",
                  "$$value"
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          nim: "$_id",
          nama: 1,
          nilaiTertinggi: 1,
          nilaiTerendah: 1,
          rataRata: { $round: ["$rataRata", 1] },
          jumlahMk: 1,
          mataKuliahTertinggi: "$mkNilaiTertinggi.namaMk"
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Statistik Per Mata Kuliah
exports.findMatkulSummary = async (req, res) => {
  try {
    const result = await NilaiMahasiswa.aggregate([
      {
        $lookup: {
          from: 'mahasiswa',
          localField: 'nim',
          foreignField: 'nim',
          as: 'mahasiswaData'
        }
      },
      {
        $unwind: '$mahasiswaData'
      },
      {
        $group: {
          _id: { kodeMk: '$kodeMk', namaMk: '$namaMk' },
          jumlahNilaiAatauB: {
            $sum: {
              $cond: [{ $in: ['$nilaiHuruf', ['A', 'B']] }, 1, 0]
            }
          },
          rataNilaiUmur20to22: {
            $avg: {
              $cond: [
                { $and: [
                  { $gt: ['$mahasiswaData.umur', 20] },
                  { $lt: ['$mahasiswaData.umur', 22] }
                ]},
                '$nilaiAngka',
                null 
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          KodeMk: '$_id.kodeMk',
          NamaMk: '$_id.namaMk',
          'Jumlah mahasiswa yang mendapat nilai A atau B': '$jumlahNilaiAatauB',
          'Nilai rata-rata pada mahasiswa yang berumur lebih dari 20 dan kurang dari 22': {
            $ifNull: [
              { $round: ['$rataNilaiUmur20to22', 1] },
              null 
            ]
          }
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
