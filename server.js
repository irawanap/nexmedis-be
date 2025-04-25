require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;


//db connect
require('./src/config/db.config');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const mahasiswaRoutes = require('./src/routes/mahasiswa.routes');
const nilaiRoutes = require('./src/routes/nilai.routes');

app.use('/api/mahasiswa', mahasiswaRoutes);
app.use('/api/nilai', nilaiRoutes);

app.use('/nilai', nilaiRoutes);

//run server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}!`);
});