// ==========================================
// 1. LOGIKA UTAMA SISTEM LOGIN & AUTHENTICATION
// ==========================================
function checkLogin() {
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const errorEl = document.getElementById('loginError');

    if (user === 'barapratama' && pass === 'barakuda46') {
        document.getElementById('loginOverlay').style.display = 'none';
        document.body.classList.remove('logged-out');
        document.body.classList.add('logged-in');
        sessionStorage.setItem('isLoggedIn', 'true');
    } else {
        errorEl.style.display = 'block';
        errorEl.innerText = 'Username atau Password salah!';
    }
}

function togglePasswordVisibility() {
    const passInput = document.getElementById('loginPass');
    const toggleIcon = document.getElementById('togglePassIcon');
    
    if (passInput.type === 'password') {
        passInput.type = 'text';
        toggleIcon.innerText = '🙈';
    } else {
        passInput.type = 'password';
        toggleIcon.innerText = '👁️';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('loginOverlay').style.display = 'none';
        document.body.classList.remove('logged-out');
        document.body.classList.add('logged-in');
    }
    updateFeedbackCount();
});

// ==========================================
// 2. GALERI INFOGRAFIK PERALATAN & MODAL
// ==========================================
const galleryData = [
    {
        title: "Peralatan Selam Klasik (US Navy Mark V Heavy Gear)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV2OO96-XMF5La0367P1GbgX9mzsuRcizQ4EN6wDJqUg&s=10",
        desc: `<p>Sistem Standard Diving Dress legendaris yang menjadi fondasi sejarah penyelaman militer dan teknik komersial bawah air abad ke-20. Terdiri dari helm spun-copper 12-bolt dengan dudukan dada (breastplate), baju kanvas kedap air, serta sepatu bot bertimbal 8 kg per kaki.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Suplai Gas:</strong> Kompresor Permukaan via Umbilical</div>
            <div class="spec-item"><strong>Beban Total Alat:</strong> ± 85 - 90 kg (Satu Set)</div>
            <div class="spec-item"><strong>Operasional Maks:</strong> 60 Msw (190 Fsw) Udara</div>
            <div class="spec-item"><strong>Misi Utama:</strong> Heavy Salvage, Konstruksi Pelabuhan</div>
        </div>`
    },
    {
        title: "SCUBA Open Circuit (Self-Contained Breathing Apparatus)",
        image: "https://cdn.pixabay.com/photo/2015/03/11/15/19/divers-668777_640.jpg",
        desc: `<p>Sistem selam mandiri di mana pasokan udara bertekanan tinggi disalurkan melalui regulator dua tingkat dan seluruh hembusan napas dibuang langsung ke lingkungan perairan.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Tekanan Tabung:</strong> 200 - 232 Bar (Aluminium / Steel)</div>
            <div class="spec-item"><strong>Campuran Gas:</strong> Compressed Air / EANx (Nitrox 32-36%)</div>
            <div class="spec-item"><strong>Limit Rekreasional:</strong> Maksimal 40 Meter (130 Fsw)</div>
            <div class="spec-item"><strong>Keunggulan:</strong> Portabilitas Tinggi & Deployment Cepat</div>
        </div>`
    },
    {
        title: "Semi-Closed Circuit Rebreather (SCR)",
        image: "https://img.nauticexpo.com/images_ne/photo-g/70297-12201435.webp",
        desc: `<p>Penyelaman rebreather yang mendaur ulang sebagian gas pernapasan penyelam. CO₂ diserap oleh scrubber dan sebagian gas dibuang serta digantikan dengan gas baru dari tabung.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Efisiensi Gas:</strong> Mengurangi Buangan Gas hingga 70%</div>
            <div class="spec-item"><strong>Media Scrubber:</strong> Sofnolime / Sodalime Absorber</div>
            <div class="spec-item"><strong>Kedalaman Kerja:</strong> 0 - 100 Meter</div>
            <div class="spec-item"><strong>Aplikasi Khusus:</strong> Operasi Taktis Senyap & Riset Biologi</div>
        </div>`
    },
    {
        title: "Closed Circuit Rebreather (eCCR)",
        image: "https://www.scubadiving.com/sites/default/files/styles/small/public/scubadiving/scd0318_divehacks_scd0318_divehacks_20121101-dsc_0849-edit.jpg?itok=F-wDNR2-",
        desc: `<p>eCCR menggunakan sensor galvanic oksigen dan solenoid elektronik untuk mengontrol pO₂ secara otomatis pada setpoint konstan tanpa gelembung udara.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Manajemen pO2:</strong> Otomatis via Microprocessor Solenoid</div>
            <div class="spec-item"><strong>Gas Diluent:</strong> Normoxic / Hypoxic Trimix</div>
            <div class="spec-item"><strong>Kedalaman Operasi:</strong> 60 - 150+ Meter</div>
            <div class="spec-item"><strong>Profil Dekompresi:</strong> Sangat Efisien</div>
        </div>`
    },
    {
        title: "SSBA (Surface-Supplied Breathing Apparatus)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvrUP0Bv0v0pxG9dpR96kYenJQHrnOIccen1NtO8mL4z6d99Nj_3QLVU&s=10",
        desc: `<p>Standar keselamatan utama industri Commercial Diving. Penyelam menggunakan helm komersial (Kirby Morgan KM-37) yang disuport penuh dari permukaan via Umbilical Bundle.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Sistem Keamanan:</strong> Bailout Bottle di Punggung</div>
            <div class="spec-item"><strong>Monitoring:</strong> Suara, Kedalaman, & Video Real-time</div>
            <div class="spec-item"><strong>Batas Kedalaman:</strong> 0 - 50 Msw (Air/Nitrox)</div>
            <div class="spec-item"><strong>Standard Regulasi:</strong> IMCA / ADCI Commercial Standards</div>
        </div>`
    },
    {
        title: "Saturasi / Saturation Diving (Sat Bell System)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT59YrFA50l5tBa4Qi3xWLOXPwlQQ_eEkY9s3Pa7YQX9a-WnoAoZ4d6YSn2&s=10",
        desc: `<p>Metode penyelaman tingkat tertinggi untuk kedalaman laut dalam di mana jaringan tubuh penyelam dibiarkan jenuh total oleh campuran gas Heliox (He/O₂).</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Campuran Gas:</strong> Heliox (Mencegah Nitrogen Narcosis)</div>
            <div class="spec-item"><strong>Kedalaman Operasi:</strong> 50 - 300+ Meter</div>
            <div class="spec-item"><strong>Siklus Dekompresi:</strong> HANYA 1 Kali di Akhir Rotasi</div>
            <div class="spec-item"><strong>Dukungan Suhu:</strong> Hot Water Suit</div>
        </div>`
    },
    {
        title: "Fun & Sport Diving (Rekreasional)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYjo-ydgi2y982bOQ8qIrbSTXZDW3iHIYHSXP2gTKuZw&s=10",
        desc: `<p>Aktivitas eksplorasi bawah air non-industri yang dipatok ketat wajib berada di dalam batas kurva No-Decompression Limit (NDL).</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Batas NDL:</strong> Selalu di dalam kurva aman</div>
            <div class="spec-item"><strong>Kedalaman Maks:</strong> 18m (Open Water) / 30m (Advanced)</div>
            <div class="spec-item"><strong>Safety Rule:</strong> Safety Stop 3 Menit di Kedalaman 5m</div>
        </div>`
    },
    {
        title: "Underwater Survey, Inspection & NDT",
        image: "https://lhdiving.com.vn/UserFile/editor/images/Brochure%20Lam%20Hong%20(EDIT%202)%20Sep%202019_007.jpg",
        desc: `<p>Pekerjaan inspeksi teknis struktur bawah air untuk keperluan audit sertifikasi kelas (UWILD, Ultrasonic Thickness Testing).</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Metode NDT:</strong> UT, MPI, & ACFM Testing</div>
            <div class="spec-item"><strong>Inspeksi Anoda:</strong> CP Potential Measurement</div>
            <div class="spec-item"><strong>Output Data:</strong> Laporan Visual HD & Pemetaan Korosi</div>
        </div>`
    },
    {
        title: "Pengelasan Bawah Air (Underwater Welding)",
        image: "https://lhdiving.com.vn/UserFile/News/Category/2019_09_24_08_37_29_22.jpg",
        desc: `<p>Penyambungan konstruksi baja berisiko tinggi. Terdiri dari Wet Welding (pengelasan basah) dan Dry Hyperbaric Welding (pengelasan presisi dalam habitat kedap air).</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Sumber Arus:</strong> DC Straight Polarity (DCEN)</div>
            <div class="spec-item"><strong>Proteksi:</strong> Safety Knife Switch di Permukaan</div>
            <div class="spec-item"><strong>Kualifikasi:</strong> AWS D3.6M Class A & B Welder-Diver</div>
        </div>`
    },
    {
        title: "Pekerjaan Salvage & Subsea Refloating",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4QnHrQCnjAEwqsH0xMhDqY1zC60_fDKcjkqNVVW98AsOZgaHxi6eqXl_K&s=10",
        desc: `<p>Operasi kompleks pengangkatan rangka kapal tenggelam, pembersihan rintangan alur pelayaran, dan penanganan kargo subsea.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Alat Potong:</strong> Broco Exothermic Cutting Rods (5,500°C)</div>
            <div class="spec-item"><strong>Alat Apung:</strong> Parachute Air Lift Bags</div>
            <div class="spec-item"><strong>Prinsip Fisika:</strong> Hukum Archimedes & Displacement</div>
        </div>`
    }
];

