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

// --- DATA AWAL PERTEMUAN UNTUK SETIAP MAHASISWA ---
const initialMahasiswaData = {
    '09030582226053': [
        { dosen: 'Dr. Ir. Ahmad Heryanto, M.T.', keperluan: 'Bimbingan Tugas Akhir - Bab 3', jadwal: '21 Juli 2025, 10:00', status: 'Disetujui' },
        { dosen: 'Prof. Siti Nurmaini, M.T.', keperluan: 'Konsultasi Kerja Praktik', jadwal: '22 Juli 2025, 09:30', status: 'Menunggu' },
        { dosen: 'Dr. Retno Lestari, M.Kom.', keperluan: 'Revisi Jurnal Internasional', jadwal: '21 Juli 2025, 13:00', status: 'Menunggu' },
        { dosen: 'Dr. Ir. Ahmad Heryanto, M.T.', keperluan: 'Bimbingan Tugas Akhir - Bab 2', jadwal: '14 Juli 2025, 10:00', status: 'Selesai', feedback: "Terima kasih banyak, Pak. Sesi bimbingan ini sangat membuka wawasan saya." }
    ],
    '0903058212608': [
        { dosen: 'Iman Saladin, S.Kom., M.M.S.I.', keperluan: 'Diskusi Proyek Kelas RPL', jadwal: '25 Juli 2025, 09:30', status: 'Disetujui' },
        { dosen: 'Dr. Ir. Ahmad Heryanto, M.T.', keperluan: 'Minta Tanda Tangan KRS', jadwal: '23 Juli 2025, 14:00', status: 'Ditolak', alasanTolak: 'Untuk tanda tangan KRS silakan temui saya langsung di ruangan pada jam kerja, tidak perlu melalui sistem.' },
        { dosen: 'Prof. Dr. Ir. Rina Marlina, M.Sc.', keperluan: 'Diskusi topik penelitian', jadwal: '21 Juli 2025, 11:00', status: 'Selesai' }
    ],
    '09030582126015': [
        { dosen: 'Prof. Siti Nurmaini, M.T.', keperluan: 'Bimbingan Akademik (PA)', jadwal: '24 Juli 2025, 13:00', status: 'Disetujui' },
        { dosen: 'Prof. Siti Nurmaini, M.T.', keperluan: 'Konsultasi Proposal', jadwal: '15 Juli 2025, 09:00', status: 'Selesai', feedback: "Sangat membantu, Bu. Terima kasih telah meluangkan waktu." }
    ],
    '09030582327001': [ // Andi Wijaya
        { dosen: 'Budi Santoso, S.T., M.Eng.', keperluan: 'Bimbingan Proyek IoT', jadwal: '22 Juli 2025, 14:00', status: 'Disetujui' },
        { dosen: 'Dr. Retno Lestari, M.Kom.', keperluan: 'Konsultasi Machine Learning', jadwal: '16 Juli 2025, 09:00', status: 'Selesai', feedback: "Penjelasan sangat detail dan mudah dipahami." }
    ],
    '09030582327002': [ // Citra Lestari
        { dosen: 'Prof. Dr. Ir. Rina Marlina, M.Sc.', keperluan: 'Validasi Kuesioner Penelitian', jadwal: '23 Juli 2025, 11:00', status: 'Menunggu' },
        { dosen: 'Budi Santoso, S.T., M.Eng.', keperluan: 'Tanya soal UAS Jaringan Komputer', jadwal: '24 Juli 2025, 10:30', status: 'Ditolak', alasanTolak: 'Mohon maaf, pertanyaan seputar UAS hanya dilayani pada sesi kelas tambahan.' }
    ],
    '09030582327003': [ // Eko Nugroho
        { dosen: 'Prof. Siti Nurmaini, M.T.', keperluan: 'Diskusi Lomba Gemastik', jadwal: '22 Juli 2025, 09:30', status: 'Disetujui' },
        { dosen: 'Iman Saladin, S.Kom., M.M.S.I.', keperluan: 'Revisi Laporan Magang', jadwal: '18 Juli 2025, 10:00', status: 'Selesai', feedback: "Feedback sudah diberikan secara lisan." }
    ],
    '09030582327004': [ // Fitriani Indah
        { dosen: 'Dr. Ir. Ahmad Heryanto, M.T.', keperluan: 'Persiapan Seminar Proposal', jadwal: '23 Juli 2025, 14:30', status: 'Menunggu' }
    ]
};

