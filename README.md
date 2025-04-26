# Backend API Documentation

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)

Backend server untuk API Data mahasiswa dan nilai dengan fitur:
- CRUD Data Mahasiswa
- Manajemen Nilai Mata Kuliah
- API Documentation (Swagger/Postman)

## 🚀 Getting Started

### Prerequisites
- Node.js v20.15.0
- MongoDB (Atlas atau lokal)
- Git

### Installation
1. Clone repository:
   ```bash
   git clone https://github.com/irawanap/nexmedis-be.git



### Questin Number 3 & 4:

4. https://ibb.co.com/5P6Yp2C

   <!DOCTYPE html>
<html>
<head>
    <title>ERD for POS and Inventory System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        .erd-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
        }
        .entity {
            border: 2px solid #333;
            border-radius: 5px;
            padding: 10px;
            margin: 10px;
            width: 200px;
            background-color: #f9f9f9;
        }
        .entity-name {
            font-weight: bold;
            text-align: center;
            border-bottom: 1px solid #333;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        .attribute {
            margin-left: 10px;
        }
        .pk {
            font-weight: bold;
            color: #0066cc;
        }
        .fk {
            font-style: italic;
            color: #cc3300;
        }
        .relationship {
            text-align: center;
            margin: 10px 0;
            font-weight: bold;
        }
        .business-rules {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .rules-section {
            margin-bottom: 15px;
        }
        .rules-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <h1>Entity Relationship Diagram (ERD) for POS and Inventory System</h1>
    
    <div class="erd-container">
        <!-- Pelanggan Entity -->
        <div class="entity">
            <div class="entity-name">PELANGGAN</div>
            <div class="attribute"><span class="pk">PK</span> | id</div>
            <div class="attribute">| nama</div>
            <div class="attribute">| telepon</div>
        </div>
        
        <div class="relationship">1:N</div>
        
        <!-- Transaksi Entity -->
        <div class="entity">
            <div class="entity-name">TRANSAKSI</div>
            <div class="attribute"><span class="pk">PK</span> | id</div>
            <div class="attribute">| tanggal</div>
            <div class="attribute">| total</div>
            <div class="attribute"><span class="fk">FK</span> | pelanggan_id</div>
        </div>
        
        <div class="relationship">1:N</div>
        
        <!-- Detail Transaksi Entity -->
        <div class="entity">
            <div class="entity-name">DETAIL_TRANSAKSI</div>
            <div class="attribute"><span class="pk">PK</span> | id</div>
            <div class="attribute"><span class="fk">FK</span> | transaksi_id</div>
            <div class="attribute"><span class="fk">FK</span> | produk_id</div>
            <div class="attribute">| qty</div>
            <div class="attribute">| subtotal</div>
        </div>
        
        <div class="relationship">N:1</div>
        
        <!-- Produk Entity -->
        <div class="entity">
            <div class="entity-name">PRODUK</div>
            <div class="attribute"><span class="pk">PK</span> | id</div>
            <div class="attribute">| nama</div>
            <div class="attribute">| harga</div>
            <div class="attribute">| stok</div>
        </div>
    </div>
    
    <div class="business-rules">
        <h2>Relasi dan Business Rules</h2>
        
        <div class="rules-section">
            <div class="rules-title">Produk ↔ DetailTransaksi:</div>
            <ul>
                <li>Satu produk bisa muncul di banyak detail transaksi (One-to-Many).</li>
                <li>Setiap transaksi mengurangi stok produk.</li>
            </ul>
        </div>
        
        <div class="rules-section">
            <div class="rules-title">Transaksi ↔ DetailTransaksi:</div>
            <ul>
                <li>Satu transaksi bisa memiliki banyak detail item (One-to-Many).</li>
            </ul>
        </div>
        
        <div class="rules-section">
            <div class="rules-title">Pelanggan ↔ Transaksi:</div>
            <ul>
                <li>Satu pelanggan bisa melakukan banyak transaksi (One-to-Many).</li>
            </ul>
        </div>
    </div>
</body>
</html>
