// File: assets/js/main.js
// Deskripsi: Versi terbaru dengan localStorage, profil, validasi jadwal, dan notifikasi.

// =================================================
// DATA PENGGUNA (DATABASE SIMULASI)
// =================================================
const users = {
    // Data Dosen
    '0002085908': { name: 'Prof. Siti Nurmaini, M.T', password: '123456', role: 'dosen', email: 'siti.nurmaini@unsri.ac.id', bidangKeahlian: 'Kecerdasan Buatan, Robotika' },
    '0022018703': { name: 'Dr. Ir. Ahmad Heryanto, M.T', password: '123456', role: 'dosen', email: 'ahmad.heryanto@unsri.ac.id', bidangKeahlian: 'Jaringan Komputer, Keamanan Siber' },
    '0022108702': { name: 'Iman Saladin B.Azhar, S.Kom., M.M.S.I', password: '123456', role: 'dosen', email: 'iman.saladin@unsri.ac.id', bidangKeahlian: 'Rekayasa Perangkat Lunak, Sistem Informasi' },
    // Data Mahasiswa
    '09030582226053': { name: 'Wahyu Pramana', password: '123456', role: 'mahasiswa', email: 'wahyu.pramana@student.unsri.ac.id', jurusan: 'Sistem Komputer' },
    '0903058212608': { name: 'Rahayu Prasiska', password: '123456', role: 'mahasiswa', email: 'rahayu.prasiska@student.unsri.ac.id', jurusan: 'Sistem Informasi' },
    '09030582126015': { name: 'Wahyu Hidayat', password: '123456', role: 'mahasiswa', email: 'wahyu.hidayat@student.unsri.ac.id', jurusan: 'Teknik Informatika' }
};

// Jadwal ketersediaan default Dosen
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
    ]
};

