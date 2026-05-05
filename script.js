// Variabel penampung data
let dataKelulusan = [];

// Memuat data.json saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            dataKelulusan = data;
            console.log("Data siswa berhasil dimuat, jumlah:", dataKelulusan.length);
        })
        .catch(error => console.error("Gagal memuat file data.json:", error));
});

function cekKelulusan() {
    const input = document.getElementById('nisnInput').value.trim().toLowerCase();
    
    // Elemen tombol dan loading
    const searchIcon = document.getElementById('searchIcon');
    const searchText = document.getElementById('searchText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const button = document.querySelector('button');

    const hasilDiv = document.getElementById('hasil');
    const iconStatus = document.getElementById('iconStatus');
    const namaSiswa = document.getElementById('namaSiswa');
    const infoSiswa = document.getElementById('infoSiswa');
    const infoJurusan = document.getElementById('infoJurusan');
    const statusKelulusan = document.getElementById('statusKelulusan');
    const badgeStatus = document.getElementById('badgeStatus');
    const pesanKelulusan = document.getElementById('pesanKelulusan');

    if (input === "") {
        alert("Silakan masukkan NISN atau NISM terlebih dahulu.");
        return;
    }

    if (dataKelulusan.length === 0) {
        alert("Data siswa sedang dimuat dari server. Silakan tunggu beberapa detik dan coba lagi.");
        return;
    }

    // Aktifkan Efek Loading (3 Detik)
    searchIcon.classList.add('d-none');
    searchText.classList.add('d-none');
    loadingSpinner.classList.remove('d-none');
    button.disabled = true;
    button.classList.add('opacity-75');

    setTimeout(() => {
        // Matikan Efek Loading
        searchIcon.classList.remove('d-none');
        searchText.classList.remove('d-none');
        loadingSpinner.classList.add('d-none');
        button.disabled = false;
        button.classList.remove('opacity-75');

        // Cari siswa
        const siswa = dataKelulusan.find(s => 
            (s.nisn && s.nisn.toString().toLowerCase() === input) || 
            (s.nism && s.nism.toString().toLowerCase() === input)
        );

        hasilDiv.classList.remove('d-none');

        if (siswa) {
            namaSiswa.textContent = siswa.nama;
            infoSiswa.textContent = `NISN: ${siswa.nisn} | NISM: ${siswa.nism} | JK: ${siswa.jk}`;
            infoJurusan.textContent = `Kelas: ${siswa.kelas}`;

            if (siswa.status.toUpperCase() === "LULUS") {
                hasilDiv.className = "p-4 rounded-4 shadow-sm text-center border border-success bg-success bg-opacity-10 mb-4";
                iconStatus.className = "mx-auto w-16 h-16 d-flex align-items-center justify-center rounded-circle mb-3 bg-success fs-4 shadow-sm text-white";
                iconStatus.innerHTML = '<i class="fa-solid fa-graduation-cap"></i>';
                
                badgeStatus.className = "badge bg-success text-white px-4 py-2 fs-5 shadow-sm";
                statusKelulusan.textContent = "LULUS";
                
                pesanKelulusan.className = "mt-4 p-3 rounded-3 fs-8 d-block bg-success bg-opacity-25 text-success border border-success";
                pesanKelulusan.textContent = "Selamat kepada peserta didik yang dinyatakan lulus. Harap mengunduh Surat Keterangan Lulus (SKL) resmi melalui tata usaha madrasah.";
            } else {
                hasilDiv.className = "p-4 rounded-4 shadow-sm text-center border border-danger bg-danger bg-opacity-10 mb-4";
                iconStatus.className = "mx-auto w-16 h-16 d-flex align-items-center justify-center rounded-circle mb-3 bg-danger fs-4 shadow-sm text-white";
                iconStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
                
                badgeStatus.className = "badge bg-danger text-white px-4 py-2 fs-5 shadow-sm";
                statusKelulusan.textContent = "BELUM LULUS";
                
                pesanKelulusan.className = "mt-4 p-3 rounded-3 fs-8 d-block bg-danger bg-opacity-25 text-danger border border-danger";
                pesanKelulusan.textContent = "Silakan berkonsultasi dengan pihak sekolah terkait status kelulusan Anda.";
            }
        } else {
            hasilDiv.className = "p-4 rounded-4 shadow-sm text-center border border-warning bg-warning bg-opacity-10 mb-4";
            iconStatus.className = "mx-auto w-16 h-16 d-flex align-items-center justify-center rounded-circle mb-3 bg-warning fs-4 shadow-sm text-white";
            iconStatus.innerHTML = '<i class="fa-solid fa-circle-question"></i>';
            
            namaSiswa.textContent = "Data Tidak Ditemukan.";
            infoSiswa.textContent = "Periksa kembali NISN/NISM yang Anda masukkan dan coba lagi.";
            infoJurusan.textContent = "";
            badgeStatus.className = "badge bg-warning text-dark px-4 py-2 fs-5 shadow-sm";
            statusKelulusan.textContent = "TIDAK VALID";
            pesanKelulusan.className = "d-none";
        }
    }, 3000); // Penundaan (delay) 3 detik
}