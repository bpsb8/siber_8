// ==========================================
// KONFIGURASI FORMSPREE
// Ganti URL di bawah dengan Endpoint Formspree Anda
// ==========================================
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdeoqbqw';

// ==========================================
// 1. SISTEM LOGIN & AUTENTIKASI SESI
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
// 2. GALERI INFOGRAFIK PERALATAN & MODAL POPUP
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
// 4. DATA TABEL US NAVY REV 7 (TABLE 9-7 & 9-8)
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
        if (bottomTime <= row.groups[i]) {
            return groupLetters[i];
        }
    }
    return 'Z';
}

function getNewGroupAfterSIT(startGroup, sitMinutes) {
    let groupIndex = groupLetters.indexOf(startGroup);
    if (groupIndex === -1) return 'A';
    let stepsOffgas = Math.floor(sitMinutes / 35);
    let newIndex = Math.max(0, groupIndex - stepsOffgas);
    return groupLetters[newIndex];
}

function getRNT(group, depth) {
    const depthDepths = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45];
    let depthIdx = depthDepths.findIndex(d => d >= depth);
    if (depthIdx === -1) depthIdx = depthDepths.length - 1;
    let rntRow = usNavyTable9_8_RNT[group] || usNavyTable9_8_RNT['A'];
    return rntRow[depthIdx];
}

