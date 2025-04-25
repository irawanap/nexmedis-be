const Mahasiswa = require('../models/mahasiswa.model');

//create
exports.create = async (req, res) => {
    try {
        const data = new Mahasiswa(req.body);
        const result = await data.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//read all
exports.findAll = async (req, res) => {
    try {
        const data = await Mahasiswa.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//find one
exports.findOne = async (req, res) => {
    try {
        const data = await Mahasiswa.findOne({ nim: req.params.nim });
        if (!data) return res.status(404).json({ message: "Tidak ada data mahasiswa" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update
exports.update = async (req, res) => {
    try {
        const data = await Mahasiswa.findOneAndUpdate(
            { nim: req.params.nim },
            req.body,
            { new: true }
        );
        if (!data) return res.status(404).json({ message: "Silakan perbarui data dengan benar" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//delete 
exports.delete = async (req, res) => {
    try {
        const data = await Mahasiswa.findOneAndDelete({ nim: req.params.nim });
        if (!data) return res.status(404).json({ message: "Masukan data dengan benar" });
        res.json({ message: "Data mahasiswa berhasil di hapus" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};
