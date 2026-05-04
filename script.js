// Variabel untuk menampung data
let dataKelulusan = [];

document.addEventListener("DOMContentLoaded", function () {
    Papa.parse("data.csv", {
        download: true,
        header: true,
        complete: function (results) {
            dataKelulusan = results.data;
            console.log("Data siswa berhasil dimuat:", dataKelulusan.length);
        },
        error: function (err) {
            console.error("Gagal membaca file CSV:", err);
        }
    });
});

function cekKelulusan() {
    const input = document.getElementById('nisnInput').value.trim().toLowerCase();
    
    // Ambil elemen tombol dan spinner
    const searchIcon = document.getElementById('searchIcon');
    const searchText = document.getElementById('searchText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const button = document.querySelector('button'); // Tombol Periksa

    const hasilDiv = document.getElementById('hasil');
    const iconStatus = document.getElementById('iconStatus');
    const namaSiswa = document.getElementById('namaSiswa');
    const infoSiswa = document.getElementById('infoSiswa');
    const infoJurusan = document.getElementById('infoJurusan');
    const statusKelulusan = document.getElementById('statusKelulusan');
    const badgeStatus = document.getElementById('badgeStatus');
    const pesanKelulusan = document.getElementById('pesanKelulusan');

    if (input === "") {
        alert("Silakan masukkan NISN atau NIS terlebih dahulu.");
        return;
    }

    if (dataKelulusan.length === 0) {
        alert("Data siswa sedang dimuat. Silakan tunggu beberapa detik dan coba lagi.");
        return;
    }

    // --- EFEK LOADING DIMULAI ---
    // Sembunyikan ikon & teks, lalu tampilkan animasi loading dan nonaktifkan tombol
    searchIcon.classList.add('hidden');
    searchText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    button.disabled = true;
    button.classList.add('opacity-70', 'cursor-not-allowed');

    // Tunda eksekusi selama 3000 ms (3 detik)
    setTimeout(() => {
        // --- EFEK LOADING SELESAI ---
        // Kembalikan tombol seperti semula
        searchIcon.classList.remove('hidden');
        searchText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        button.disabled = false;
        button.classList.remove('opacity-70', 'cursor-not-allowed');

        // Lakukan pencarian data siswa
        const siswa = dataKelulusan.find(s => 
            (s.nisn && s.nisn.toString().toLowerCase() === input) || 
            (s.nism && s.nism.toString().toLowerCase() === input)
        );

        hasilDiv.classList.remove('hidden');

        if (siswa) {
            namaSiswa.textContent = siswa.nama;
            infoSiswa.textContent = `NISN: ${siswa.nisn} | NISM: ${siswa.nism} | JK: ${siswa.jk}`;
            infoJurusan.textContent = `Kelas: ${siswa.kelas}`;

            if (siswa.status.toUpperCase() === "LULUS") {
                hasilDiv.className = "p-8 rounded-3xl shadow-sm text-center bg-emerald-50/50 border border-emerald-100";
                iconStatus.className = "mx-auto w-16 h-16 flex items-center justify-center rounded-2xl mb-5 text-2xl shadow-sm bg-emerald-600 text-white";
                iconStatus.innerHTML = '<i class="fa-solid fa-graduation-cap"></i>';
                
                statusKelulusan.textContent = "LULUS";
                badgeStatus.className = "px-8 py-3.5 rounded-2xl font-extrabold text-xl tracking-wider text-white bg-emerald-600 shadow-emerald-600/15";
                pesanKelulusan.className = "mt-8 p-4 rounded-2xl text-xs leading-relaxed bg-emerald-50 border border-emerald-200 text-emerald-800 block";
                pesanKelulusan.textContent = "Selamat kepada peserta didik yang dinyatakan lulus. Harap mengunduh Surat Keterangan Lulus (SKL) resmi melalui tata usaha madrasah.";
            } else {
                hasilDiv.className = "p-8 rounded-3xl shadow-sm text-center bg-red-50/50 border border-red-100";
                iconStatus.className = "mx-auto w-16 h-16 flex items-center justify-center rounded-2xl mb-5 text-2xl shadow-sm bg-red-600 text-white";
                iconStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
                
                statusKelulusan.textContent = "BELUM LULUS";
                badgeStatus.className = "px-8 py-3.5 rounded-2xl font-extrabold text-xl tracking-wider text-white bg-red-600 shadow-red-600/15";
                pesanKelulusan.className = "mt-8 p-4 rounded-2xl text-xs leading-relaxed bg-red-50 border border-red-200 text-red-800 block";
                pesanKelulusan.textContent = "Silakan berkonsultasi dengan pihak sekolah terkait status kelulusan Anda.";
            }
        } else {
            hasilDiv.className = "p-8 rounded-3xl shadow-sm text-center bg-amber-50/50 border border-amber-100";
            iconStatus.className = "mx-auto w-16 h-16 flex items-center justify-center rounded-2xl mb-5 text-2xl shadow-sm bg-amber-500 text-white";
            iconStatus.innerHTML = '<i class="fa-solid fa-circle-question"></i>';
            
            namaSiswa.textContent = "Data Tidak Ditemukan.";
            infoSiswa.textContent = "Periksa kembali NISN/NISM yang Anda masukkan dan coba lagi.";
            infoJurusan.textContent = "";
            statusKelulusan.textContent = "TIDAK VALID";
            badgeStatus.className = "px-8 py-3.5 rounded-2xl font-extrabold text-xl tracking-wider text-white bg-amber-500 shadow-amber-500/15";
            pesanKelulusan.className = "hidden";
        }
    }, 3000); // Penundaan selama 3 detik (3000 ms)
}