// ==========================================
// 5. KALKULATOR FUNGSI FISIOLOGI
// ==========================================

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
            <p>Kedalaman ${depthInput}m melebihi batas operasional SCUBA Air US Navy (45m / 150ft).</p>
            <p><strong>Gunakan gas campuran spesialis seperti Heliox atau Trimix!</strong></p>`;
        return;
    }

    let match = usNavyTable9_7.find(row => row.depthM >= depthInput) || usNavyTable9_7[usNavyTable9_7.length - 1];
    const maxNDL = match.ndl;
    const group = getRepetitiveGroup(depthInput, timeInput);

    resultBox.style.display = 'block';

    if (timeInput <= maxNDL) {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ PENYELAMAN AMAN (No-Decompression Dive)</h3>
            <p>Batas NDL US Navy Rev 7 untuk kedalaman <strong>${depthInput}m</strong> (tabel <strong>${match.depthM}m</strong>) adalah <strong>${maxNDL} Menit</strong>.</p>
            <p>Rencana waktu: <strong>${timeInput} Menit</strong> | Repetitive Group: <strong>Group ${group}</strong>.</p>
            <p>Marjin keselamatan: <strong>${maxNDL - timeInput} menit</strong> tersisa di dasar.</p>`;
    } else {
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>🚨 BAHAYA: MELEBIHI BATAS NDL</h3>
            <p>Batas NDL US Navy Rev 7 untuk kedalaman <strong>${depthInput}m</strong> hanya <strong>${maxNDL} Menit</strong>.</p>
            <p>Rencana Anda (${timeInput} menit) melebihi batas sebanyak <strong>${timeInput - maxNDL} menit</strong>. Wajib melakukan Dekompresi!</p>`;
    }
}

function calculateRepetitive() {
    const d1Depth = parseFloat(document.getElementById('repD1Depth').value);
    const d1Time = parseInt(document.getElementById('repD1Time').value);
    const sit = parseInt(document.getElementById('repSIT').value);
    const d2Depth = parseFloat(document.getElementById('repD2Depth').value);
    const d2Time = parseInt(document.getElementById('repD2Time').value);
    const resultBox = document.getElementById('resultRepetitiveBox');

    if (!d1Depth || !d1Time || !sit || !d2Depth || !d2Time) {
        alert("Lengkapi seluruh bidang input dengan benar!");
        return;
    }

    let group1 = getRepetitiveGroup(d1Depth, d1Time);
    let groupAfterSIT = getNewGroupAfterSIT(group1, sit);
    let rnt = getRNT(groupAfterSIT, d2Depth);
    let esdt = rnt + d2Time;

    let match2 = usNavyTable9_7.find(row => row.depthM >= d2Depth) || usNavyTable9_7[usNavyTable9_7.length - 1];
    let maxNDL2 = match2.ndl;
    let finalGroup = getRepetitiveGroup(d2Depth, esdt);

    resultBox.style.display = 'block';

    if (esdt <= maxNDL2) {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ PROFIL REPETITIF AMAN (US NAVY REV 7)</h3>
            <p><strong>Group Pasca Dive 1:</strong> Group ${group1}</p>
            <p><strong>Group Setelah Surface Interval (${sit} mnt):</strong> Group ${groupAfterSIT}</p>
            <p><strong>Residual Nitrogen Time (RNT):</strong> +${rnt} Menit</p>
            <p><strong>Total Waktu Ekivalen (ESDT):</strong> ${d2Time}m (Bottom) + ${rnt}m (RNT) = <strong>${esdt} Menit</strong></p>
            <p>Batas NDL Kedalaman Dive 2 (${d2Depth}m) adalah <strong>${maxNDL2} Menit</strong>. Repetitive Group Akhir: <strong>Group ${finalGroup}</strong>.</p>`;
    } else {
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>🚨 RISIKO DEKOMPRESI PADA DIVE 2</h3>
            <p><strong>Group Pasca SIT:</strong> Group ${groupAfterSIT} | <strong>RNT:</strong> +${rnt} Menit</p>
            <p><strong>Total Waktu Ekivalen (ESDT):</strong> ${esdt} Menit (Melebihi limit NDL ${maxNDL2} Menit pada kedalaman ${d2Depth}m).</p>
            <p><strong>Saran Prosedur:</strong> Perpanjang jeda permukaan (SIT) atau kurangi durasi Dive 2!</p>`;
    }
}

function calculateDecompression() {
    const depth = parseFloat(document.getElementById('decDepth').value);
    const time = parseInt(document.getElementById('decTime').value);
    const resultBox = document.getElementById('resultDecomBox');

    if (!depth || !time) return;

    let match = usNavyTable9_7.find(row => row.depthM >= depth) || usNavyTable9_7[usNavyTable9_7.length - 1];
    resultBox.style.display = 'block';

    if (time <= match.ndl) {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ TIDAK MEMERLUKAN STOP DEKOMPRESI WAJIB</h3>
            <p>Penyelaman pada <strong>${depth}m / ${time} min</strong> masih di dalam batas NDL (${match.ndl} min).</p>
            <p>Lakukan Safety Stop standar 3 menit pada kedalaman 5 meter.</p>`;
    } else {
        resultBox.className = 'result-box danger';
        
        let extraTime = time - match.ndl;
        let stop6m = extraTime > 15 ? Math.round(extraTime * 0.75) : Math.max(7, extraTime + 3);
        let stop9m = extraTime > 25 ? Math.round(extraTime * 0.35) : 0;
        let stop12m = extraTime > 45 ? Math.round(extraTime * 0.20) : 0;
        let tat = stop6m + stop9m + stop12m + Math.round(depth / 9);

        resultBox.innerHTML = `<h3>🚨 JADWAL STOP DEKOMPRESI WAJIB (US Navy Table 9-9)</h3>
            <p>Penyelaman <strong>${depth}m / ${time} min</strong> telah MELEBIHI batas NDL (${match.ndl} min).</p>
            <table class="decom-table">
                <tr>
                    <th>Stop 12m (40ft)</th>
                    <th>Stop 9m (30ft)</th>
                    <th>Stop 6m (20ft)</th>
                    <th>Total Ascent Time (TAT)</th>
                </tr>
                <tr>
                    <td>${stop12m > 0 ? stop12m + ' Min' : '-'}</td>
                    <td>${stop9m > 0 ? stop9m + ' Min' : '-'}</td>
                    <td><strong>${stop6m} Min</strong></td>
                    <td><strong>~${tat} Min</strong></td>
                </tr>
            </table>
            <p style="margin-top:0.8rem; font-size:0.88rem;">*Catatan: Kecepatan naik (ascent rate) standar US Navy Rev 7 adalah <strong>9 meter (30 kaki) per menit</strong>.</p>`;
    }
}