// Data pertemuan awal (hanya akan di-load jika localStorage kosong)
const initialMahasiswaData = {
    '09030582226053': [{ id: 1, dosenNidn: '0022018703', dosen: 'Dr. Ir. Ahmad Heryanto, M.T', keperluan: 'Bimbingan Tugas Akhir - Bab 3', jadwal: 'Senin, 21 Juli 2025, 10:00 - 10:30', status: 'Disetujui', notifikasi: 'sudah_dilihat' }],
    // ... data lainnya bisa ditambahkan
};
const initialDosenData = {
    '0022018703': [{ id: 1, mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Bimbingan Tugas Akhir - Bab 3', jadwal: 'Senin, 21 Juli 2025, 10:00 - 10:30', status: 'Disetujui', notifikasi: 'sudah_dilihat' }],
    // ... data lainnya bisa ditambahkan
};


// =================================================
// LOGIKA APLIKASI
// =================================================
$(document).ready(function() {

    // --- Fungsi untuk menangani proses login ---
    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        const username = $('#inputUsername').val();
        const password = $('#inputPassword').val();
        const user = users[username];

        if (user && user.password === password) {
            localStorage.setItem('loggedInUser', JSON.stringify({ id: username, name: user.name, role: user.role }));
            
            // Inisialisasi data jika belum ada di localStorage
            if (user.role === 'mahasiswa' && !localStorage.getItem(`pertemuan_${username}`)) {
                 localStorage.setItem(`pertemuan_${username}`, JSON.stringify(initialMahasiswaData[username] || []));
            } else if (user.role === 'dosen' && !localStorage.getItem(`permintaan_${username}`)) {
                 localStorage.setItem(`permintaan_${username}`, JSON.stringify(initialDosenData[username] || []));
            }

            window.location.href = user.role === 'dosen' ? 'dashboard-dosen.html' : 'dashboard-mahasiswa.html';
        } else {
            $('#login-alert').text('NIM/NIDN atau Password salah!').fadeIn();
        }
    });

    // --- Logika Global untuk Pengguna yang Sudah Login ---
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Render Navbar Dinamis di semua halaman
        renderNavbar(loggedInUser);

        // ==========================================================
        // === BAGIAN BARU: Logika untuk Dropdown Menu di Navbar ===
        // ==========================================================
        $('body').on('click', '.dropdown-trigger', function(event) {
            event.stopPropagation(); // Mencegah event klik menyebar ke elemen document
            $(this).parent('.dropdown').toggleClass('is-active');
        });

        // Menutup dropdown jika pengguna mengklik di luar area dropdown
        $(document).on('click', function(event) {
            if (!$(event.target).closest('.dropdown').length) {
                $('.dropdown').removeClass('is-active');
            }
        });
        // ==========================================================
        // Logout
        // Event delegation diperlukan karena link logout dibuat secara dinamis
        $('body').on('click', '.logout-link', function(e) {
            // ... kode logout Anda yang sudah ada
        });
    } else {
        // Jika tidak ada pengguna yang login, paksa kembali ke halaman login
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'index.html') {
            window.location.href = 'index.html';
        }
    }
    
    // =================================================
    // --- BAGIAN BARU: FUNGSI-FUNGSI GLOBAL ---
    // =================================================
    
    /**
     * Membuat Navbar secara dinamis berdasarkan peran pengguna.
     * @param {object} user - Objek pengguna yang sedang login.
     */
    function renderNavbar(user) {
        const isMahasiswa = user.role === 'mahasiswa';
        const theme = isMahasiswa ? 'blue' : 'green';
        const pages = isMahasiswa ? 
            [
                { href: 'dashboard-mahasiswa.html', text: 'Dashboard' },
                { href: 'jadwal-mahasiswa.html', text: 'Tambahkan Pertemuan' },
                { href: 'riwayat-pertemuan-mahasiswa.html', text: 'Riwayat Pertemuan' }
            ] : 
            [
                { href: 'dashboard-dosen.html', text: 'Dashboard' },
                { href: 'kelola-jadwal-dosen.html', text: 'Kelola Ketersediaan' },
                { href: 'permintaan-dosen.html', text: 'Permintaan Masuk' },
                { href: 'pertemuan-selesai-dosen.html', text: 'Pertemuan Selesai' }
            ];
        
        const currentPage = window.location.pathname.split('/').pop();
        
        let navLinks = '';
        pages.forEach(page => {
            const isActive = currentPage === page.href;
            navLinks += `<a href="${page.href}" class="${isActive ? `text-white bg-${theme}-700` : `text-${theme}-200 hover:bg-${theme}-700 hover:text-white`} px-3 py-2 rounded-md text-sm font-medium ml-4">${page.text}</a>`;
        });

        // Cek notifikasi
        let hasNotif = false;
        const storageKey = isMahasiswa ? `pertemuan_${user.id}` : `permintaan_${user.id}`;
        const data = JSON.parse(localStorage.getItem(storageKey)) || [];
        if (data.some(item => item.notifikasi === 'belum_dilihat')) {
            hasNotif = true;
        }

        const navbarHtml = `
        <nav class="bg-${theme}-600 shadow-lg">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <img src="assets/img/logo.png" alt="Logo" class="h-8 w-8 mr-2">
                        <a href="#" class="text-white font-bold text-xl">Penjadwalan Dosen</a>
                    </div>
                    <div class="flex items-center">
                        ${navLinks}
                        <div class="relative ml-4">
                            <button class="text-${theme}-200 hover:text-white focus:outline-none">
                                <i class="fas fa-bell"></i>
                                ${hasNotif ? '<span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>' : ''}
                            </button>
                        </div>
                        <div class="relative ml-4 dropdown">
                            <button class="dropdown-trigger flex items-center text-white focus:outline-none">
                                <span class="text-sm font-medium">${user.name}</span>
                                <i class="fas fa-chevron-down ml-2 text-xs"></i>
                            </button>
                            <div class="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden">
                                <a href="profil.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
                                <a href="index.html" class="logout-link block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>`;
        
        $('#navbar-container').html(navbarHtml);
        // Menandai notifikasi sebagai sudah dilihat saat halaman dimuat
        if(hasNotif) markNotificationsAsRead(user);
    }

    /**
     * Menandai semua notifikasi 'belum_dilihat' menjadi 'sudah_dilihat'
     * @param {object} user - Objek pengguna yang sedang login.
     */
    function markNotificationsAsRead(user) {
        const storageKey = user.role === 'mahasiswa' ? `pertemuan_${user.id}` : `permintaan_${user.id}`;
        let data = JSON.parse(localStorage.getItem(storageKey)) || [];
        data.forEach(item => {
            if (item.notifikasi === 'belum_dilihat') {
                item.notifikasi = 'sudah_dilihat';
            }
        });
        localStorage.setItem(storageKey, JSON.stringify(data));
    }


    // =================================================
    // --- PENYESUAIAN HALAMAN MAHASISWA ---
    // =================================================
    if (loggedInUser && loggedInUser.role === 'mahasiswa') {
        const storageKey = `pertemuan_${loggedInUser.id}`;
        let pertemuanMahasiswa = JSON.parse(localStorage.getItem(storageKey)) || [];

        // --- Logika Halaman Jadwal Mahasiswa (Validasi Slot) ---
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
                jadwalContainer.empty().append('<p class="text-gray-500 w-full p-2">Memuat jadwal...</p>');

                // Ambil semua permintaan yang sudah disetujui untuk dosen ini
                const permintaanDosenKey = `permintaan_${selectedNidn}`;
                const permintaanDosen = JSON.parse(localStorage.getItem(permintaanDosenKey)) || initialDosenData[selectedNidn] || [];
                const jadwalDisetujui = permintaanDosen
                    .filter(p => p.status === 'Disetujui')
                    .map(p => p.jadwal.split(', ').slice(1).join(', ')); // Ambil bagian tanggal & jam saja
                
                setTimeout(() => { // Simulasi loading
                    jadwalContainer.empty();
                    if (selectedNidn && jadwalDosen[selectedNidn]) {
                        jadwalDosen[selectedNidn].forEach(slot => {
                            const jadwalText = `${slot.tanggal}, ${slot.jam}`;
                            const isBooked = jadwalDisetujui.includes(jadwalText);
                            const cardClass = isBooked ? 'bg-gray-200 border-gray-300 cursor-not-allowed' : 'bg-white border-gray-200 cursor-pointer hover:shadow-lg hover:border-blue-500';
                            const cardHtml = `
                            <div class="w-full md:w-1/2 lg:w-1/3 p-2">
                                <div class="jadwal-card border p-4 text-center rounded-lg transition-all ${cardClass}" 
                                     data-jadwal-full-text="${slot.hari}, ${jadwalText}" 
                                     ${isBooked ? 'disabled' : ''}>
                                    <h5 class="font-bold text-lg ${isBooked ? 'text-gray-500' : 'text-gray-800'}">${slot.hari}</h5>
                                    <p class="text-sm ${isBooked ? 'text-gray-400' : 'text-gray-500'}">${slot.tanggal}</p>
                                    <p class="font-semibold mt-2 ${isBooked ? 'text-gray-500' : 'text-blue-600'}">${slot.jam}</p>
                                    ${isBooked ? '<span class="text-xs font-bold text-red-600 block mt-1">SUDAH DIPESAN</span>' : ''}
                                </div>
                            </div>`;
                            jadwalContainer.append(cardHtml);
                        });
                    } else {
                        jadwalContainer.html('<p class="text-gray-500 w-full p-2">Pilih dosen untuk melihat jadwal.</p>');
                    }
                }, 500);
            });
            
            // Event listener untuk pengajuan form
            $('#form-pengajuan').on('submit', function(event) {
                event.preventDefault();
                const keperluan = $('#keperluan').val();
                const dosenSelectEl = $('#pilihDosen option:selected');
                const dosenNidn = dosenSelectEl.val();
                const dosenNama = dosenSelectEl.data('nama');
                const jadwalText = $('.jadwal-card.active').data('jadwal-full-text');

                if (!dosenNidn || !jadwalText || !keperluan) {
                    alert('Harap lengkapi semua data: pilih dosen, pilih jadwal, dan isi keperluan.');
                    return;
                }
                
                const newId = Date.now(); // ID unik untuk pertemuan

                // 1. Simpan di data mahasiswa
                let pertemuanMhs = JSON.parse(localStorage.getItem(storageKey)) || [];
                pertemuanMhs.push({ id: newId, dosen: dosenNama, dosenNidn: dosenNidn, keperluan: keperluan, jadwal: jadwalText, status: 'Menunggu', notifikasi: 'sudah_dilihat' });
                localStorage.setItem(storageKey, JSON.stringify(pertemuanMhs));

                // 2. Simpan di data dosen (untuk notifikasi)
                const permintaanKey = `permintaan_${dosenNidn}`;
                let permintaanDosen = JSON.parse(localStorage.getItem(permintaanKey)) || [];
                permintaanDosen.push({ id: newId, mahasiswa: loggedInUser.name, nim: loggedInUser.id, keperluan: keperluan, jadwal: jadwalText, status: 'Menunggu', notifikasi: 'belum_dilihat' });
                localStorage.setItem(permintaanKey, JSON.stringify(permintaanDosen));

                $('#success-alert').text('Berhasil! Pengajuan pertemuan Anda telah terkirim.').fadeIn();
                setTimeout(function() { window.location.href = "dashboard-mahasiswa.html"; }, 2000);
            });

            // Klik kartu jadwal
            $('#jadwal-container').on('click', '.jadwal-card:not([disabled])', function() {
                $('.jadwal-card').removeClass('active border-blue-500 shadow-lg');
                $(this).addClass('active border-blue-500 shadow-lg');
            });
        }
    }


    // =================================================
    // --- BAGIAN BARU: LOGIKA HALAMAN PROFIL ---
    // =================================================
    if (window.location.pathname.endsWith('profil.html')) {
        if(loggedInUser) {
            const userDetails = users[loggedInUser.id];
            $('#profile-name').text(userDetails.name);
            $('#profile-role').text(userDetails.role);
            $('#profile-id').text(loggedInUser.id);
            $('#profile-email').text(userDetails.email);

            if(userDetails.role === 'mahasiswa') {
                $('#profile-id-label').text('NIM');
                $('#profile-extra-label').text('Jurusan');
                $('#profile-extra-value').text(userDetails.jurusan);
            } else {
                $('#profile-id-label').text('NIDN');
                $('#profile-extra-label').text('Bidang Keahlian');
                $('#profile-extra-value').text(userDetails.bidangKeahlian);
            }

            // Demo button
            $('.bg-gray-600').on('click', function() {
                alert('Fitur ini akan tersedia pada versi aplikasi selanjutnya!');
            });
        }
    }


    // =================================================
    // --- PENYESUAIAN HALAMAN DOSEN ---
    // =================================================
    if (loggedInUser && loggedInUser.role === 'dosen') {
        const storageKey = `permintaan_${loggedInUser.id}`;

        // --- Logika halaman daftar permintaan dosen ---
        if (window.location.pathname.endsWith('permintaan-dosen.html')) {
            const tableBody = $('#permintaan-table-body');
            
            function renderPermintaanTable() {
                let permintaan = JSON.parse(localStorage.getItem(storageKey)) || [];
                tableBody.empty();
                $('#total-permintaan').text(`Total: ${permintaan.length} Permintaan`);

                if (permintaan.length === 0) {
                    tableBody.append(`<tr><td colspan="4" class="text-center text-gray-500 py-4">Tidak ada permintaan.</td></tr>`);
                    return;
                }

                permintaan.forEach(item => {
                    let statusOrAction;
                    if (item.status === 'Menunggu') {
                        statusOrAction = `<div class="action-buttons space-x-2">
                            <button data-id="${item.id}" class="btn-aksi btn-setujui bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-xs">Setujui</button>
                            <button data-id="${item.id}" class="btn-aksi btn-tolak bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs">Tolak</button>
                        </div>`;
                    } // ... (kode lainnya tetap sama)
                    else if (item.status === 'Disetujui') {
                         statusOrAction = `<button data-id="${item.id}" class="btn-aksi btn-selesaikan bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-xs">Selesaikan</button>`;
                    } else {
                         statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">${item.status}</span>`;
                    }
                    
                    const rowHtml = `<tr><td class="px-6 py-4">${item.mahasiswa} (${item.nim})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4">${item.jadwal}</td><td class="px-6 py-4 text-center">${statusOrAction}</td></tr>`;
                    tableBody.append(rowHtml);
                });
            }

            renderPermintaanTable();

            tableBody.on('click', '.btn-aksi', function() {
                const itemId = $(this).data('id');
                const action = $(this).hasClass('btn-setujui') ? 'Disetujui' : $(this).hasClass('btn-tolak') ? 'Ditolak' : 'Selesai';

                // 1. Update data permintaan di sisi dosen
                let permintaan = JSON.parse(localStorage.getItem(storageKey));
                const itemIndex = permintaan.findIndex(p => p.id === itemId);
                permintaan[itemIndex].status = action;
                localStorage.setItem(storageKey, JSON.stringify(permintaan));

                // 2. Update data pertemuan di sisi mahasiswa & kirim notifikasi
                const nimMahasiswa = permintaan[itemIndex].nim;
                const pertemuanMhsKey = `pertemuan_${nimMahasiswa}`;
                let pertemuanMhs = JSON.parse(localStorage.getItem(pertemuanMhsKey)) || [];
                const pertemuanIndex = pertemuanMhs.findIndex(p => p.id === itemId);
                if (pertemuanIndex > -1) {
                    pertemuanMhs[pertemuanIndex].status = action;
                    pertemuanMhs[pertemuanIndex].notifikasi = 'belum_dilihat'; // Set notifikasi
                    localStorage.setItem(pertemuanMhsKey, JSON.stringify(pertemuanMhs));
                }
                
                renderPermintaanTable(); // Render ulang tabel
            });
        }
    }

    // Sisa kode dari file asli (dashboard, riwayat, dll.) akan berfungsi
    // dengan perubahan dari sessionStorage ke localStorage.
    // Pastikan untuk menyesuaikan bagian render tabel agar mengambil data dari localStorage.
    // Contoh untuk dashboard dosen:
    if (window.location.pathname.endsWith('dashboard-dosen.html') && loggedInUser && loggedInUser.role === 'dosen') {
        const permintaan = JSON.parse(localStorage.getItem(`permintaan_${loggedInUser.id}`)) || [];
        const permintaanBaruCount = permintaan.filter(p => p.status === 'Menunggu').length;
        const jadwalDisetujuiCount = permintaan.filter(p => p.status === 'Disetujui').length;
        const pertemuanSelesaiCount = permintaan.filter(p => p.status === 'Selesai' || p.status === 'Ditolak' || p.status === 'Feedback Diberikan').length;

        $('#permintaan-baru-count').text(permintaanBaruCount);
        $('#total-disetujui-count').text(jadwalDisetujuiCount);
        $('#pertemuan-selesai-count').text(pertemuanSelesaiCount);
    }

    // (Tambahkan logika render untuk halaman-halaman lain jika diperlukan,
    // mengikuti pola penggunaan localStorage di atas)

});