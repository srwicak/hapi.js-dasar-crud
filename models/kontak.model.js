/*
 * File yang bertanggung jawab menghubungkan aplikasi dengan collection database
 * Menggunakan library mongoose untuk melakukan transaksi dengan database
 * TASK 3: Cari kelemahan dari skema ini dan solusinya
 */

const mongoose = require('mongoose');

/*
 * memanggil kelas Schema dari library mongoose, hal yang dapat dilakukan 
 * oleh class ini dapat dilihat https://mongoosejs.com/docs/guide.html
 */
const Schema = mongoose.Schema;

/* 
 * menciptakan schema dari kontakSchema
 * dapat kita lihat pada kontak schme melibatkan komponen-komponen (selanjutnya disebut, field) data:
 * 1. name, dimana tipe data dari 'name' adalah string, dan ini harus diisi
 * 2. phone, yang berupa tipe data string
 * 3. address, yang berupa tipe data string
 * tipe data apa saja yang bisa disimpan dengan bantuan library mongoose,
 * bisa dilihat https://mongoosejs.com/docs/schematypes.html
 */
const kontakSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    phone: String,
    address: String,
});

//mengekspor model kontakSchema dengan nama kontak
module.exports = mongoose.model('kontak', kontakSchema);

/*
 * Catatan:
 * Nama collection secara otomatis merupakan bentuk jamak (secara Bahasa Inggris) dari nama model.
 * Maka jika nama model kita kontak maka nama collection akan menjadi kontak.
 * Bisa dibuktikan dengan membuka database dengan perintah
 * 1. mongo
 * 2. use crud
 * 3. show collections
 * 
 * Hal tersebut terdapat pada laman dokumentasi dari mongoose https://mongoosejs.com/docs/models.html
 * "The first argument is the singular name of the collection your model is for. 
 * Mongoose automatically looks for the plural version of your model name. 
 * The model Tank is for the tanks collection in the database."
 */