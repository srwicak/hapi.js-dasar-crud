/*
 * Dalam contoh kali ini kita menggunakan Hapi.js untuk framework
 * Contoh ini mencakup dasar dari kegiatan CRUD (Buat, Baca, Ubah, dan Hapus)
 * terinspirasi dari artikel https://simpleprogrammer.com/building-highly-scalable-apis/
 * dan telah disesuaikan dengan versi Hapi.js versi 17.8 dan mongoose 5.X
 * Ini adalah file utama dari aplikasi contoh
 */
'use strict';

// memanggil framework hapijs
const Hapi = require('hapi');

// memanggil berkas yang akan menangani routing dari program
const kontakRoutes = require('./routes/kontak.routes');

// memanggil library ODM (Object Data Manager), ini akan menangani untuk transaksi dengan database
const mongoose = require('mongoose');

// menyatakan lokasi database
const mongoDbUri = 'mongodb://localhost:27017/bukukontak';

//memanggil berkas yang akan menangani transaksi dengan database dengan collection
const kontak = require('./models/kontak.model');

/*
 * Pada baris 31 hingga baris 44 digunakan untuk menghubungkan aplikasi dengan database mongoDB 
 * dengan bantuan library mongoose sebagai library ODM.
 * Detil penjelasannya dapat ditemukan pada https://mongoosejs.com/docs/connections.html 
 */ 

// menghubungkan aplikasi dengan database dengan parameter lokasi database pada variabel mongoDbUri
mongoose.connect(mongoDbUri, {
    useNewUrlParser: true,
});

// pengecekan apakah database telah terhubung, jika iya maka akan menampilkan teks sebagai berikut
mongoose.connection.on('connected', () => {
    console.log(`Aplikasi Buku Kontak terhubung dengan database pada ${mongoDbUri}`);
});

// jika tidak terhubung maka akan menjadikan status dari mongoose 'error', dan akan menampilkan teks sebagai berikut
mongoose.connection.on('error', err => {
    console.log('Terjadi galat ketika menghubungkan dengan database', err);
});

// membuat inisiasi server dari host dan port, dapat dilihat https://hapijs.com/tutorials
const server = Hapi.Server({
    host: 'localhost',
    port: 8000
});

/* untuk routing aplikasi kita memanggil varible kontakRoutes yang merupakan 
 * isi dari file kontak.routes.js yang terletak pada folder routes
 */
server.route(kontakRoutes);

//membuat fungsi untuk memulai server, dapat dilihat https://hapijs.com/tutorials
async function start() {
    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at: ', server.info.uri);
}

//menjalankan server dengan memanggil fungsi start() 
start();