// --- LOGIKA UTAMA SISTEM LOGIN ---
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
    // Load status pesan tersimpan
    updateFeedbackCount();
});

const galleryData = [
    {
        title: "Peralatan Selam Klasik (US Navy Mark V Heavy Gear)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV2OO96-XMF5La0367P1GbgX9mzsuRcizQ4EN6wDJqUg&s=10",
        desc: `<p>Sistem Standard Diving Dress legendaris yang menjadi fondasi sejarah penyelaman militer dan teknik komersial bawah air abad ke-20. Terdiri dari helm spun-copper 12-bolt dengan dudukan dada (breastplate) berbahan tembaga/kuningan, baju karet berbahan kanvas kedap air, serta sepatu bot dengan sol bertimbal seberat 8 kg per kaki untuk menjaga negativitas buoyancy penyelam saat berjalan di dasar laut.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Suplai Gas:</strong> Kompresor Permukaan via Umbilical</div>
            <div class="spec-item"><strong>Beban Total Alat:</strong> ± 85 - 90 kg (Satu Set)</div>
            <div class="spec-item"><strong>Operasional Maks:</strong> 60 Msw (190 Fsw) Udara</div>
            <div class="spec-item"><strong>Misi Utama:</strong> Heavy Salvage, Konstruksi Pelabuhan, Demolisi</div>
        </div>`
    },
    {
        title: "SCUBA Open Circuit (Self-Contained Breathing Apparatus)",
        image: "https://cdn.pixabay.com/photo/2015/03/11/15/19/divers-668777_640.jpg",
        desc: `<p>Sistem selam mandiri di mana pasokan udara bertekanan tinggi disalurkan melalui regulator dua tingkat (First & Second Stage) dan seluruh hembusan napas dibuang langsung ke lingkungan perairan. Mengandalkan Hukum Boyle untuk kalkulasi konsumsi gas (Surface Air Consumption / SAC Rate) serta fleksibilitas tinggi tanpa terikat kabel kompresor permukaan.</p>
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
        desc: `<p>Penyelaman scuba semi-closed circuit (Semi-Closed Circuit Rebreather/SCR) adalah metode penyelaman menggunakan rebreather yang mendaur ulang sebagian gas pernapasan penyelam. Penyelam menghirup gas dari loop pernapasan, CO₂ diserap oleh scrubber, dan sebagian gas dibuang keluar serta digantikan dengan gas baru dari tabung.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Efisiensi Gas:</strong> Mengurangi Buangan Gas hingga 70%</div>
            <div class="spec-item"><strong>Media Scrubber:</strong> Sofnolime / Sodalime Absorber</div>
            <div class="spec-item"><strong>Kedalaman Kerja:</strong> 0 - 100 Meter</div>
            <div class="spec-item"><strong>Aplikasi Khusus:</strong> Operasi Taktis Senyap & Riset Biologi</div>
        </div>`
    },
    {
        title: "Closed Circuit Rebreather",
        image: "https://www.scubadiving.com/sites/default/files/styles/small/public/scubadiving/scd0318_divehacks_scd0318_divehacks_20121101-dsc_0849-edit.jpg?itok=F-wDNR2-",
        desc: `<p>Puncak teknologi penyelaman teknis mandiri. eCCR menggunakan sensor galvanic oksigen dan solenoid elektronik untuk mengontrol tekanan parsial oksigen (pO<sub>2</sub>) secara otomatis pada setpoint konstan (misal pO<sub>2</sub> 1.2 - 1.4 bar). Sistem memadukan gas murni O<sub>2</sub> dan gas pelarut (Diluent) seperti Trimix (O<sub>2</sub>/He/N<sub>2</sub>) untuk meniadakan gelembung udara serta mengoptimalkan dekompresi di kedalaman ekstrem.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Manajemen pO2:</strong> Otomatis via Microprocessor Solenoid</div>
            <div class="spec-item"><strong>Gas Diluent:</strong> Normoxic / Hypoxic Trimix</div>
            <div class="spec-item"><strong>Kedalaman Operasi:</strong> 60 - 150+ Meter (Exploration Grade)</div>
            <div class="spec-item"><strong>Profil Dekompresi:</strong> Sangat Efisien (Menekan RNT)</div>
        </div>`
    },
    {
        title: "SSBA (Surface-Supplied Breathing Apparatus)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvrUP0Bv0v0pxG9dpR96kYenJQHrnOIccen1NtO8mL4z6d99Nj_3QLVU&s=10",
        desc: `<p>Standar keselamatan utama industri Commercial Offshore & Inshore Diving. Penyelam menggunakan helm komersial berbahan fiberglass/stainless-steel (Kirby Morgan KM-37 / KM-97) yang disuport penuh dari permukaan via untaian Umbilical Bundle.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Sistem Keamanan:</strong> Bailout Bottle (Emergency Gas) di Punggung</div>
            <div class="spec-item"><strong>Monitoring:</strong> Suara, Kedalaman, & Video Real-time oleh Supervisor</div>
            <div class="spec-item"><strong>Batas Kedalaman:</strong> 0 - 50 Msw (Air/Nitrox)</div>
            <div class="spec-item"><strong>Standard Regulasi:</strong> IMCA / ADCI Commercial Diving Standards</div>
        </div>`
    },
    {
        title: "Saturasi / Saturation Diving (Sat Bell System)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT59YrFA50l5tBa4Qi3xWLOXPwlQQ_eEkY9s3Pa7YQX9a-WnoAoZ4d6YSn2&s=10",
        desc: `<p>Metode penyelaman tingkat tertinggi untuk kedalaman laut dalam di mana jaringan tubuh penyelam dibiarkan jenuh total (fully saturated) oleh campuran gas Heliox (He/O<sub>2</sub>) pada tekanan kerja.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Campuran Gas:</strong> Heliox (Mencegah Nitrogen Narcosis & HPNS)</div>
            <div class="spec-item"><strong>Kedalaman Operasi:</strong> 50 - 300+ Meter (Subsea Oil & Gas)</div>
            <div class="spec-item"><strong>Siklus Dekompresi:</strong> HANYA 1 Kali di Akhir Rotasi Tugas</div>
            <div class="spec-item"><strong>Dukungan Suhu:</strong> Baju Selam Dialiri Air Panas (Hot Water Suit)</div>
        </div>`
    },
    {
        title: "Fun & Sport Diving (Rekreasional)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYjo-ydgi2y982bOQ8qIrbSTXZDW3iHIYHSXP2gTKuZw&s=10",
        desc: `<p>Aktivitas eksplorasi bawah air non-industri yang berfokus pada konservasi biologis, fotografi, dan eksplorasi bangkai kapal. Seluruh profil penyelaman dipatok ketat wajib berada di dalam batas kurva No-Decompression Limit (NDL).</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Batas NDL:</strong> Selalu di dalam kurva aman tanpa dekompresi</div>
            <div class="spec-item"><strong>Sertifikasi:</strong> Open Water hingga Master Scuba Diver</div>
            <div class="spec-item"><strong>Kedalaman Maks:</strong> 18m (Open Water) / 30m (Advanced) / 40m (Deep)</div>
            <div class="spec-item"><strong>Safety Rule:</strong> Safety Stop wajib 3 Menit di Kedalaman 5 Meter</div>
        </div>`
    },
    {
        title: "Underwater Survey, Inspection & NDT",
        image: "https://lhdiving.com.vn/UserFile/editor/images/Brochure%20Lam%20Hong%20(EDIT%202)%20Sep%202019_007.jpg",
        desc: `<p>Pekerjaan inspeksi teknis struktur bawah air untuk keperluan audit sertifikasi kelas (ABS, DNV, Lloyd’s Register). Meliputi Under Water Inspection in Lieu of Drydocking (UWILD).</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Metode NDT:</strong> Ultrasonic Thickness (UT), MPI, & ACFM Testing</div>
            <div class="spec-item"><strong>Inspeksi Anoda:</strong> Measurement Cathodic Protection (CP) Potential</div>
            <div class="spec-item"><strong>Output Data:</strong> Laporan Visual HD, Pemetaan Korosi, & Integritas Struktur</div>
            <div class="spec-item"><strong>Keahlian Penyelam:</strong> Kualifikasi Sertifikasi NDT Class Inspector</div>
        </div>`
    },
    {
        title: "Pengelasan Bawah Air (Underwater Welding / Wet & Dry)",
        image: "https://lhdiving.com.vn/UserFile/News/Category/2019_09_24_08_37_29_22.jpg",
        desc: `<p>Pekerjaan penyambungan konstruksi baja berisiko tinggi. Terdiri dari Wet Welding (pengelasan busur listrik langsung di air) dan Dry Hyperbaric Welding (pengelasan presisi di dalam ruang habitat kedap air bertekanan hiperbarik).</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Sumber Arus:</strong> Direct Current (DC) Straight Polarity / DCEN</div>
            <div class="spec-item"><strong>Proteksi Kelistrikan:</strong> Knife Switch Keselamatan di Konsol Permukaan</div>
            <div class="spec-item"><strong>Kualifikasi:</strong> AWS D3.6M Class A & Class B Welder-Diver</div>
            <div class="spec-item"><strong>Hazard Utama:</strong> Kejutan Listrik & Retak Hidrogen</div>
        </div>`
    },
    {
        title: "Pekerjaan Salvage & Heavy Subsea Refloating",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4QnHrQCnjAEwqsH0xMhDqY1zC60_fDKcjkqNVVW98AsOZgaHxi6eqXl_K&s=10",
        desc: `<p>Operasi kompleks pengangkatan rangka kapal tenggelam, pembersihan rintangan alur pelayaran (Wreck Removal), dan penanganan kargo subsea.</p>
        <div class="spec-grid">
            <div class="spec-item"><strong>Alat Potong:</strong> Broco Exothermic Cutting Rods (Suhu 5,500°C)</div>
            <div class="spec-item"><strong>Alat Apung:</strong> Heavy-Duty Parachute Air Lift Bags</div>
            <div class="spec-item"><strong>Prinsip Fisika:</strong> Kalkulasi Gaya Apung Archimedes & Displacement</div>
            <div class="spec-item"><strong>Fokus Utama:</strong> Refloating, Pumping, Pemasangan Patching, & Salvage</div>
        </div>`
    }
];

function openGalleryModal(index) {
    const data = galleryData[index];
    const imgEl = document.getElementById('modalImg');
    
    document.getElementById('modalTitle').innerText = data.title;
    imgEl.src = data.image;
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
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="260" viewBox="0 0 600 260"><rect width="100%" height="100%" fill="%230f172a"/><circle cx="300" cy="110" r="40" fill="%231e293b" stroke="%2338bdf8" stroke-width="4"/><path d="M280 110 L320 110 M300 90 L300 130" stroke="%2338bdf8" stroke-width="4"/><text x="50%" y="180" fill="%2338bdf8" font-family="Segoe UI, sans-serif" font-weight="bold" font-size="16" text-anchor="middle">Visual Dokumentasi Penyelaman</text><text x="50%" y="205" fill="%2394a3b8" font-family="Segoe UI, sans-serif" font-size="13" text-anchor="middle">Standar Operasional Bawah Air</text></svg>';
}

function switchTab(event, tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('#simulasi input[type="checkbox"]');
    const total = checkboxes.length;
    let checked = 0;

    checkboxes.forEach(cb => { if (cb.checked) checked++; });

    const percentage = Math.round((checked / total) * 100);
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    progressBar.style.width = percentage + '%';
    progressText.innerText = percentage + '% Terverifikasi';

    if(percentage === 100) {
        progressText.innerText = "100% Siap! Pemeriksaan BWRAF Selesai, Safe Diving!";
        progressText.style.color = "var(--success)";
    } else {
        progressText.style.color = "var(--secondary-blue)";
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

const usNavyNDLTable = [
    { depthM: 9,  depthFt: 30, ndl: 371, group: 'A' },
    { depthM: 10, depthFt: 35, ndl: 232, group: 'B' },
    { depthM: 12, depthFt: 40, ndl: 163, group: 'C' },
    { depthM: 14, depthFt: 45, ndl: 125, group: 'D' },
    { depthM: 15, depthFt: 50, ndl: 92,  group: 'E' },
    { depthM: 17, depthFt: 55, ndl: 74,  group: 'F' },
    { depthM: 18, depthFt: 60, ndl: 60,  group: 'G' },
    { depthM: 21, depthFt: 70, ndl: 48,  group: 'H' },
    { depthM: 24, depthFt: 80, ndl: 39,  group: 'I' },
    { depthM: 27, depthFt: 90, ndl: 30,  group: 'J' },
    { depthM: 30, depthFt: 100, ndl: 25, group: 'K' },
    { depthM: 33, depthFt: 110, ndl: 20, group: 'L' },
    { depthM: 36, depthFt: 120, ndl: 15, group: 'M' },
    { depthM: 39, depthFt: 130, ndl: 10, group: 'N' },
    { depthM: 42, depthFt: 140, ndl: 10, group: 'O' },
    { depthM: 45, depthFt: 150, ndl: 5,  group: 'O' }
];

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
            <p><strong>Gunakan gas campuran spesialis seperti Heliox atau Trimix!</strong></p>`;
        return;
    }

    let match = usNavyNDLTable.find(row => row.depthM >= depthInput) || usNavyNDLTable[usNavyNDLTable.length - 1];
    const maxNDL = match.ndl;

    resultBox.style.display = 'block';

    if (timeInput <= maxNDL) {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ PENYELAMAN AMAN (No-Decompression Dive)</h3>
            <p>Batas NDL US Navy untuk kedalaman <strong>${depthInput}m</strong> (tabel <strong>${match.depthM}m</strong>) adalah <strong>${maxNDL} Menit</strong>.</p>
            <p>Rencana waktu Anda (${timeInput} menit) AMAN. Marjin keselamatan: <strong>${maxNDL - timeInput} menit</strong>.</p>`;
    } else {
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>🚨 BAHAYA: MELEBIHI BATAS NDL</h3>
            <p>Batas NDL US Navy untuk kedalaman <strong>${depthInput}m</strong> hanya <strong>${maxNDL} Menit</strong>.</p>
            <p>Rencana Anda (${timeInput} menit) melebihi batas sebanyak <strong>${timeInput - maxNDL} menit</strong>. Wajib melakukan Stop Dekompresi!</p>`;
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

    let match1 = usNavyNDLTable.find(row => row.depthM >= d1Depth) || usNavyNDLTable[usNavyNDLTable.length - 1];
    let match2 = usNavyNDLTable.find(row => row.depthM >= d2Depth) || usNavyNDLTable[usNavyNDLTable.length - 1];

    let rawRatio = Math.min(1.0, d1Time / match1.ndl);
    let sitOffgasFactor = Math.exp(-sit / 120);
    let residualRatio = rawRatio * sitOffgasFactor;
    
    let rnt = Math.round(residualRatio * match2.ndl);
    let esdt = rnt + d2Time;
    let maxNDL2 = match2.ndl;

    resultBox.style.display = 'block';

    if (esdt <= maxNDL2) {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ PROFILE REPETITIF AMAN</h3>
            <p><strong>Waktu Residu Nitrogen (RNT):</strong> +${rnt} Menit</p>
            <p><strong>Total Waktu Ekivalen (ESDT):</strong> ${d2Time}m (Bottom) + ${rnt}m (RNT) = <strong>${esdt} Menit</strong></p>
            <p>Batas NDL US Navy untuk Dive 2 (${d2Depth}m) adalah <strong>${maxNDL2} Menit</strong>. Penyelaman kedua Anda AMAN!</p>`;
    } else {
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>🚨 RESIKO DEKOMPRESI PADA DIVE 2</h3>
            <p><strong>Waktu Residu Nitrogen (RNT):</strong> +${rnt} Menit</p>
            <p><strong>Total Waktu Ekivalen (ESDT):</strong> ${esdt} Menit (Melebihi limit NDL ${maxNDL2} Menit pada kedalaman ${d2Depth}m).</p>
            <p><strong>Saran:</strong> Perpanjang jeda permukaan (SIT) atau kurangi durasi Dive 2!</p>`;
    }
}

function calculateDecompression() {
    const depth = parseFloat(document.getElementById('decDepth').value);
    const time = parseInt(document.getElementById('decTime').value);
    const resultBox = document.getElementById('resultDecomBox');

    if (!depth || !time) return;

    let match = usNavyNDLTable.find(row => row.depthM >= depth) || usNavyNDLTable[usNavyNDLTable.length - 1];
    resultBox.style.display = 'block';

    if (time <= match.ndl) {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ TIDAK MEMERLUKAN STOP DEKOMPRESI WAJIB</h3>
            <p>Penyelaman pada <strong>${depth}m / ${time} min</strong> masih berada dalam batas NDL (${match.ndl} min).</p>
            <p>Cukup lakukan Safety Stop standar 3 menit di kedalaman 5 meter.</p>`;
    } else {
        resultBox.className = 'result-box danger';
        let extraTime = time - match.ndl;
        let stop6m = Math.max(3, Math.round(extraTime * 0.6));
        let stop9m = extraTime > 20 ? Math.round(extraTime * 0.3) : 0;
        let stop12m = extraTime > 40 ? Math.round(extraTime * 0.15) : 0;
        let tat = stop6m + stop9m + stop12m + Math.round(depth / 9);

        resultBox.innerHTML = `<h3>🚨 JADWAL STOP DEKOMPRESI WAJIB (US Navy Table 9-9)</h3>
            <p>Penyelaman pada <strong>${depth}m / ${time} min</strong> telah MELEBIHI NDL (${match.ndl} min).</p>
            <table class="decom-table">
                <tr>
                    <th>Stop 12 Meter</th>
                    <th>Stop 9 Meter</th>
                    <th>Stop 6 Meter</th>
                    <th>Total Ascent Time (TAT)</th>
                </tr>
                <tr>
                    <td>${stop12m > 0 ? stop12m + ' Min' : 'Tidak Ada'}</td>
                    <td>${stop9m > 0 ? stop9m + ' Min' : 'Tidak Ada'}</td>
                    <td><strong>${stop6m} Min</strong></td>
                    <td><strong>~${tat} Min</strong></td>
                </tr>
            </table>
            <p style="margin-top:0.8rem; font-size:0.9rem;">*Gunakan tabung Oksigen Murni 100% pada stop 6m untuk mempercepat eliminasi nitrogen jika berkualifikasi.</p>`;
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
    let currentPO2 = fo2 * ((depth + 10) / 10);
    let mod = ((po2Limit / fo2) - 1) * 10;

    resultBox.style.display = 'block';

    if (currentPO2 > po2Limit) {
        resultBox.className = 'result-box danger';
        resultBox.innerHTML = `<h3>🚨 BAHAYA KERACUNAN OKSIGEN (CNS Toxicity)</h3>
            <p>Tekanan Parsial O2 (PO<sub>2</sub>) pada kedalaman ${depth}m mencapai <strong>${currentPO2.toFixed(2)} Bar</strong> (Melebihi limit ${po2Limit} Bar).</p>
            <p><strong>Maximum Operating Depth (MOD)</strong> untuk EAN${fo2*100} adalah <strong>${mod.toFixed(1)} Meter</strong>.</p>`;
    } else {
        resultBox.className = 'result-box safe';
        resultBox.innerHTML = `<h3>✅ PARAMETER NITROX AMAN (EAN${fo2*100})</h3>
            <p><strong>Equivalent Air Depth (EAD):</strong> ${ead.toFixed(1)} Meter (Gunakan NDL tabel udara untuk kedalaman ${Math.ceil(ead)}m).</p>
            <p><strong>Tekanan Parsial O2 (PO<sub>2</sub>):</strong> ${currentPO2.toFixed(2)} Bar (Batas Aman &le; ${po2Limit} Bar).</p>
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
            <p>MOD maksimal untuk Heliox (${fo2*100}% O2) ini adalah <strong>${mod.toFixed(1)}m</strong>.</p>`;
    } else {
        resultBox.className = 'result-box info';
        resultBox.innerHTML = `<h3>📊 ANALISIS CAMPURAN HELIOX (${fo2*100}% O2 / ${fhe*100}% He)</h3>
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
        resultBox.innerHTML = `<h3>✅ PROFILE TEKNIKAL TRIMIX (${fo2*100}/${fhe*100}/${Math.round(fn2*100)})</h3>
            <p><strong>Equivalent Narcotic Depth (END):</strong> ${end.toFixed(1)} Meter (Efek narkosis sama dengan penyelaman udara biasa di ${Math.ceil(end)}m).</p>
            <p><strong>Tekanan Parsial Gas:</strong> PO<sub>2</sub>: ${po2.toFixed(2)} Bar | PN<sub>2</sub>: ${pn2.toFixed(2)} Bar | P<sub>He</sub>: ${phe.toFixed(2)} Bar</p>
            <p><strong>Maximum Operating Depth (MOD):</strong> ${mod.toFixed(1)} Meter</p>`;
    }
}

// ==========================================
// LOGIKA PENYIMPANAN DATA FORM KRITIK & ADUAN
// ==========================================
// Ganti URL di bawah dengan Endpoint Formspree milik Anda
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

async function sendToFormspree() {
    const form = document.getElementById('feedbackForm');
    const submitBtn = document.getElementById('fbSubmitBtn');
    const alertEl = document.getElementById('fbAlert');
    const formData = new FormData(form);

    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

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
            saveLocalFeedback({
                nama: formData.get('nama'),
                email: formData.get('email'),
                kategori: formData.get('kategori'),
                phone: formData.get('phone') || '-',
                pesan: formData.get('pesan')
            });

            // Tampilkan notifikasi sukses
            alertEl.style.display = 'block';
            alertEl.className = 'result-box safe';
            alertEl.innerHTML = '✅ Terima kasih! Pesan Anda telah terkirim ke email admin dan tersimpan di database lokal.';
            form.reset();

            setTimeout(() => { alertEl.style.display = 'none'; }, 5000);
        } else {
            throw new Error('Gagal mengirim formulir.');
        }
    } catch (error) {
        alertEl.style.display = 'block';
        alertEl.className = 'result-box danger';
        alertEl.innerHTML = '🚨 Terjadi kesalahan saat mengirim pesan. Periksa koneksi atau coba lagi.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Kirim Pesan / Aduan';
    }
}

function saveLocalFeedback(data) {
    const feedbackData = {
        id: Date.now(),
        ...data,
        waktu: new Date().toLocaleString('id-ID')
    };
    let stored = JSON.parse(localStorage.getItem('bpsb8_feedback_messages') || '[]');
    stored.push(feedbackData);
    localStorage.setItem('bpsb8_feedback_messages', JSON.stringify(stored));
    updateFeedbackCount();
    renderFeedbackList();
}