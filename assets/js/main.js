// File: assets/js/main.js
// Deskripsi: Berisi semua data dan logika utama aplikasi (Versi Final)

// =================================================
// DATA PENGGUNA (DATABASE SIMULASI) - DIPERBANYAK
// =================================================
const users = {
    // Data Dosen
    '0002085908': { name: 'Prof. Siti Nurmaini, M.T.', password: '123456', role: 'dosen' },
    '0022018703': { name: 'Dr. Ir. Ahmad Heryanto, M.T.', password: '123456', role: 'dosen' },
    '0022108702': { name: 'Iman Saladin, S.Kom., M.M.S.I.', password: '123456', role: 'dosen' },
    '0011223301': { name: 'Dr. Retno Lestari, M.Kom.', password: '123456', role: 'dosen' },
    '0044556602': { name: 'Budi Santoso, S.T., M.Eng.', password: '123456', role: 'dosen' },
    '0077889903': { name: 'Prof. Dr. Ir. Rina Marlina, M.Sc.', password: '123456', role: 'dosen' },
    
    // Data Mahasiswa
    '09030582226053': { name: 'Wahyu Pramana', password: '123456', role: 'mahasiswa' },
    '0903058212608': { name: 'Rahayu Prasiska', password: '123456', role: 'mahasiswa' },
    '09030582126015': { name: 'Wahyu Hidayat', password: '123456', role: 'mahasiswa' },
    '09030582327001': { name: 'Andi Wijaya', password: '123456', role: 'mahasiswa' },
    '09030582327002': { name: 'Citra Lestari', password: '123456', role: 'mahasiswa' },
    '09030582327003': { name: 'Eko Nugroho', password: '123456', role: 'mahasiswa' },
    '09030582327004': { name: 'Fitriani Indah', password: '123456', role: 'mahasiswa' }
};

const jadwalDosen = {
    '0002085908': [
        { hari: 'Selasa', tanggal: '22 Juli 2025', jam: '09:00 - 09:30' },
        { hari: 'Selasa', tanggal: '22 Juli 2025', jam: '09:30 - 10:00' },
        { hari: 'Kamis', tanggal: '24 Juli 2025', jam: '13:00 - 13:30' }
    ],
    '0022018703': [
        { hari: 'Senin', tanggal: '21 Juli 2025', jam: '10:00 - 10:30' },
        { hari: 'Rabu', tanggal: '23 Juli 2025', jam: '14:00 - 14:30' },
        { hari: 'Rabu', tanggal: '23 Juli 2025', jam: '14:30 - 15:00' }
    ],
    '0022108702': [
        { hari: 'Jumat', tanggal: '25 Juli 2025', jam: '09:30 - 10:00' },
        { hari: 'Jumat', tanggal: '25 Juli 2025', jam: '10:00 - 10:30' }
    ],
    '0011223301': [
        { hari: 'Senin', tanggal: '21 Juli 2025', jam: '13:00 - 13:30' },
        { hari: 'Rabu', tanggal: '23 Juli 2025', jam: '09:00 - 09:30' },
    ],
    '0044556602': [
        { hari: 'Selasa', tanggal: '22 Juli 2025', jam: '14:00 - 14:30' },
        { hari: 'Kamis', tanggal: '24 Juli 2025', jam: '10:30 - 11:00' }
    ],
    '0077889903': [
        { hari: 'Senin', tanggal: '21 Juli 2025', jam: '11:00 - 11:30' },
        { hari: 'Rabu', tanggal: '23 Juli 2025', jam: '11:00 - 11:30' },
        { hari: 'Jumat', tanggal: '25 Juli 2025', jam: '14:00 - 14:30' }
    ]
};

