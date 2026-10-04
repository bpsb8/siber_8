const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Array penyimpanan data aduan sementara di memori server
const feedbackList = [];

// API Endpoint: Menerima Aduan Baru
app.post('/api/feedback', (req, res) => {
    const { nama, email, kategori, phone, pesan } = req.body;

    if (!nama || !email || !pesan) {
        return res.status(400).json({ 
            status: 'error', 
            message: 'Nama, Email, dan Pesan wajib diisi!' 
        });
    }

    const newFeedback = {
        id: Date.now(),
        nama,
        email,
        kategori: kategori || 'Umum',
        phone: phone || '-',
        pesan,
        waktu: new Date().toLocaleString('id-ID')
    };

    feedbackList.push(newFeedback);
    console.log('[BACKEND] Aduan baru masuk:', newFeedback);

    res.status(201).json({ 
        status: 'success', 
        message: 'Aduan berhasil disimpan ke server!', 
        data: newFeedback 
    });
});

// API Endpoint: Mengambil Seluruh Daftar Aduan
app.get('/api/feedback', (req, res) => {
    res.json({ 
        status: 'success', 
        total: feedbackList.length, 
        data: feedbackList 
    });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server Backend berjalan aktif di http://localhost:${PORT}`);
});