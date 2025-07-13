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

// Data Jadwal Ketersediaan Masing-masing Dosen
const jadwalDosen = {
    '0002085908': [ // Jadwal Prof. Siti Nurmaini
        { hari: 'Selasa', tanggal: '22 Juli 2025', jam: '09:00 - 09:30' },
        { hari: 'Selasa', tanggal: '22 Juli 2025', jam: '09:30 - 10:00' },
        { hari: 'Kamis', tanggal: '24 Juli 2025', jam: '13:00 - 13:30' }
    ],
    '0022018703': [ // Jadwal Dr. Ir. Ahmad Heryanto
        { hari: 'Senin', tanggal: '21 Juli 2025', jam: '10:00 - 10:30' },
        { hari: 'Rabu', tanggal: '23 Juli 2025', jam: '14:00 - 14:30' },
        { hari: 'Rabu', tanggal: '23 Juli 2025', jam: '14:30 - 15:00' }
    ],
    '0022108702': [ // Jadwal Iman Saladin
        { hari: 'Jumat', tanggal: '25 Juli 2025', jam: '09:30 - 10:00' },
        { hari: 'Jumat', tanggal: '25 Juli 2025', jam: '10:00 - 10:30' }
    ]
};


// =================================================
// LOGIKA APLIKASI
// =================================================
$(document).ready(function() {

    // --- LOGIKA LOGIN (di index.html) ---
    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        const username = $('#inputUsername').val();
        const password = $('#inputPassword').val();
        const user = users[username];

        if (user && user.password === password) {
            // Simpan informasi user di sessionStorage
            sessionStorage.setItem('loggedInUser', JSON.stringify({
                id: username,
                name: user.name,
                role: user.role
            }));

            // Arahkan ke dashboard yang sesuai
            if (user.role === 'dosen') {
                window.location.href = 'dashboard-dosen.html';
            } else {
                window.location.href = 'dashboard-mahasiswa.html';
            }
        } else {
            // Tampilkan pesan error
            $('#login-alert').text('NIM/NIDN atau Password salah!').fadeIn();
        }
    });


    // --- LOGIKA UNTUK SEMUA HALAMAN SETELAH LOGIN ---
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Tampilkan nama user yang login
        $('.user-name').text(loggedInUser.name);

        // Logika Logout
        $('.logout-link').on('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }


    // --- LOGIKA KHUSUS HALAMAN JADWAL MAHASISWA ---
    if (window.location.pathname.endsWith('jadwal-mahasiswa.html')) {
        const dosenSelect = $('#pilihDosen');
        const jadwalContainer = $('#jadwal-container');

        // Isi dropdown dosen
        for (const nidn in users) {
            if (users[nidn].role === 'dosen') {
                dosenSelect.append(`<option value="${nidn}">${users[nidn].name}</option>`);
            }
        }

        // Tampilkan jadwal ketika dosen dipilih
        dosenSelect.on('change', function() {
            const selectedNidn = $(this).val();
            jadwalContainer.empty(); // Kosongkan jadwal sebelumnya

            if (selectedNidn && jadwalDosen[selectedNidn]) {
                const jadwal = jadwalDosen[selectedNidn];
                jadwal.forEach(slot => {
                    const cardHtml = `
                        <div class="col-md-4 mb-3">
                            <div class="card text-center jadwal-card" data-jadwal="${slot.hari}, ${slot.tanggal} - ${slot.jam}">
                                <div class="card-body">
                                    <h5 class="card-title">${slot.hari}</h5>
                                    <p class="card-text">${slot.tanggal}</p>
                                    <p class="card-text font-weight-bold">${slot.jam}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    jadwalContainer.append(cardHtml);
                });
            } else {
                jadwalContainer.html('<p class="text-muted col-12">Pilih dosen untuk melihat jadwal yang tersedia.</p>');
            }
        });
    }

});