// =================================================
// DATA PERTEMUAN (SINGLE SOURCE OF TRUTH)
// =================================================
const initialSemuaPertemuan = [
    // Setiap objek pertemuan sekarang memiliki ID unik dan data lengkap.
    // ID Pertemuan 1-7: Permintaan untuk Prof. Siti Nurmaini, M.T. (0002085908)
    {
        idPertemuan: 1,
        idDosen: '0002085908', namaDosen: 'Prof. Siti Nurmaini, M.T.',
        idMahasiswa: '09030582226053', namaMahasiswa: 'Wahyu Pramana',
        keperluan: 'Konsultasi Kerja Praktik', jadwal: 'Selasa, 22 Juli 2025, 09:30',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 2,
        idDosen: '0002085908', namaDosen: 'Prof. Siti Nurmaini, M.T.',
        idMahasiswa: '09030582126015', namaMahasiswa: 'Wahyu Hidayat',
        keperluan: 'Bimbingan Akademik (PA)', jadwal: 'Kamis, 24 Juli 2025, 13:00',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 3,
        idDosen: '0002085908', namaDosen: 'Prof. Siti Nurmaini, M.T.',
        idMahasiswa: '09030582327003', namaMahasiswa: 'Eko Nugroho',
        keperluan: 'Diskusi Lomba Gemastik', jadwal: 'Selasa, 22 Juli 2025, 09:30',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 4,
        idDosen: '0002085908', namaDosen: 'Prof. Siti Nurmaini, M.T.',
        idMahasiswa: '09030582126015', namaMahasiswa: 'Wahyu Hidayat',
        keperluan: 'Konsultasi Proposal', jadwal: '15 Juli 2025, 09:00',
        status: 'Selesai', feedback: "Sangat membantu, Bu. Terima kasih telah meluangkan waktu.", alasanTolak: null
    },
    {
        idPertemuan: 5,
        idDosen: '0002085908', namaDosen: 'Prof. Siti Nurmaini, M.T.',
        idMahasiswa: '09030582327002', namaMahasiswa: 'Citra Lestari',
        keperluan: 'Minta Surat Rekomendasi', jadwal: 'Kamis, 24 Juli 2025, 13:30',
        status: 'Ditolak', feedback: null, alasanTolak: 'Silakan ambil surat rekomendasi yang sudah jadi di ruang TU Akademik.'
    },
    {
        idPertemuan: 6,
        idDosen: '0002085908', namaDosen: 'Prof. Siti Nurmaini, M.T.',
        idMahasiswa: '09030582327004', namaMahasiswa: 'Fitriani Indah',
        keperluan: 'Validasi Instrumen Penelitian', jadwal: 'Selasa, 22 Juli 2025, 10:00',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 7,
        idDosen: '0002085908', namaDosen: 'Prof. Siti Nurmaini, M.T.',
        idMahasiswa: '09030582327001', namaMahasiswa: 'Andi Wijaya',
        keperluan: 'Konsultasi Paper Ilmiah', jadwal: '17 Juli 2025, 11:00',
        status: 'Feedback Diberikan', feedback: 'Struktur paper sudah bagus, tinggal perbaiki bagian abstrak dan kesimpulan.', alasanTolak: null
    },

    // ID Pertemuan 8-14: Permintaan untuk Dr. Ir. Ahmad Heryanto, M.T. (0022018703)
    {
        idPertemuan: 8,
        idDosen: '0022018703', namaDosen: 'Dr. Ir. Ahmad Heryanto, M.T.',
        idMahasiswa: '09030582226053', namaMahasiswa: 'Wahyu Pramana',
        keperluan: 'Bimbingan Tugas Akhir - Bab 3', jadwal: 'Senin, 21 Juli 2025, 10:00',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 9,
        idDosen: '0022018703', namaDosen: 'Dr. Ir. Ahmad Heryanto, M.T.',
        idMahasiswa: '09030582327004', namaMahasiswa: 'Fitriani Indah',
        keperluan: 'Persiapan Seminar Proposal', jadwal: 'Rabu, 23 Juli 2025, 14:30',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 10,
        idDosen: '0022018703', namaDosen: 'Dr. Ir. Ahmad Heryanto, M.T.',
        idMahasiswa: '0903058212608', namaMahasiswa: 'Rahayu Prasiska',
        keperluan: 'Minta Tanda Tangan KRS', jadwal: 'Rabu, 23 Juli 2025, 14:00',
        status: 'Ditolak', feedback: null, alasanTolak: 'Untuk tanda tangan KRS silakan temui saya langsung di ruangan pada jam kerja, tidak perlu melalui sistem.'
    },
    {
        idPertemuan: 11,
        idDosen: '0022018703', namaDosen: 'Dr. Ir. Ahmad Heryanto, M.T.',
        idMahasiswa: '09030582226053', namaMahasiswa: 'Wahyu Pramana',
        keperluan: 'Bimbingan Tugas Akhir - Bab 2', jadwal: '14 Juli 2025, 10:00',
        status: 'Selesai', feedback: "Terima kasih banyak, Pak. Sesi bimbingan ini sangat membuka wawasan saya.", alasanTolak: null
    },
    {
        idPertemuan: 12,
        idDosen: '0022018703', namaDosen: 'Dr. Ir. Ahmad Heryanto, M.T.',
        idMahasiswa: '09030582327001', namaMahasiswa: 'Andi Wijaya',
        keperluan: 'Diskusi Metodologi Penelitian', jadwal: 'Senin, 21 Juli 2025, 10:30',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 13,
        idDosen: '0022018703', namaDosen: 'Dr. Ir. Ahmad Heryanto, M.T.',
        idMahasiswa: '09030582126015', namaMahasiswa: 'Wahyu Hidayat',
        keperluan: 'Konsultasi Awal Topik TA', jadwal: 'Rabu, 23 Juli 2025, 15:00',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
     {
        idPertemuan: 14,
        idDosen: '0022018703', namaDosen: 'Dr. Ir. Ahmad Heryanto, M.T.',
        idMahasiswa: '09030582226053', namaMahasiswa: 'Wahyu Pramana',
        keperluan: 'Bimbingan Tugas Akhir - Bab 1', jadwal: '7 Juli 2025, 10:00',
        status: 'Feedback Diberikan', feedback: "Sudah oke, lanjutkan ke Bab 2.", alasanTolak: null
    },

    // ID Pertemuan 15-20: Permintaan untuk Iman Saladin, S.Kom., M.M.S.I. (0022108702)
    {
        idPertemuan: 15,
        idDosen: '0022108702', namaDosen: 'Iman Saladin, S.Kom., M.M.S.I.',
        idMahasiswa: '0903058212608', namaMahasiswa: 'Rahayu Prasiska',
        keperluan: 'Diskusi Proyek Kelas RPL', jadwal: 'Jumat, 25 Juli 2025, 09:30',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 16,
        idDosen: '0022108702', namaDosen: 'Iman Saladin, S.Kom., M.M.S.I.',
        idMahasiswa: '09030582327003', namaMahasiswa: 'Eko Nugroho',
        keperluan: 'Revisi Laporan Magang', jadwal: '18 Juli 2025, 10:00',
        status: 'Selesai', feedback: "Feedback sudah diberikan secara lisan.", alasanTolak: null
    },
    {
        idPertemuan: 17,
        idDosen: '0022108702', namaDosen: 'Iman Saladin, S.Kom., M.M.S.I.',
        idMahasiswa: '09030582327001', namaMahasiswa: 'Andi Wijaya',
        keperluan: 'Presentasi Kemajuan Proyek', jadwal: 'Jumat, 25 Juli 2025, 10:00',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 18,
        idDosen: '0022108702', namaDosen: 'Iman Saladin, S.Kom., M.M.S.I.',
        idMahasiswa: '0903058212608', namaMahasiswa: 'Rahayu Prasiska',
        keperluan: 'Tanya materi sebelum UTS', jadwal: 'Jumat, 25 Juli 2025, 10:30',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 19,
        idDosen: '0022108702', namaDosen: 'Iman Saladin, S.Kom., M.M.S.I.',
        idMahasiswa: '09030582327002', namaMahasiswa: 'Citra Lestari',
        keperluan: 'Bimbingan Proyek Akhir', jadwal: '18 Juli 2025, 09:30',
        status: 'Selesai', feedback: 'Bagus, pertahankan.', alasanTolak: null
    },
    {
        idPertemuan: 20,
        idDosen: '0022108702', namaDosen: 'Iman Saladin, S.Kom., M.M.S.I.',
        idMahasiswa: '09030582226053', namaMahasiswa: 'Wahyu Pramana',
        keperluan: 'Pengesahan Laporan KP', jadwal: '11 Juli 2025, 10:00',
        status: 'Feedback Diberikan', feedback: 'Laporan sudah disahkan.', alasanTolak: null
    },

    // ID Pertemuan 21-26: Permintaan untuk Dr. Retno Lestari, M.Kom. (0011223301)
    {
        idPertemuan: 21,
        idDosen: '0011223301', namaDosen: 'Dr. Retno Lestari, M.Kom.',
        idMahasiswa: '09030582226053', namaMahasiswa: 'Wahyu Pramana',
        keperluan: 'Revisi Jurnal Internasional', jadwal: 'Senin, 21 Juli 2025, 13:00',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 22,
        idDosen: '0011223301', namaDosen: 'Dr. Retno Lestari, M.Kom.',
        idMahasiswa: '09030582327001', namaMahasiswa: 'Andi Wijaya',
        keperluan: 'Konsultasi Machine Learning', jadwal: '16 Juli 2025, 09:00',
        status: 'Selesai', feedback: "Penjelasan sangat detail dan mudah dipahami.", alasanTolak: null
    },
    {
        idPertemuan: 23,
        idDosen: '0011223301', namaDosen: 'Dr. Retno Lestari, M.Kom.',
        idMahasiswa: '09030582327004', namaMahasiswa: 'Fitriani Indah',
        keperluan: 'Diskusi Algoritma Genetika', jadwal: 'Rabu, 23 Juli 2025, 09:00',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 24,
        idDosen: '0011223301', namaDosen: 'Dr. Retno Lestari, M.Kom.',
        idMahasiswa: '0903058212608', namaMahasiswa: 'Rahayu Prasiska',
        keperluan: 'Bimbingan Lomba Data Mining', jadwal: 'Senin, 21 Juli 2025, 13:30',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 25,
        idDosen: '0011223301', namaDosen: 'Dr. Retno Lestari, M.Kom.',
        idMahasiswa: '09030582327002', namaMahasiswa: 'Citra Lestari',
        keperluan: 'Revisi Tugas Besar', jadwal: '16 Juli 2025, 09:30',
        status: 'Feedback Diberikan', feedback: 'Perbaiki bagian visualisasi data.', alasanTolak: null
    },
    {
        idPertemuan: 26,
        idDosen: '0011223301', namaDosen: 'Dr. Retno Lestari, M.Kom.',
        idMahasiswa: '09030582327003', namaMahasiswa: 'Eko Nugroho',
        keperluan: 'Izin tidak masuk kelas', jadwal: 'Rabu, 23 Juli 2025, 09:30',
        status: 'Ditolak', feedback: null, alasanTolak: 'Izin sakit harap melampirkan surat dokter ke bagian akademik.'
    },
    
    // Sisa data untuk dosen dan mahasiswa lainnya...
    // (Data di bawah ini melengkapi kebutuhan per mahasiswa dan dosen)
    {
        idPertemuan: 27,
        idDosen: '0044556602', namaDosen: 'Budi Santoso, S.T., M.Eng.',
        idMahasiswa: '09030582327001', namaMahasiswa: 'Andi Wijaya',
        keperluan: 'Bimbingan Proyek IoT', jadwal: 'Selasa, 22 Juli 2025, 14:00',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 28,
        idDosen: '0044556602', namaDosen: 'Budi Santoso, S.T., M.Eng.',
        idMahasiswa: '09030582327002', namaMahasiswa: 'Citra Lestari',
        keperluan: 'Tanya soal UAS Jaringan Komputer', jadwal: 'Kamis, 24 Juli 2025, 10:30',
        status: 'Ditolak', feedback: null, alasanTolak: 'Mohon maaf, pertanyaan seputar UAS hanya dilayani pada sesi kelas tambahan.'
    },
     {
        idPertemuan: 29,
        idDosen: '0044556602', namaDosen: 'Budi Santoso, S.T., M.Eng.',
        idMahasiswa: '09030582126015', namaMahasiswa: 'Wahyu Hidayat',
        keperluan: 'Konsultasi Jaringan Sensor Nirkabel', jadwal: 'Selasa, 22 Juli 2025, 14:30',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
     {
        idPertemuan: 30,
        idDosen: '0044556602', namaDosen: 'Budi Santoso, S.T., M.Eng.',
        idMahasiswa: '09030582327003', namaMahasiswa: 'Eko Nugroho',
        keperluan: 'Demo Alat Proyek Akhir', jadwal: 'Kamis, 24 Juli 2025, 11:00',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
     {
        idPertemuan: 31,
        idDosen: '0044556602', namaDosen: 'Budi Santoso, S.T., M.Eng.',
        idMahasiswa: '0903058212608', namaMahasiswa: 'Rahayu Prasiska',
        keperluan: 'Tanya terkait materi Cisco', jadwal: '15 Juli 2025, 14:00',
        status: 'Selesai', feedback: 'Sudah dijelaskan via WhatsApp.', alasanTolak: null
    },
     {
        idPertemuan: 32,
        idDosen: '0044556602', namaDosen: 'Budi Santoso, S.T., M.Eng.',
        idMahasiswa: '09030582327004', namaMahasiswa: 'Fitriani Indah',
        keperluan: 'Ujian Susulan', jadwal: '17 Juli 2025, 14:00',
        status: 'Feedback Diberikan', feedback: 'Hasil ujian susulan sudah diumumkan.', alasanTolak: null
    },
    {
        idPertemuan: 33,
        idDosen: '0077889903', namaDosen: 'Prof. Dr. Ir. Rina Marlina, M.Sc.',
        idMahasiswa: '09030582327002', namaMahasiswa: 'Citra Lestari',
        keperluan: 'Validasi Kuesioner Penelitian', jadwal: 'Rabu, 23 Juli 2025, 11:00',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 34,
        idDosen: '0077889903', namaDosen: 'Prof. Dr. Ir. Rina Marlina, M.Sc.',
        idMahasiswa: '0903058212608', namaMahasiswa: 'Rahayu Prasiska',
        keperluan: 'Diskusi topik penelitian', jadwal: 'Senin, 21 Juli 2025, 11:00',
        status: 'Selesai', feedback: 'Topik menarik, silakan dilanjutkan.', alasanTolak: null
    },
    {
        idPertemuan: 35,
        idDosen: '0077889903', namaDosen: 'Prof. Dr. Ir. Rina Marlina, M.Sc.',
        idMahasiswa: '09030582126015', namaMahasiswa: 'Wahyu Hidayat',
        keperluan: 'Bimbingan Metodologi', jadwal: 'Rabu, 23 Juli 2025, 11:30',
        status: 'Disetujui', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 36,
        idDosen: '0077889903', namaDosen: 'Prof. Dr. Ir. Rina Marlina, M.Sc.',
        idMahasiswa: '09030582327003', namaMahasiswa: 'Eko Nugroho',
        keperluan: 'Minta data untuk penelitian', jadwal: 'Jumat, 25 Juli 2025, 14:00',
        status: 'Ditolak', feedback: null, alasanTolak: 'Data yang Anda minta bersifat rahasia.'
    },
    {
        idPertemuan: 37,
        idDosen: '0077889903', namaDosen: 'Prof. Dr. Ir. Rina Marlina, M.Sc.',
        idMahasiswa: '09030582327004', namaMahasiswa: 'Fitriani Indah',
        keperluan: 'Diskusi hasil olah data', jadwal: 'Jumat, 25 Juli 2025, 14:30',
        status: 'Menunggu', feedback: null, alasanTolak: null
    },
    {
        idPertemuan: 38,
        idDosen: '0077889903', namaDosen: 'Prof. Dr. Ir. Rina Marlina, M.Sc.',
        idMahasiswa: '09030582226053', namaMahasiswa: 'Wahyu Pramana',
        keperluan: 'Bimbingan Kualitatif', jadwal: '14 Juli 2025, 11:00',
        status: 'Feedback Diberikan', feedback: 'Metode sudah tepat.', alasanTolak: null
    }
];


// =================================================
// LOGIKA APLIKASI
// =================================================
$(document).ready(function() {

    // Fungsi untuk menangani proses login
    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        const username = $('#inputUsername').val();
        const password = $('#inputPassword').val();
        const user = users[username];

        if (user && user.password === password) {
            // Simpan data pengguna yang login ke session storage
            localStorage.setItem('loggedInUser', JSON.stringify({ id: username, name: user.name, role: user.role }));
            // Arahkan ke dashboard yang sesuai dengan peran (role)
            if (user.role === 'dosen') {
                window.location.href = 'dashboard-dosen.html';
            } else {
                window.location.href = 'dashboard-mahasiswa.html';
            }
        } else {
            // Tampilkan pesan error jika login gagal
            $('#login-alert').text('NIM/NIDN atau Password salah!').fadeIn();
        }
    });

    // Ambil data pengguna yang login dari session storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // TAMBAHKAN KODE INI
        // =================================================================
        // Cek dan inisialisasi data master jika belum ada di localStorage
        if (!localStorage.getItem('semua_pertemuan')) {
            localStorage.setItem('semua_pertemuan', JSON.stringify(initialSemuaPertemuan));
        }
        // =================================================================

        // Tampilkan nama pengguna dan siapkan fungsi logout
        $('.user-name').text(loggedInUser.name);
        $('.logout-link').on('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('loggedInUser'); // UBAH MENJADI INI
            window.location.href = 'index.html';
        });
    } else {
        // Jika tidak ada pengguna yang login, paksa kembali ke halaman login
        // kecuali jika sudah di halaman login atau bantuan
        const isPublicPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('bantuan.html');
        if (!isPublicPage) {
            window.location.href = 'index.html';
        }
    }

    // --- LOGIKA HALAMAN MAHASISWA ---
    if (loggedInUser && loggedInUser.role === 'mahasiswa') {
        // TAMBAHKAN 2 BARIS KODE INI SEBAGAI PENGGANTI:
        const semuaPertemuan = JSON.parse(localStorage.getItem('semua_pertemuan'));
        const pertemuanMahasiswa = semuaPertemuan.filter(p => p.idMahasiswa === loggedInUser.id);

        // Fungsi untuk merender tabel data pertemuan mahasiswa
        function renderMahasiswaTable(tableBody, data) {
            tableBody.empty();
            if (data.length > 0) {
                data.forEach((item, index) => {
                    let statusOrAction;
                    let rowClass = '';

                    // Tentukan tampilan status atau tombol aksi berdasarkan status pertemuan
                    if (item.status === 'Disetujui') {
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Disetujui</span>`;
                    } else if (item.status === 'Ditolak') {
                        // JIKA DITOLAK: Beri tombol untuk lihat alasan jika ada
                        if (item.alasanTolak) {
                            const safeAlasan = item.alasanTolak.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                            statusOrAction = `<button data-alasan="${safeAlasan}" class="btn-lihat-alasan bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs">Ditolak (Lihat Alasan)</button>`;
                        } else {
                            statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Ditolak</span>`;
                        }
                    } else if (item.status === 'Selesai') {
                        statusOrAction = `<button data-id-pertemuan="${item.idPertemuan}" class="btn-feedback bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-3 rounded text-xs">Beri Feedback</button>`;
                    } else if (item.status === 'Feedback Diberikan') {
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Feedback Diberikan</span>`;
                        rowClass = 'bg-purple-50';
                    } else { // Menunggu
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Menunggu</span>`;
                    }

                    const rowHtml = `<tr class="${rowClass}"><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${index + 1}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.namaDosen}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.keperluan}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.jadwal}</td><td class="px-6 py-4 whitespace-nowrap">${statusOrAction}</td></tr>`;
                    tableBody.append(rowHtml);
                });
            } else {
                tableBody.append(`<tr><td colspan="5" class="text-center text-gray-500 py-4">Tidak ada data pertemuan.</td></tr>`);
            }
        }

        // Logika untuk halaman dashboard mahasiswa
        if (window.location.pathname.endsWith('dashboard-mahasiswa.html')) {
            const pertemuanAktif = pertemuanMahasiswa.filter(p => p.status === 'Disetujui' || p.status === 'Menunggu');
            renderMahasiswaTable($('#jadwal-table-body'), pertemuanAktif);

            // Logika untuk menampilkan notifikasi
            const notificationKey = `notification_for_${loggedInUser.id}`;
            const notificationMessage = localStorage.getItem(notificationKey);

            if (notificationMessage) {
                $('#notification-message').text(notificationMessage);
                $('#notification-toast').fadeIn().removeClass('hidden');
                localStorage.removeItem(notificationKey);
                setTimeout(() => { $('#notification-toast').fadeOut(); }, 7000);
            }

            $('#notification-close-btn').on('click', function() {
                $('#notification-toast').fadeOut();
            });
        }

        // Logika untuk halaman riwayat pertemuan mahasiswa
        if (window.location.pathname.endsWith('riwayat-pertemuan-mahasiswa.html')) {
            const riwayatTableBody = $('#riwayat-table-body');
            renderMahasiswaTable(riwayatTableBody, pertemuanMahasiswa);

            // GANTI BLOK INI: riwayatTableBody.on('click', '.btn-feedback', ...)
            riwayatTableBody.on('click', '.btn-feedback', function() {
                // Ambil idPertemuan unik dari tombol
                const idPertemuan = $(this).data('id-pertemuan');
                // Simpan idPertemuan ke form modal untuk digunakan saat submit
                $('#feedback-form').data('id-pertemuan', idPertemuan);
                $('#give-feedback-modal').removeClass('hidden');
            });

            riwayatTableBody.on('click', '.btn-lihat-alasan', function() {
                const alasan = $(this).data('alasan');
                $('#alasan-content').text(alasan);
                $('#lihat-alasan-modal').removeClass('hidden');
            });

            $('.close-lihat-alasan-modal').on('click', function() {
                $('#lihat-alasan-modal').addClass('hidden');
            });
        }

        // GANTI SELURUH BLOK INI: $('#feedback-form').on('submit', ...)
        $('#feedback-form').on('submit', function(event) {
            event.preventDefault();

            // 1. Ambil data yang diperlukan dari form dan modal
            const idPertemuan = $(this).data('id-pertemuan');
            const feedbackText = $('#feedback-textarea').val();

            if (feedbackText) {
                // 2. Ambil data master dari localStorage
                let semuaPertemuan = JSON.parse(localStorage.getItem('semua_pertemuan'));

                // 3. Cari index dari pertemuan yang akan diubah di data master
                const indexToUpdate = semuaPertemuan.findIndex(p => p.idPertemuan === idPertemuan);

                if (indexToUpdate !== -1) {
                    // 4. Ubah status dan isi feedback di data master
                    semuaPertemuan[indexToUpdate].status = 'Feedback Diberikan';
                    semuaPertemuan[indexToUpdate].feedback = feedbackText;

                    // 5. Simpan kembali seluruh data master yang sudah diperbarui
                    localStorage.setItem('semua_pertemuan', JSON.stringify(semuaPertemuan));

                    // 6. Tutup modal dan render ulang tabel
                    $('#give-feedback-modal').addClass('hidden');
                    $(this)[0].reset();

                    // PERBAIKAN: Panggil fungsi render ulang dengan data yang sudah difilter ulang
                    const dataMahasiswaTerbaru = semuaPertemuan.filter(p => p.idMahasiswa === loggedInUser.id);
                    renderMahasiswaTable($('#riwayat-table-body'), dataMahasiswaTerbaru);
                }
            }
        });

        $('.close-feedback-modal').on('click', function() {
            $('#give-feedback-modal').addClass('hidden');
            $('#feedback-form')[0].reset();
        });
    }

    // --- LOGIKA HALAMAN AJUKAN PERTEMUAN ---
    if (window.location.pathname.endsWith('jadwal-mahasiswa.html')) {
        const dosenSelect = $('#pilihDosen');
        const jadwalContainer = $('#jadwal-container');

        for (const nidn in users) {
            if (users[nidn].role === 'dosen') {
                dosenSelect.append(`<option value="${nidn}" data-nama="${users[nidn].name}">${users[nidn].name}</option>`);
            }
        }

        dosenSelect.on('change', function() {
            const selectedNidn = $(this).val();
            jadwalContainer.empty();
            if (selectedNidn && jadwalDosen[selectedNidn]) {
                jadwalDosen[selectedNidn].forEach(slot => {
                    const cardHtml = `<div class="w-full md:w-1/2 lg:w-1/3 p-2"><div class="jadwal-card bg-white rounded-lg border border-gray-200 p-4 text-center cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all" data-jadwal-text="${slot.hari}, ${slot.tanggal}, ${slot.jam}"><h5 class="font-bold text-lg text-gray-800">${slot.hari}</h5><p class="text-gray-500 text-sm">${slot.tanggal}</p><p class="font-semibold text-blue-600 mt-2">${slot.jam}</p></div></div>`;
                    jadwalContainer.append(cardHtml);
                });
            } else {
                jadwalContainer.html('<p class="text-gray-500 w-full p-2">Pilih dosen untuk melihat jadwal yang tersedia.</p>');
            }
        });

        $('#jadwal-container').on('click', '.jadwal-card', function() {
            $('.jadwal-card').removeClass('active');
            $(this).addClass('active');
        });

        // Ganti seluruh isi fungsi $('#form-pengajuan').on('submit', ...) dengan ini:
        $('#form-pengajuan').on('submit', function(event) {
            event.preventDefault();

            // 1. Ambil semua data yang diperlukan dari form
            const keperluan = $('#keperluan').val();
            const selectedDosenOption = $('#pilihDosen option:selected');
            const idDosen = selectedDosenOption.val();
            const namaDosen = selectedDosenOption.data('nama');
            const jadwalText = $('.jadwal-card.active').data('jadwal-text');
            
            if (!idDosen || !jadwalText || !keperluan) {
                alert('Harap lengkapi semua data: pilih dosen, pilih jadwal, dan isi keperluan.');
                return;
            }

            // 2. Ambil data master dari localStorage
            let semuaPertemuan = JSON.parse(localStorage.getItem('semua_pertemuan'));

            // 3. Buat objek pertemuan baru dengan struktur data yang lengkap dan benar
            const newPertemuan = {
                idPertemuan: Date.now(), // Gunakan timestamp untuk ID unik yang sederhana
                idDosen: idDosen,
                namaDosen: namaDosen,
                idMahasiswa: loggedInUser.id,
                namaMahasiswa: loggedInUser.name,
                keperluan: keperluan,
                jadwal: jadwalText,
                status: 'Menunggu', // Status awal selalu 'Menunggu'
                feedback: null,
                alasanTolak: null
            };

            // 4. Tambahkan pertemuan baru ke dalam array data master
            semuaPertemuan.push(newPertemuan);

            // 5. Simpan kembali seluruh data master yang sudah diperbarui ke localStorage
            localStorage.setItem('semua_pertemuan', JSON.stringify(semuaPertemuan));
            
            // 6. Tampilkan notifikasi sukses dan arahkan pengguna
            $('#success-alert').text('Berhasil! Pengajuan pertemuan Anda telah terkirim.').fadeIn();
            setTimeout(function() { window.location.href = "dashboard-mahasiswa.html"; }, 2000);
        });
    }

