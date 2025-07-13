// File: assets/js/main.js
// Deskripsi: Berisi semua data dan logika utama aplikasi

// =================================================
// DATA PENGGUNA (DATABASE SIMULASI)
// =================================================
const users = {
    // Data Dosen
    '0002085908': { name: 'Prof. Siti Nurmaini, M.T', password: '123456', role: 'dosen' },
    '0022018703': { name: 'Dr. Ir. Ahmad Heryanto, M.T', password: '123456', role: 'dosen' },
    '0022108702': { name: 'Iman Saladin B.Azhar, S.Kom., M.M.S.I', password: '123456', role: 'dosen' },
    // Data Mahasiswa
    '09030582226053': { name: 'Wahyu Pramana', password: '123456', role: 'mahasiswa' },
    '0903058212608': { name: 'Rahayu Prasiska', password: '123456', role: 'mahasiswa' },
    '09030582126015': { name: 'Wahyu Hidayat', password: '123456', role: 'mahasiswa' }
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
    ]
};

// --- DATA AWAL PERTEMUAN UNTUK SETIAP MAHASISWA ---
const initialMahasiswaData = {
    '09030582226053': [
        { dosen: 'Dr. Ir. Ahmad Heryanto, M.T', keperluan: 'Bimbingan Tugas Akhir - Bab 3', jadwal: '21 Juli 2025, 10:00', status: 'Disetujui' },
        { dosen: 'Prof. Siti Nurmaini, M.T', keperluan: 'Konsultasi Kerja Praktik', jadwal: '22 Juli 2025, 09:30', status: 'Menunggu' },
        { dosen: 'Dr. Ir. Ahmad Heryanto, M.T', keperluan: 'Bimbingan Tugas Akhir - Bab 2', jadwal: '14 Juli 2025, 10:00', status: 'Selesai', feedback: "Terima kasih banyak, Pak. Sesi bimbingan ini sangat membuka wawasan saya. Penjelasan Bapak mengenai metodologi penelitian kuantitatif sangat jelas dan terstruktur, terutama pada bagian analisis regresi yang sebelumnya saya masih bingung. Saya jadi lebih paham bagaimana cara mengolah data dan menginterpretasikan hasilnya dengan benar. Bapak juga memberikan contoh-contoh kasus yang relevan sehingga saya bisa lebih mudah membayangkannya. Selain itu, arahan Bapak mengenai sumber-sumber literatur tambahan sangat membantu untuk memperkaya landasan teori saya. Mungkin untuk ke depannya, jika diperkenankan, saya ingin meminta sedikit lebih banyak contoh penerapan pada software statistik. Namun secara keseluruhan, sesi ini benar-benar melampaui ekspektasi saya. Terima kasih atas waktu dan kesabaran Bapak." }
    ],
    '0903058212608': [
        { dosen: 'Iman Saladin B.Azhar, S.Kom., M.M.S.I', keperluan: 'Diskusi Proyek Kelas RPL', jadwal: '25 Juli 2025, 09:30', status: 'Disetujui' },
        { dosen: 'Dr. Ir. Ahmad Heryanto, M.T', keperluan: 'Minta Tanda Tangan KRS', jadwal: '23 Juli 2025, 14:00', status: 'Ditolak' }
    ],
    '09030582126015': [
        { dosen: 'Prof. Siti Nurmaini, M.T', keperluan: 'Bimbingan Akademik (PA)', jadwal: '24 Juli 2025, 13:00', status: 'Disetujui' },
        { dosen: 'Prof. Siti Nurmaini, M.T', keperluan: 'Konsultasi Proposal', jadwal: '15 Juli 2025, 09:00', status: 'Selesai', feedback: "Sangat membantu, Bu. Terima kasih telah meluangkan waktu untuk membahas proposal saya. Saya mendapatkan banyak masukan berharga mengenai kerangka pemikiran dan metode penelitian yang akan saya gunakan. Penjelasan Ibu membuat saya lebih percaya diri untuk melanjutkan ke tahap berikutnya." }
    ]
};