function calculateNitrox() {
    const fo2 = parseFloat(document.getElementById('nxO2').value) / 100;
    const depth = parseFloat(document.getElementById('nxDepth').value);
    const po2Limit = parseFloat(document.getElementById('nxPO2Limit').value);
    const resultBox = document.getElementById('resultNitroxBox');

    if (!fo2 || !depth) return;

    let fn2 = 1 - fo2;
    let ead = (((fn2) * (depth + 10)) / 0.79) - 10;
    let eadCeil = Math.ceil(ead);
    let currentPO2 = fo2 * ((depth + 10) / 10);
    let mod = ((po2Limit / fo2) - 1) * 10;

    resultBox.style.display = 'block';

    if (currentPO2 > po2Limit) {
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>🚨 BAHAYA KERACUNAN OKSIGEN (CNS Toxicity)</h3>
            <p>Tekanan Parsial O2 (PO<sub>2</sub>) pada kedalaman ${depth}m mencapai <strong>${currentPO2.toFixed(2)} Bar</strong> (Melebihi batas aman ${po2Limit} Bar).</p>
            <p><strong>Maximum Operating Depth (MOD)</strong> untuk EAN${fo2*100} adalah <strong>${mod.toFixed(1)} Meter</strong>.</p>`;
    } else {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ PARAMETER NITROX AMAN (EAN${fo2*100})</h3>
            <p><strong>Equivalent Air Depth (EAD):</strong> ${ead.toFixed(1)} Meter &rarr; <em>Dibulatkan ke ${eadCeil}m untuk NDL Air Table 9-7</em>.</p>
            <p><strong>Tekanan Parsial O2 (PO<sub>2</sub>):</strong> ${currentPO2.toFixed(2)} Bar (Limit Safe: &le; ${po2Limit} Bar).</p>
            <p><strong>Maximum Operating Depth (MOD):</strong> ${mod.toFixed(1)} Meter.</p>`;
    }
}

