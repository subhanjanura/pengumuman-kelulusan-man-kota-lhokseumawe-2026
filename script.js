// Data siswa MAN Kota Lhokseumawe Tahun Ajaran 2025/2026
const dataKelulusan = [
    {
        "nism": "121111710100250001",
        "nisn": "0081234567",
        "nama": "Arief Munandar",
        "jk": "L",
        "kelas": "XII IPA 1",
        "status": "LULUS"
    },
    {
        "nism": "121111710100250002",
        "nisn": "0081234568",
        "nama": "Cut Putri Aulia",
        "jk": "P",
        "kelas": "XII IPA 2",
        "status": "LULUS"
    },
    {
        "nism": "121111710100250003",
        "nisn": "0081234569",
        "nama": "Muhammad Rizki",
        "jk": "L",
        "kelas": "XII IPS 1",
        "status": "BELUM LULUS"
    },
    {
        "nism": "121111710100250004",
        "nisn": "0081234570",
        "nama": "Siti Humaira",
        "jk": "P",
        "kelas": "XII Keagamaan",
        "status": "LULUS"
    }
];

function cekKelulusan() {
    // Ambil nilai input dan ubah menjadi lowercase untuk fleksibilitas pencarian
    const input = document.getElementById('nisnInput').value.trim().toLowerCase();
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

    // Cari berdasarkan NISN atau NIS/NISM
    const siswa = dataKelulusan.find(s => 
        s.nisn.toLowerCase() === input || s.nism.toLowerCase() === input
    );

    hasilDiv.classList.remove('hidden');

    if (siswa) {
        namaSiswa.textContent = siswa.nama;
        
        // Menambahkan informasi detail NISN/NISM serta Jenis Kelamin
        infoSiswa.textContent = `NISN: ${siswa.nisn} | NISM: ${siswa.nism} | JK: ${siswa.jk}`;
        infoJurusan.textContent = `Kelas: ${siswa.kelas}`;

        if (siswa.status === "LULUS") {
            hasilDiv.className = "p-8 rounded-3xl shadow-sm text-center bg-emerald-50/50 border border-emerald-100";
            iconStatus.className = "mx-auto w-16 h-16 flex items-center justify-center rounded-2xl mb-5 text-2xl shadow-sm bg-emerald-600 text-white";
            iconStatus.innerHTML = '<i class="fa-solid fa-graduation-cap"></i>';
            
            statusKelulusan.textContent = "LULUS";
            badgeStatus.className = "px-8 py-3.5 rounded-2xl font-extrabold text-xl tracking-wider text-white bg-emerald-600 shadow-emerald-600/15";
            pesanKelulusan.className = "mt-8 p-4 rounded-2xl text-xs leading-relaxed bg-emerald-50 border border-emerald-200 text-emerald-800 block";
        } else {
            hasilDiv.className = "p-8 rounded-3xl shadow-sm text-center bg-red-50/50 border border-red-100";
            iconStatus.className = "mx-auto w-16 h-16 flex items-center justify-center rounded-2xl mb-5 text-2xl shadow-sm bg-red-600 text-white";
            iconStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
            
            statusKelulusan.textContent = "BELUM LULUS";
            badgeStatus.className = "px-8 py-3.5 rounded-2xl font-extrabold text-xl tracking-wider text-white bg-red-600 shadow-red-600/15";
            pesanKelulusan.className = "mt-8 p-4 rounded-2xl text-xs leading-relaxed bg-red-50 border border-red-200 text-red-800 block";
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
}