function openGalleryModal(index) {
    const data = galleryData[index];
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalDesc').innerHTML = data.desc;
    document.getElementById('galleryModal').classList.add('active');
}

function closeGalleryModal(event) {
    if (!event || event.target === document.getElementById('galleryModal') || event.target.classList.contains('close-btn')) {
        document.getElementById('galleryModal').classList.remove('active');
    }
}

function handleImageFallback(img) {
    img.onerror = null;
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="260" viewBox="0 0 600 260"><rect width="100%" height="100%" fill="%230f172a"/><circle cx="300" cy="110" r="40" fill="%231e293b" stroke="%2338bdf8" stroke-width="4"/><path d="M280 110 L320 110 M300 90 L300 130" stroke="%2338bdf8" stroke-width="4"/><text x="50%" y="180" fill="%2338bdf8" font-family="Segoe UI, sans-serif" font-weight="bold" font-size="16" text-anchor="middle">Visual Dokumentasi Penyelaman</text></svg>';
}

function switchTab(event, tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// ==========================================
// 3. CHECKLIST & TIMER SAFETY STOP
// ==========================================
function updateProgress() {
    const checkboxes = document.querySelectorAll('#simulasi input[type="checkbox"]');
    let checked = 0;
    checkboxes.forEach(cb => { if (cb.checked) checked++; });

    const percentage = Math.round((checked / checkboxes.length) * 100);
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    progressBar.style.width = percentage + '%';
    progressText.innerText = percentage + '% Terverifikasi';

    if(percentage === 100) {
        progressText.innerText = "100% Siap! Pemeriksaan BWRAF Selesai, Safe Diving!";
        progressText.style.color = "var(--success)";
    } else {
        progressText.style.color = "var(--accent-cyan)";
    }
}

let timerInterval;
let timeLeft = 180;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').innerText = 
        `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert("Safety Stop Selesai! Anda diperbolehkan naik ke permukaan secara perlahan.");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 180;
    updateTimerDisplay();
}

// ==========================================
// 4. ALGORITMA TABEL US NAVY REV 7 (TABLE 9-7 & 9-8)
// ==========================================
const usNavyTable9_7 = [
    { depthM: 9,  ndl: 371, groups: [57, 101, 158, 245, 371] },
    { depthM: 12, ndl: 163, groups: [12, 20, 27, 36, 44, 53, 63, 73, 84, 95, 108, 121, 135, 151, 163] },
    { depthM: 15, ndl: 92,  groups: [9, 15, 21, 28, 34, 41, 48, 56, 63, 71, 80, 89, 92] },
    { depthM: 18, ndl: 60,  groups: [7, 12, 17, 22, 28, 33, 39, 45, 51, 57, 60] },
    { depthM: 21, ndl: 48,  groups: [6, 10, 14, 19, 23, 28, 32, 37, 42, 47, 48] },
    { depthM: 24, ndl: 39,  groups: [5, 9, 12, 16, 20, 24, 28, 32, 36, 39] },
    { depthM: 27, ndl: 30,  groups: [4, 7, 11, 14, 17, 21, 24, 28, 30] },
    { depthM: 30, ndl: 25,  groups: [4, 6, 9, 12, 15, 18, 21, 25] },
    { depthM: 33, ndl: 20,  groups: [3, 6, 8, 11, 14, 16, 19, 20] },
    { depthM: 36, ndl: 15,  groups: [3, 5, 7, 10, 12, 15] },
    { depthM: 39, ndl: 10,  groups: [2, 4, 6, 9, 10] },
    { depthM: 42, ndl: 10,  groups: [2, 4, 6, 8, 10] },
    { depthM: 45, ndl: 5,   groups: [2, 3, 5] }
];

const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

const usNavyTable9_8_RNT = {
    'A': [17, 12, 9, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2],
    'B': [27, 20, 15, 12, 10, 9, 7, 6, 6, 5, 4, 4, 3],
    'C': [38, 27, 21, 17, 14, 12, 11, 9, 8, 7, 6, 6, 5],
    'D': [50, 36, 28, 22, 19, 16, 14, 12, 11, 10, 9, 8, 7],
    'E': [62, 44, 34, 28, 23, 20, 17, 15, 14, 12, 10, 10, 8],
    'F': [76, 53, 41, 33, 28, 24, 21, 18, 16, 15, 12, 11, 9],
    'G': [91, 63, 48, 39, 32, 28, 24, 21, 19, 17, 14, 13, 10],
    'H': [107, 73, 56, 45, 37, 32, 28, 25, 21, 19, 16, 14, 11],
    'I': [125, 84, 63, 51, 42, 36, 31, 28, 24, 21, 18, 16, 12],
    'J': [145, 95, 71, 57, 47, 39, 34, 30, 26, 23, 20, 17, 13],
    'K': [167, 108, 80, 60, 48, 42, 36, 32, 28, 25, 21, 18, 14]
};

function getRepetitiveGroup(depth, bottomTime) {
    let row = usNavyTable9_7.find(r => r.depthM >= depth) || usNavyTable9_7[usNavyTable9_7.length - 1];
    for (let i = 0; i < row.groups.length; i++) {
        if (bottomTime <= row.groups[i]) return groupLetters[i];
    }
    return 'Z';
}

function getNewGroupAfterSIT(startGroup, sitMinutes) {
    let groupIndex = groupLetters.indexOf(startGroup);
    if (groupIndex === -1) return 'A';
    let stepsOffgas = Math.floor(sitMinutes / 35);
    return groupLetters[Math.max(0, groupIndex - stepsOffgas)];
}

function getRNT(group, depth) {
    const depthDepths = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45];
    let depthIdx = depthDepths.findIndex(d => d >= depth);
    if (depthIdx === -1) depthIdx = depthDepths.length - 1;
    let rntRow = usNavyTable9_8_RNT[group] || usNavyTable9_8_RNT['A'];
    return rntRow[depthIdx];
}

// --- KALKULATOR NDL AIR ---
function calculateNDL() {
    const depthInput = parseFloat(document.getElementById('inputDepth').value);
    const timeInput = parseInt(document.getElementById('inputTime').value);
    const resultBox = document.getElementById('resultNDLBox');

    if (!depthInput || !timeInput || depthInput <= 0 || timeInput <= 0) {
        alert("Masukkan kedalaman dan waktu yang valid!");
        return;
    }

    if (depthInput > 45) {
        resultBox.style.display = 'block';
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>⚠️ Peringatan: Kedalaman Membahayakan</h3>
            <p>Kedalaman ${depthInput}m melebihi limit udara murni US Navy (45m / 150ft).</p>