// --- LOGIKA UNTUK SEMUA HALAMAN DOSEN ---
if (loggedInUser && loggedInUser.role === 'dosen') {
    const semuaPertemuan = JSON.parse(localStorage.getItem('semua_pertemuan'));
    let dataPertemuanDosen = semuaPertemuan.filter(p => p.idDosen === loggedInUser.id);

    // --- Logika untuk Dashboard Dosen ---
    if (window.location.pathname.endsWith('dashboard-dosen.html')) {

        dataPertemuanDosen = JSON.parse(localStorage.getItem('semua_pertemuan')).filter(p => p.idDosen === loggedInUser.id);
        const permintaanBaruCount = dataPertemuanDosen.filter(p => p.status === 'Menunggu').length;
        const jadwalDisetujuiCount = dataPertemuanDosen.filter(p => p.status === 'Disetujui').length;
        const pertemuanSelesaiCount = dataPertemuanDosen.filter(p => p.status === 'Selesai' || p.status === 'Feedback Diberikan').length;

        $('#permintaan-baru-count').text(permintaanBaruCount);
        $('#total-disetujui-count').text(jadwalDisetujuiCount);
        $('#pertemuan-selesai-count').text(pertemuanSelesaiCount);

        const tableBody = $('#permintaan-terbaru-body');
        tableBody.empty();
        const permintaanMenunggu = dataPertemuanDosen.filter(p => p.status === 'Menunggu').slice(0, 5);
        if (permintaanMenunggu.length > 0) {
            permintaanMenunggu.forEach(item => {
                // PERBAIKAN: Menggunakan properti yang benar 'namaMahasiswa' dan 'idMahasiswa'
                const rowHtml = `<tr><td class="px-6 py-4">${item.namaMahasiswa} (${item.idMahasiswa})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4 text-center"><a href="permintaan-dosen.html" class="text-blue-600 hover:text-blue-900 font-medium">Lihat Detail</a></td></tr>`;
                tableBody.append(rowHtml);
            });
        } else {
            tableBody.append(`<tr><td colspan="3" class="text-center text-gray-500 py-4">Tidak ada permintaan baru.</td></tr>`);
        }
    }

    // --- Logika untuk Halaman Permintaan Dosen ---
    if (window.location.pathname.endsWith('permintaan-dosen.html')) {
        const tableBody = $('#permintaan-table-body');
        const totalPermintaanSpan = $('#total-permintaan');

        function renderTable() {
            // PERBAIKAN: Selalu ambil data terbaru dari localStorage setiap kali render ulang
            const allData = JSON.parse(localStorage.getItem('semua_pertemuan'));
            dataPertemuanDosen = allData.filter(p => p.idDosen === loggedInUser.id);

            tableBody.empty();
            const permintaanMenunggu = dataPertemuanDosen.filter(p => p.status === 'Menunggu');
            totalPermintaanSpan.text(`Total: ${permintaanMenunggu.length} Permintaan Menunggu`);

            dataPertemuanDosen.forEach(item => { // PERBAIKAN: Tidak perlu 'index' lagi
                let statusOrAction;
                let rowClass = '';

                if (item.status === 'Disetujui') {
                    // PERBAIKAN: Menggunakan 'idPertemuan' sebagai pengenal unik, bukan index
                    statusOrAction = `<div class="action-buttons"><button data-id-pertemuan="${item.idPertemuan}" class="btn-selesaikan bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-xs">Selesaikan</button></div>`;
                    rowClass = 'bg-green-50';
                } else if (item.status === 'Ditolak') {
                    statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Ditolak</span>`;
                    rowClass = 'bg-red-50';
                } else if (item.status === 'Selesai' || item.status === 'Feedback Diberikan') {
                    statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Selesai</span>`;
                    rowClass = 'bg-gray-100';
                } else { // Menunggu
                    statusOrAction = `<div class="action-buttons space-x-2"><button data-id-pertemuan="${item.idPertemuan}" class="btn-setujui bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-xs">Setujui</button><button data-id-pertemuan="${item.idPertemuan}" class="btn-tolak bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs">Tolak</button></div>`;
                }
                
                // PERBAIKAN: Menggunakan properti yang benar 'namaMahasiswa' dan 'idMahasiswa'
                const rowHtml = `<tr class="${rowClass}"><td class="px-6 py-4">${item.namaMahasiswa} (${item.idMahasiswa})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4">${item.jadwal}</td><td class="px-6 py-4 text-center">${statusOrAction}</td></tr>`;
                tableBody.append(rowHtml);
            });
        }

        renderTable();

        // PERBAIKAN: LOGIKA AKSI DIUBAH TOTAL
        tableBody.on('click', '.btn-setujui, .btn-selesaikan', function() {
            const idPertemuan = $(this).data('id-pertemuan');
            let message = '';
            let newStatus = '';

            if ($(this).hasClass('btn-setujui')) {
                message = 'Satu permintaan pertemuan Anda telah disetujui.';
                newStatus = 'Disetujui';
            } else if ($(this).hasClass('btn-selesaikan')) {
                message = 'Satu pertemuan Anda telah ditandai selesai oleh dosen.';
                newStatus = 'Selesai';
            }
            
            // 1. Ambil data master dari localStorage
            let semuaPertemuan = JSON.parse(localStorage.getItem('semua_pertemuan'));
            
            // 2. Cari index dari pertemuan yang akan diubah di data master
            const indexToUpdate = semuaPertemuan.findIndex(p => p.idPertemuan === idPertemuan);

            if (indexToUpdate !== -1) {
                const nimMahasiswa = semuaPertemuan[indexToUpdate].idMahasiswa;
                // 3. Ubah status di data master
                semuaPertemuan[indexToUpdate].status = newStatus;
                
                // 4. Set notifikasi untuk mahasiswa
                if (message) {
                    localStorage.setItem(`notification_for_${nimMahasiswa}`, message);
                }
                
                // 5. Simpan kembali data master yang sudah diubah ke localStorage
                localStorage.setItem('semua_pertemuan', JSON.stringify(semuaPertemuan));
                
                // 6. Render ulang tabel
                renderTable();
            }
        });

        tableBody.on('click', '.btn-tolak', function() {
            const idPertemuan = $(this).data('id-pertemuan');
            $('#form-alasan-tolak').data('id-pertemuan', idPertemuan); // Gunakan id-pertemuan, bukan index
            $('#tolak-alasan-modal').removeClass('hidden');
        });

        $('#form-alasan-tolak').on('submit', function(e) {
            e.preventDefault();
            const idPertemuan = $(this).data('id-pertemuan');
            const alasan = $('#alasan-tolak-textarea').val();
            
            let semuaPertemuan = JSON.parse(localStorage.getItem('semua_pertemuan'));
            const indexToUpdate = semuaPertemuan.findIndex(p => p.idPertemuan === idPertemuan);

            if (indexToUpdate !== -1) {
                const nimMahasiswa = semuaPertemuan[indexToUpdate].idMahasiswa;
                semuaPertemuan[indexToUpdate].status = 'Ditolak';
                semuaPertemuan[indexToUpdate].alasanTolak = alasan;

                const message = 'Satu permintaan pertemuan Anda telah ditolak.';
                localStorage.setItem(`notification_for_${nimMahasiswa}`, message);
                localStorage.setItem('semua_pertemuan', JSON.stringify(semuaPertemuan));
                
                $('#tolak-alasan-modal').addClass('hidden');
                $(this)[0].reset();
                renderTable();
            }
        });

        $('.close-tolak-modal').on('click', function() {
            $('#tolak-alasan-modal').addClass('hidden');
            $('#form-alasan-tolak')[0].reset();
        });
    }

    // --- Logika untuk Halaman Pertemuan Selesai Dosen ---
    if (window.location.pathname.endsWith('pertemuan-selesai-dosen.html')) {
        const tableBody = $('#selesai-table-body');
        tableBody.empty();
        const dataSelesai = dataPertemuanDosen.filter(p => p.status === 'Selesai' || p.status === 'Feedback Diberikan');
        if (dataSelesai.length > 0) {
            dataSelesai.forEach(item => {
                let feedbackCell;
                if (item.feedback) {
                    const safeFeedback = item.feedback.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                    feedbackCell = `<button data-feedback="${safeFeedback}" class="btn-lihat-feedback bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-3 rounded text-xs">Lihat Feedback</button>`;
                } else {
                    feedbackCell = `<span class="text-gray-400 text-xs italic">Belum ada</span>`;
                }
                // PERBAIKAN: Menggunakan properti yang benar 'namaMahasiswa' dan 'idMahasiswa'
                const rowHtml = `<tr><td class="px-6 py-4">${item.namaMahasiswa} (${item.idMahasiswa})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4">${item.jadwal}</td><td class="px-6 py-4 text-center">${feedbackCell}</td></tr>`;
                tableBody.append(rowHtml);
            });

            $('.btn-lihat-feedback').on('click', function() {
                const feedbackText = $(this).data('feedback');
                $('#feedback-content').text(feedbackText);
                $('#feedback-modal').removeClass('hidden');
            });

        } else {
            tableBody.append(`<tr><td colspan="4" class="text-center text-gray-500 py-4">Belum ada pertemuan yang selesai.</td></tr>`);
        }
    }
  }

    // =================================================
    // LOGIKA UNTUK HALAMAN PROFIL (UNTUK SEMUA ROLE)
    // =================================================
    if (window.location.pathname.endsWith('profil-mahasiswa.html') || window.location.pathname.endsWith('profil-dosen.html')) {
        if (loggedInUser) {
            $('#profile-name').text(loggedInUser.name);
            $('#profile-id').text(loggedInUser.id);
            $('#profile-role').text(loggedInUser.role);
        }
    }
    // =================================================
    // EVENT LISTENER UMUM UNTUK MENUTUP MODAL
    // =================================================
    $('.close-modal').on('click', function() {
        // Menargetkan semua modal yang mungkin ada
        $('#feedback-modal').addClass('hidden');
        $('#lihat-alasan-modal').addClass('hidden');
        $('#give-feedback-modal').addClass('hidden');
        $('#tolak-alasan-modal').addClass('hidden');
    });

});