// --- DATA AWAL PERMINTAAN UNTUK SETIAP DOSEN ---
const initialDosenData = {
    '0002085908': [
        { mahasiswa: 'Wahyu Hidayat', nim: '09030582126015', keperluan: 'Revisi Proposal Skripsi', jadwal: 'Selasa, 22 Juli 2025, 09:00', status: 'Menunggu' },
        { mahasiswa: 'Rahayu Prasiska', nim: '0903058212608', keperluan: 'Konsultasi Mata Kuliah Pilihan', jadwal: 'Kamis, 24 Juli 2025, 13:00', status: 'Menunggu' },
        { mahasiswa: 'Wahyu Hidayat', nim: '09030582126015', keperluan: 'Konsultasi Proposal', jadwal: '15 Juli 2025, 09:00', status: 'Selesai', feedback: "Sangat membantu, Bu. Terima kasih telah meluangkan waktu untuk membahas proposal saya. Saya mendapatkan banyak masukan berharga mengenai kerangka pemikiran dan metode penelitian yang akan saya gunakan. Penjelasan Ibu membuat saya lebih percaya diri untuk melanjutkan ke tahap berikutnya." },
        { mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Konsultasi Kerja Praktik', jadwal: '22 Juli 2025, 09:30', status: 'Disetujui' }
    ],
    '0022018703': [
        { mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Bimbingan Tugas Akhir - Bab 3', jadwal: 'Senin, 21 Juli 2025, 10:00', status: 'Disetujui' },
        { mahasiswa: 'Rahayu Prasiska', nim: '0903058212608', keperluan: 'Minta Tanda Tangan KRS', jadwal: 'Rabu, 23 Juli 2025, 14:00', status: 'Ditolak' },
        { mahasiswa: 'Wahyu Hidayat', nim: '09030582126015', keperluan: 'Diskusi hasil KKN', jadwal: 'Rabu, 23 Juli 2025, 14:30', status: 'Menunggu' },
        { mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Bimbingan Tugas Akhir - Bab 2', jadwal: '14 Juli 2025, 10:00', status: 'Selesai', feedback: "Terima kasih banyak, Pak. Sesi bimbingan ini sangat membuka wawasan saya. Penjelasan Bapak mengenai metodologi penelitian kuantitatif sangat jelas dan terstruktur, terutama pada bagian analisis regresi yang sebelumnya saya masih bingung. Saya jadi lebih paham bagaimana cara mengolah data dan menginterpretasikan hasilnya dengan benar. Bapak juga memberikan contoh-contoh kasus yang relevan sehingga saya bisa lebih mudah membayangkannya. Selain itu, arahan Bapak mengenai sumber-sumber literatur tambahan sangat membantu untuk memperkaya landasan teori saya. Mungkin untuk ke depannya, jika diperkenankan, saya ingin meminta sedikit lebih banyak contoh penerapan pada software statistik. Namun secara keseluruhan, sesi ini benar-benar melampaui ekspektasi saya. Terima kasih atas waktu dan kesabaran Bapak." }
    ],
    '0022108702': [
        { mahasiswa: 'Rahayu Prasiska', nim: '0903058212608', keperluan: 'Diskusi Proyek Kelas RPL', jadwal: 'Jumat, 25 Juli 2025, 09:30', status: 'Disetujui' },
        { mahasiswa: 'Wahyu Pramana', nim: '09030582226053', keperluan: 'Validasi Laporan KP', jadwal: 'Jumat, 25 Juli 2025, 10:00', status: 'Menunggu' }
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
            sessionStorage.setItem('loggedInUser', JSON.stringify({ id: username, name: user.name, role: user.role }));
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
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Tampilkan nama pengguna dan siapkan fungsi logout
        $('.user-name').text(loggedInUser.name);
        $('.logout-link').on('click', function(e) {
            e.preventDefault();
            sessionStorage.clear(); // Hapus semua data dari session storage
            window.location.href = 'index.html';
        });
    } else {
        // Jika tidak ada pengguna yang login, paksa kembali ke halaman login
        if (!window.location.pathname.endsWith('index.html')) {
            window.location.href = 'index.html';
        }
    }

    // --- LOGIKA HALAMAN MAHASISWA ---
    if (loggedInUser && loggedInUser.role === 'mahasiswa') {
        const storageKey = `pertemuan_${loggedInUser.id}`;
        let pertemuanMahasiswa = JSON.parse(sessionStorage.getItem(storageKey));

        // Jika data pertemuan belum ada di session, ambil dari data awal
        if (!pertemuanMahasiswa) {
            pertemuanMahasiswa = initialMahasiswaData[loggedInUser.id] || [];
            sessionStorage.setItem(storageKey, JSON.stringify(pertemuanMahasiswa));
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
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Ditolak</span>`;
                    } else if (item.status === 'Selesai') {
                        // Tombol untuk memberi feedback
                        statusOrAction = `<button data-index="${index}" class="btn-feedback bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-3 rounded text-xs">Beri Feedback</button>`;
                    } else if (item.status === 'Feedback Diberikan') {
                        statusOrAction = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Feedback Diberikan</span>`;
                        rowClass = 'bg-purple-50'; // Beri warna latar berbeda
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
        }

        // Logika untuk halaman riwayat pertemuan mahasiswa
        if (window.location.pathname.endsWith('riwayat-pertemuan-mahasiswa.html')) {
            const riwayatTableBody = $('#riwayat-table-body');
            renderMahasiswaTable(riwayatTableBody, pertemuanMahasiswa);

            // Event listener untuk tombol 'Beri Feedback'
            riwayatTableBody.on('click', '.btn-feedback', function() {
                const index = $(this).data('index');
                $('#feedback-form').data('index', index); // Simpan index di form
                $('#give-feedback-modal').removeClass('hidden'); // Tampilkan modal
            });
        }
    }

    // Event listener untuk form pengiriman feedback
    $('#feedback-form').on('submit', function(event) {
        event.preventDefault();
        const index = $(this).data('index');
        const feedbackText = $('#feedback-textarea').val();
        const storageKey = `pertemuan_${loggedInUser.id}`;
        let pertemuanMahasiswa = JSON.parse(sessionStorage.getItem(storageKey));

        if (feedbackText) {
            // Update status dan tambahkan feedback
            pertemuanMahasiswa[index].status = 'Feedback Diberikan';
            pertemuanMahasiswa[index].feedback = feedbackText;
            sessionStorage.setItem(storageKey, JSON.stringify(pertemuanMahasiswa));

            $('#give-feedback-modal').addClass('hidden'); // Sembunyikan modal
            $(this)[0].reset(); // Reset form

            // Render ulang tabel riwayat jika di halaman riwayat
            if (window.location.pathname.endsWith('riwayat-pertemuan-mahasiswa.html')) {
                renderMahasiswaTable($('#riwayat-table-body'), pertemuanMahasiswa);
            }
        }
    });

    // Event listener untuk tombol close pada modal feedback
    $('.close-feedback-modal').on('click', function() {
        $('#give-feedback-modal').addClass('hidden');
        $('#feedback-form')[0].reset();
    });

    // --- LOGIKA HALAMAN AJUKAN PERTEMUAN ---
    if (window.location.pathname.endsWith('jadwal-mahasiswa.html')) {
        const dosenSelect = $('#pilihDosen');
        const jadwalContainer = $('#jadwal-container');

        // Isi dropdown dosen
        for (const nidn in users) {
            if (users[nidn].role === 'dosen') {
                dosenSelect.append(`<option value="${nidn}" data-nama="${users[nidn].name}">${users[nidn].name}</option>`);
            }
        }

        // Tampilkan jadwal saat dosen dipilih
        dosenSelect.on('change', function() {
            const selectedNidn = $(this).val();
            jadwalContainer.empty();
            if (selectedNidn && jadwalDosen[selectedNidn]) {
                jadwalDosen[selectedNidn].forEach(slot => {
                    const cardHtml = `<div class="w-full md:w-1/2 lg:w-1/3 p-2"><div class="jadwal-card bg-white rounded-lg border border-gray-200 p-4 text-center cursor-pointer hover:shadow-lg hover:border-blue-500 transition-all" data-jadwal-text="${slot.hari}, ${slot.tanggal}, ${slot.jam}"><h5 class="font-bold text-lg text-gray-800">${slot.hari}</h5><p class="text-gray-500 text-sm">${slot.tanggal}</p><p class="font-semibold text-blue-600 mt-2">${slot.jam}</p></div></div>`;
                    jadwalContainer.append(cardHtml);
                });
            } else {
                jadwalContainer.html('<p class="text-gray-500 col-12">Pilih dosen untuk melihat jadwal yang tersedia.</p>');
            }
        });

        // Event listener untuk pengajuan form
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
            let pertemuanMahasiswa = JSON.parse(sessionStorage.getItem(storageKey)) || [];
            pertemuanMahasiswa.push({ dosen: dosenNama, keperluan: keperluan, jadwal: jadwalText, status: 'Menunggu' });
            sessionStorage.setItem(storageKey, JSON.stringify(pertemuanMahasiswa));
            $('#success-alert').text('Berhasil! Pengajuan pertemuan Anda telah terkirim.').fadeIn();
            setTimeout(function() { window.location.href = "dashboard-mahasiswa.html"; }, 2000);
        });
    }

    // --- LOGIKA UNTUK SEMUA HALAMAN DOSEN ---
    if (loggedInUser && loggedInUser.role === 'dosen') {
        const storageKey = `permintaan_${loggedInUser.id}`;
        let permintaan = JSON.parse(sessionStorage.getItem(storageKey));

        // Jika data permintaan belum ada, ambil dari data awal
        if (!permintaan) {
            permintaan = initialDosenData[loggedInUser.id] || [];
            sessionStorage.setItem(storageKey, JSON.stringify(permintaan));
        }

        // Logika untuk dashboard dosen
        if (window.location.pathname.endsWith('dashboard-dosen.html')) {
            const permintaanBaruCount = permintaan.filter(p => p.status === 'Menunggu').length;
            const jadwalDisetujuiCount = permintaan.filter(p => p.status === 'Disetujui').length;
            const pertemuanSelesaiCount = permintaan.filter(p => p.status === 'Selesai' || p.status === 'Feedback Diberikan').length;

            $('#permintaan-baru-count').text(permintaanBaruCount);
            $('#total-disetujui-count').text(jadwalDisetujuiCount);
            $('#pertemuan-selesai-count').text(pertemuanSelesaiCount);

            const tableBody = $('#permintaan-terbaru-body');
            tableBody.empty();
            const permintaanMenunggu = permintaan.filter(p => p.status === 'Menunggu').slice(0, 3); // Ambil 3 terbaru
            if (permintaanMenunggu.length > 0) {
                permintaanMenunggu.forEach(item => {
                    const rowHtml = `<tr><td class="px-6 py-4">${item.mahasiswa} (${item.nim})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4 text-center"><a href="permintaan-dosen.html" class="text-blue-600 hover:text-blue-900 font-medium">Lihat Detail</a></td></tr>`;
                    tableBody.append(rowHtml);
                });
            } else {
                tableBody.append(`<tr><td colspan="3" class="text-center text-gray-500 py-4">Tidak ada permintaan baru.</td></tr>`);
            }
        }

        // Logika untuk halaman daftar permintaan dosen
        if (window.location.pathname.endsWith('permintaan-dosen.html')) {
            const tableBody = $('#permintaan-table-body');
            const totalPermintaanSpan = $('#total-permintaan');

            function renderTable() {
                tableBody.empty();
                totalPermintaanSpan.text(`Total: ${permintaan.length} Permintaan`);

                permintaan.forEach((item, index) => {
                    let statusOrAction;
                    let rowClass = '';

                    // Tentukan tombol aksi berdasarkan status
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

            // Event listener untuk tombol aksi (Setujui, Tolak, Selesaikan)
            tableBody.on('click', '.btn-setujui, .btn-tolak, .btn-selesaikan', function() {
                const index = $(this).data('index');
                if ($(this).hasClass('btn-setujui')) {
                    permintaan[index].status = 'Disetujui';
                } else if ($(this).hasClass('btn-tolak')) {
                    permintaan[index].status = 'Ditolak';
                } else if ($(this).hasClass('btn-selesaikan')) {
                    permintaan[index].status = 'Selesai';
                }
                sessionStorage.setItem(storageKey, JSON.stringify(permintaan));
                renderTable(); // Render ulang tabel setelah aksi
            });
        }

        // Logika untuk halaman pertemuan selesai (dosen)
        if (window.location.pathname.endsWith('pertemuan-selesai-dosen.html')) {
            const tableBody = $('#selesai-table-body');
            tableBody.empty();
            const dataSelesai = permintaan.filter(p => p.status === 'Selesai' || p.status === 'Feedback Diberikan');
            if (dataSelesai.length > 0) {
                dataSelesai.forEach(item => {
                    let feedbackCell;
                    if (item.feedback) {
                        // Sanitasi feedback untuk mencegah masalah dengan tanda kutip
                        const safeFeedback = item.feedback.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                        feedbackCell = `<button data-feedback="${safeFeedback}" class="btn-lihat-feedback bg-purple-500 hover:bg-purple-600 text-white font-bold py-1 px-3 rounded text-xs">Lihat Feedback</button>`;
                    } else {
                        feedbackCell = `<span class="text-gray-400 text-xs italic">Belum ada</span>`;
                    }
                    const rowHtml = `<tr><td class="px-6 py-4">${item.mahasiswa} (${item.nim})</td><td class="px-6 py-4">${item.keperluan}</td><td class="px-6 py-4">${item.jadwal}</td><td class="px-6 py-4 text-center">${feedbackCell}</td></tr>`;
                    tableBody.append(rowHtml);
                });

                // Event listener untuk tombol 'Lihat Feedback'
                $('.btn-lihat-feedback').on('click', function() {
                    const feedbackText = $(this).data('feedback');
                    $('#feedback-content').text(feedbackText); // Tampilkan teks feedback di modal
                    $('#feedback-modal').removeClass('hidden'); // Tampilkan modal
                });

            } else {
                tableBody.append(`<tr><td colspan="4" class="text-center text-gray-500 py-4">Belum ada pertemuan yang selesai.</td></tr>`);
            }
        }
    }

    // Event listener untuk tombol close pada modal lihat feedback
    $('.close-modal').on('click', function() {
        $('#feedback-modal').addClass('hidden');
    });
});