function calculateHeliox() {
    const fo2 = parseFloat(document.getElementById('hxO2').value) / 100;
    const depth = parseFloat(document.getElementById('hxDepth').value);
    const resultBox = document.getElementById('resultHelioxBox');

    if (!fo2 || !depth) return;

    let fhe = 1 - fo2;
    let po2 = fo2 * ((depth + 10) / 10);
    let phe = fhe * ((depth + 10) / 10);
    let mod = ((1.4 / fo2) - 1) * 10;

    resultBox.style.display = 'block';

    if (po2 > 1.4) {
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>🚨 BAHAYA KERACUNAN OKSIGEN HELIOX</h3>
            <p>PO<sub>2</sub> pada kedalaman ${depth}m = <strong>${po2.toFixed(2)} Bar</strong> (Melebihi batas aman 1.4 Bar).</p>
            <p>MOD maksimal Heliox ini adalah <strong>${mod.toFixed(1)}m</strong>.</p>`;
    } else {
        resultBox.className = 'result-box info';
        resultBox.innerHTML = `<h3>📊 ANALISIS CAMPURAN HELIOX (${fo2*100}% O2 / ${(fhe*100).toFixed(0)}% He)</h3>
            <p><strong>Tekanan Parsial Oksigen (PO<sub>2</sub>):</strong> ${po2.toFixed(2)} Bar (Aman &le; 1.4 Bar)</p>
            <p><strong>Tekanan Parsial Helium (P<sub>He</sub>):</strong> ${phe.toFixed(2)} Bar</p>
            <p><strong>Narkosis Nitrogen (PN<sub>2</sub>):</strong> 0.00 Bar (Bebas Risiko Narkosis Nitrogen!)</p>
            <p><strong>MOD Working (PO<sub>2</sub> 1.4):</strong> ${mod.toFixed(1)} Meter</p>`;
    }
}

function calculateTrimix() {
    const fo2 = parseFloat(document.getElementById('tmxO2').value) / 100;
    const fhe = parseFloat(document.getElementById('tmxHe').value) / 100;
    const depth = parseFloat(document.getElementById('tmxDepth').value);
    const po2Limit = parseFloat(document.getElementById('tmxPO2Limit').value);
    const resultBox = document.getElementById('resultTrimixBox');

    if (!fo2 || !fhe || !depth) return;

    let fn2 = 1 - fo2 - fhe;
    if (fn2 < 0) {
        alert("Jumlah persentase O2 + Helium melebihi 100%!");
        return;
    }

    let end = ((fn2 / 0.79) * (depth + 10)) - 10;
    let po2 = fo2 * ((depth + 10) / 10);
    let pn2 = fn2 * ((depth + 10) / 10);
    let phe = fhe * ((depth + 10) / 10);
    let mod = ((po2Limit / fo2) - 1) * 10;

    resultBox.style.display = 'block';

    if (po2 > po2Limit) {
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>🚨 BAHAYA KERACUNAN OKSIGEN TRIMIX</h3>
            <p>PO<sub>2</sub> pada ${depth}m = <strong>${po2.toFixed(2)} Bar</strong> (Melebihi batas ${po2Limit} Bar).</p>
            <p>MOD maksimal: <strong>${mod.toFixed(1)}m</strong>.</p>`;
    } else {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ PROFIL TEKNIKAL TRIMIX (${fo2*100}/${fhe*100}/${Math.round(fn2*100)})</h3>
            <p><strong>Equivalent Narcotic Depth (END):</strong> ${end.toFixed(1)} Meter (Efek narkosis nitrogen setara penyelaman udara pada kedalaman ${Math.ceil(end)}m).</p>
            <p><strong>Tekanan Parsial Gas:</strong> PO<sub>2</sub>: ${po2.toFixed(2)} Bar | PN<sub>2</sub>: ${pn2.toFixed(2)} Bar | P<sub>He</sub>: ${phe.toFixed(2)} Bar</p>
            <p><strong>Maximum Operating Depth (MOD):</strong> ${mod.toFixed(1)} Meter</p>`;
    }
}

// ==========================================
// 6. FORM ADUAN INTEGRASI FORMSPREE
// ==========================================

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function saveFeedback() {
    const nama = document.getElementById('fbNama').value.trim();
    const email = document.getElementById('fbEmail').value.trim();
    const kategori = document.getElementById('fbKategori').value;
    const phone = document.getElementById('fbPhone').value.trim();
    const pesan = document.getElementById('fbPesan').value.trim();

    if (!nama || !email || !pesan) {
        alert('Mohon isi semua bidang utama yang bertanda asterisk (*)!');
        return;
    }

    const btnSubmit = document.querySelector('#feedbackForm button[type="submit"]');
    const originalBtnText = btnSubmit.innerText;
    btnSubmit.innerText = "Mengirim...";
    btnSubmit.disabled = true;

    // Menyiapkan Form Data untuk dikirim ke Formspree
    const formData = new FormData();
    formData.append('Nama', nama);
    formData.append('Email', email);
    formData.append('Kategori', kategori);
    formData.append('Telepon', phone || '-');
    formData.append('Pesan', pesan);

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Simpan salinan lokal di browser
            const feedbackData = {
                id: Date.now(),
                nama,
                email,
                kategori,
                phone: phone || '-',
                pesan,
                waktu: new Date().toLocaleString('id-ID')
            };

            let stored = JSON.parse(localStorage.getItem('bpsb8_feedback_messages') || '[]');
            stored.push(feedbackData);
            localStorage.setItem('bpsb8_feedback_messages', JSON.stringify(stored));

            document.getElementById('feedbackForm').reset();
            const alertEl = document.getElementById('fbAlert');
            if (alertEl) {
                alertEl.style.display = 'block';
                setTimeout(() => { alertEl.style.display = 'none'; }, 4000);
            }

            updateFeedbackCount();
            renderFeedbackList();
        } else {
            const data = await response.json();
            alert('Gagal mengirim aduan: ' + (data.error || 'Terjadi kesalahan pada layanan Formspree.'));
        }
    } catch (error) {
        console.error('Formspree Submission Error:', error);
        alert('Gagal terhubung ke Formspree. Pastikan Anda terhubung ke internet.');
    } finally {
        btnSubmit.innerText = originalBtnText;
        btnSubmit.disabled = false;
    }
}

function updateFeedbackCount() {
    const countEl = document.getElementById('fbCount');
    if (!countEl) return;
    const stored = JSON.parse(localStorage.getItem('bpsb8_feedback_messages') || '[]');
    countEl.innerText = stored.length;
}

function toggleFeedbackList() {
    const container = document.getElementById('fbListContainer');
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        renderFeedbackList();
    } else {
        container.style.display = 'none';
    }
}

function renderFeedbackList() {
    const listItems = document.getElementById('fbListItems');
    if (!listItems) return;

    const stored = JSON.parse(localStorage.getItem('bpsb8_feedback_messages') || '[]');

    if (stored.length === 0) {
        listItems.innerHTML = '<p style="color: #94a3b8; font-style: italic;">Belum ada riwayat aduan yang terkirim dari browser ini.</p>';
        return;
    }

    listItems.innerHTML = stored.map(item => `
        <div style="background: #152238; border: 1px solid #334155; border-radius: 8px; padding: 12px; font-size: 0.9rem; margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px solid #2d3e58; padding-bottom: 4px;">
                <strong style="color: var(--accent-cyan);">${escapeHtml(item.nama)} <span style="color: #cbd5e1; font-weight: normal;">(${escapeHtml(item.kategori)})</span></strong>
                <span style="color: #94a3b8; font-size: 0.8rem;">${item.waktu}</span>
            </div>
            <div style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px;">
                📧 ${escapeHtml(item.email)} | 📱 ${escapeHtml(item.phone)}
            </div>
            <p style="color: #f8fafc; margin: 0;">${escapeHtml(item.pesan)}</p>
        </div>
    `).join('');
}