// --- DATA AWAL PERMINTAAN UNTUK SETIAP DOSEN ---
const initialDosenData = {
    '0002085908': [ // Prof. Siti Nurmaini
        { mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Konsultasi Kerja Praktik', jadwal: 'Selasa, 22 Juli 2025, 09:30', status: 'Menunggu' },
        { mahasiswa: 'Eko Nugroho', nim: '09030582327003', keperluan: 'Diskusi Lomba Gemastik', jadwal: 'Selasa, 22 Juli 2025, 09:30', status: 'Disetujui' },
        { mahasiswa: 'Wahyu Hidayat', nim: '09030582126015', keperluan: 'Bimbingan Akademik (PA)', jadwal: 'Kamis, 24 Juli 2025, 13:00', status: 'Disetujui' },
        { mahasiswa: 'Wahyu Hidayat', nim: '09030582126015', keperluan: 'Konsultasi Proposal', jadwal: '15 Juli 2025, 09:00', status: 'Selesai', feedback: "Sangat membantu, Bu. Terima kasih telah meluangkan waktu." }
    ],
    '0022018703': [ // Dr. Ahmad Heryanto
        { mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Bimbingan Tugas Akhir - Bab 3', jadwal: 'Senin, 21 Juli 2025, 10:00', status: 'Disetujui' },
        { mahasiswa: 'Fitriani Indah', nim: '09030582327004', keperluan: 'Persiapan Seminar Proposal', jadwal: 'Rabu, 23 Juli 2025, 14:30', status: 'Menunggu' },
        { mahasiswa: 'Rahayu Prasiska', nim: '0903058212608', keperluan: 'Minta Tanda Tangan KRS', jadwal: 'Rabu, 23 Juli 2025, 14:00', status: 'Ditolak', alasanTolak: 'Untuk tanda tangan KRS silakan temui saya langsung di ruangan pada jam kerja, tidak perlu melalui sistem.' },
        { mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Bimbingan Tugas Akhir - Bab 2', jadwal: '14 Juli 2025, 10:00', status: 'Selesai', feedback: "Terima kasih banyak, Pak. Sesi bimbingan ini sangat membuka wawasan saya." }
    ],
    '0022108702': [ // Iman Saladin
        { mahasiswa: 'Rahayu Prasiska', nim: '0903058212608', keperluan: 'Diskusi Proyek Kelas RPL', jadwal: 'Jumat, 25 Juli 2025, 09:30', status: 'Disetujui' },
        { mahasiswa: 'Eko Nugroho', nim: '09030582327003', keperluan: 'Revisi Laporan Magang', jadwal: '18 Juli 2025, 10:00', status: 'Selesai', feedback: "Feedback sudah diberikan secara lisan." }
    ],
    '0011223301': [ // Dr. Retno Lestari
        { mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Revisi Jurnal Internasional', jadwal: 'Senin, 21 Juli 2025, 13:00', status: 'Menunggu' },
        { mahasiswa: 'Andi Wijaya', nim: '09030582327001', keperluan: 'Konsultasi Machine Learning', jadwal: '16 Juli 2025, 09:00', status: 'Selesai', feedback: "Penjelasan sangat detail dan mudah dipahami." }
    ],
    '0044556602': [ // Budi Santoso
        { mahasiswa: 'Andi Wijaya', nim: '09030582327001', keperluan: 'Bimbingan Proyek IoT', jadwal: 'Selasa, 22 Juli 2025, 14:00', status: 'Disetujui' },
        { mahasiswa: 'Citra Lestari', nim: '09030582327002', keperluan: 'Tanya soal UAS Jaringan Komputer', jadwal: 'Kamis, 24 Juli 2025, 10:30', status: 'Ditolak', alasanTolak: 'Mohon maaf, pertanyaan seputar UAS hanya dilayani pada sesi kelas tambahan.' }
    ],
    '0077889903': [ // Prof. Rina Marlina
        { mahasiswa: 'Citra Lestari', nim: '09030582327002', keperluan: 'Validasi Kuesioner Penelitian', jadwal: 'Rabu, 23 Juli 2025, 11:00', status: 'Menunggu' },
        { mahasiswa: 'Rahayu Prasiska', nim: '0903058212608', keperluan: 'Diskusi topik penelitian', jadwal: 'Senin, 21 Juli 2025, 11:00', status: 'Selesai' }
    ]
};


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
        // Tampilkan nama pengguna dan siapkan fungsi logout
        $('.user-name').text(loggedInUser.name);
        $('.logout-link').on('click', function(e) {
            e.preventDefault();
            localStorage.clear(); // Hapus semua data dari session storage
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
        const storageKey = `pertemuan_${loggedInUser.id}`;
        let pertemuanMahasiswa = JSON.parse(localStorage.getItem(storageKey));

        // Jika data pertemuan belum ada di session, ambil dari data awal
        if (!pertemuanMahasiswa) {
            pertemuanMahasiswa = initialMahasiswaData[loggedInUser.id] || [];
            localStorage.setItem(storageKey, JSON.stringify(pertemuanMahasiswa));
        }

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
                        statusOrAction = `<button data-index="${index}" class="btn-feedback bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-3 rounded text-xs">Beri Feedback</button>`;
                    } else if (item.status === 'Feedback Diberikan') {
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Feedback Diberikan</span>`;
                        rowClass = 'bg-purple-50';
                    } else { // Menunggu
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Menunggu</span>`;
                    }

                    const rowHtml = `<tr class="${rowClass}"><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${index + 1}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.dosen}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.keperluan}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.jadwal}</td><td class="px-6 py-4 whitespace-nowrap">${statusOrAction}</td></tr>`;
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

            riwayatTableBody.on('click', '.btn-feedback', function() {
                const index = $(this).data('index');
                $('#feedback-form').data('index', index);
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
    }

    // Event listener untuk form pengiriman feedback
    $('#feedback-form').on('submit', function(event) {
        event.preventDefault();
        const index = $(this).data('index');
        const feedbackText = $('#feedback-textarea').val();
        const storageKey = `pertemuan_${loggedInUser.id}`;
        let pertemuanMahasiswa = JSON.parse(localStorage.getItem(storageKey));

        if (feedbackText) {
            pertemuanMahasiswa[index].status = 'Feedback Diberikan';
            pertemuanMahasiswa[index].feedback = feedbackText;
            localStorage.setItem(storageKey, JSON.stringify(pertemuanMahasiswa));

            $('#give-feedback-modal').addClass('hidden');
            $(this)[0].reset();

            if (window.location.pathname.endsWith('riwayat-pertemuan-mahasiswa.html')) {
                renderMahasiswaTable($('#riwayat-table-body'), pertemuanMahasiswa);
            }
        }
    });

    $('.close-feedback-modal').on('click', function() {
        $('#give-feedback-modal').addClass('hidden');
        $('#feedback-form')[0].reset();
    });

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

        $('#form-pengajuan').on('submit', function(event) {
            event.preventDefault();
            const keperluan = $('#keperluan').val();
            const dosenNama = $('#pilihDosen option:selected').data('nama');
            const jadwalText = $('.jadwal-card.active').data('jadwal-text');
            if (!dosenNama || !jadwalText || !keperluan) {
                alert('Harap lengkapi semua data: pilih dosen, pilih jadwal, dan isi keperluan.');
                return;
            }
            const storageKey = `pertemuan_${loggedInUser.id}`;
            let pertemuanMahasiswa = JSON.parse(localStorage.getItem(storageKey)) || [];
            pertemuanMahasiswa.push({ dosen: dosenNama, keperluan: keperluan, jadwal: jadwalText, status: 'Menunggu' });
            localStorage.setItem(storageKey, JSON.stringify(pertemuanMahasiswa));
            $('#success-alert').text('Berhasil! Pengajuan pertemuan Anda telah terkirim.').fadeIn();
            setTimeout(function() { window.location.href = "dashboard-mahasiswa.html"; }, 2000);
        });
    }

    // --- LOGIKA UNTUK SEMUA HALAMAN DOSEN ---
    if (loggedInUser && loggedInUser.role === 'dosen') {
        const storageKey = `permintaan_${loggedInUser.id}`;
        let permintaan = JSON.parse(localStorage.getItem(storageKey));

        if (!permintaan) {
            permintaan = initialDosenData[loggedInUser.id] || [];
            localStorage.setItem(storageKey, JSON.stringify(permintaan));
        }

        if (window.location.pathname.endsWith('dashboard-dosen.html')) {
            const permintaanBaruCount = permintaan.filter(p => p.status === 'Menunggu').length;
            const jadwalDisetujuiCount = permintaan.filter(p => p.status === 'Disetujui').length;
            const pertemuanSelesaiCount = permintaan.filter(p => p.status === 'Selesai' || p.status === 'Feedback Diberikan').length;

            $('#permintaan-baru-count').text(permintaanBaruCount);
            $('#total-disetujui-count').text(jadwalDisetujuiCount);
            $('#pertemuan-selesai-count').text(pertemuanSelesaiCount);

            const tableBody = $('#permintaan-terbaru-body');
            tableBody.empty();
            const permintaanMenunggu = permintaan.filter(p => p.status === 'Menunggu').slice(0, 5);
            if (permintaanMenunggu.length > 0) {
                permintaanMenunggu.forEach(item => {
                    const rowHtml = `<tr><td class="px-6 py-4">${item.mahasiswa} (${item.nim})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4 text-center"><a href="permintaan-dosen.html" class="text-blue-600 hover:text-blue-900 font-medium">Lihat Detail</a></td></tr>`;
                    tableBody.append(rowHtml);
                });
            } else {
                tableBody.append(`<tr><td colspan="3" class="text-center text-gray-500 py-4">Tidak ada permintaan baru.</td></tr>`);
            }
        }

        if (window.location.pathname.endsWith('permintaan-dosen.html')) {
            const tableBody = $('#permintaan-table-body');
            const totalPermintaanSpan = $('#total-permintaan');

            function renderTable() {
                tableBody.empty();
                const permintaanMenunggu = permintaan.filter(p => p.status === 'Menunggu');
                totalPermintaanSpan.text(`Total: ${permintaanMenunggu.length} Permintaan Menunggu`);

                permintaan.forEach((item, index) => {
                    let statusOrAction;
                    let rowClass = '';

                    if (item.status === 'Disetujui') {
                        statusOrAction = `<div class="action-buttons"><button data-index="${index}" class="btn-selesaikan bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-xs">Selesaikan</button></div>`;
                        rowClass = 'bg-green-50';
                    } else if (item.status === 'Ditolak') {
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Ditolak</span>`;
                        rowClass = 'bg-red-50';
                    } else if (item.status === 'Selesai' || item.status === 'Feedback Diberikan') {
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Selesai</span>`;
                        rowClass = 'bg-gray-100';
                    } else { // Menunggu
                        statusOrAction = `<div class="action-buttons space-x-2"><button data-index="${index}" class="btn-setujui bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-xs">Setujui</button><button data-index="${index}" class="btn-tolak bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs">Tolak</button></div>`;
                    }

                    const rowHtml = `<tr class="${rowClass}"><td class="px-6 py-4">${item.mahasiswa} (${item.nim})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4">${item.jadwal}</td><td class="px-6 py-4 text-center">${statusOrAction}</td></tr>`;
                    tableBody.append(rowHtml);
                });
            }

            renderTable();

            tableBody.on('click', '.btn-setujui, .btn-selesaikan', function() {
                const index = $(this).data('index');
                const nimMahasiswa = permintaan[index].nim;
                let message = '';

                if ($(this).hasClass('btn-setujui')) {
                    permintaan[index].status = 'Disetujui';
                    message = 'Satu permintaan pertemuan Anda telah disetujui.';
                } else if ($(this).hasClass('btn-selesaikan')) {
                    permintaan[index].status = 'Selesai';
                    message = 'Satu pertemuan Anda telah ditandai selesai oleh dosen.';
                }

                if (message) {
                    localStorage.setItem(`notification_for_${nimMahasiswa}`, message);
                }
                localStorage.setItem(storageKey, JSON.stringify(permintaan));
                renderTable();
            });

            tableBody.on('click', '.btn-tolak', function() {
                const index = $(this).data('index');
                $('#form-alasan-tolak').data('index', index);
                $('#tolak-alasan-modal').removeClass('hidden');
            });

            $('#form-alasan-tolak').on('submit', function(e) {
                e.preventDefault();
                const index = $(this).data('index');
                const alasan = $('#alasan-tolak-textarea').val();
                const nimMahasiswa = permintaan[index].nim;

                permintaan[index].status = 'Ditolak';
                permintaan[index].alasanTolak = alasan;

                const message = 'Satu permintaan pertemuan Anda telah ditolak.';
                localStorage.setItem(`notification_for_${nimMahasiswa}`, message);
                
                localStorage.setItem(storageKey, JSON.stringify(permintaan));
                
                $('#tolak-alasan-modal').addClass('hidden');
                $(this)[0].reset();
                
                renderTable();
            });

            $('.close-tolak-modal').on('click', function() {
                $('#tolak-alasan-modal').addClass('hidden');
                $('#form-alasan-tolak')[0].reset();
            });
        }

        if (window.location.pathname.endsWith('pertemuan-selesai-dosen.html')) {
            const tableBody = $('#selesai-table-body');
            tableBody.empty();
            const dataSelesai = permintaan.filter(p => p.status === 'Selesai' || p.status === 'Feedback Diberikan');
            if (dataSelesai.length > 0) {
                dataSelesai.forEach(item => {
                    let feedbackCell;
                    if (item.feedback) {
                        const safeFeedback = item.feedback.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                        feedbackCell = `<button data-feedback="${safeFeedback}" class="btn-lihat-feedback bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-3 rounded text-xs">Lihat Feedback</button>`;
                    } else {
                        feedbackCell = `<span class="text-gray-400 text-xs italic">Belum ada</span>`;
                    }
                    const rowHtml = `<tr><td class="px-6 py-4">${item.mahasiswa} (${item.nim})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4">${item.jadwal}</td><td class="px-6 py-4 text-center">${feedbackCell}</td></tr>`;
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

    $('.close-modal').on('click', function() {
        $('#feedback-modal').addClass('hidden');
    });

    if (window.location.pathname.endsWith('profil-mahasiswa.html') || window.location.pathname.endsWith('profil-dosen.html')) {
        if (loggedInUser) {
            $('#profile-name').text(loggedInUser.name);
            $('#profile-id').text(loggedInUser.id);
            $('#profile-role').text(loggedInUser.role);
        }
    }
});
