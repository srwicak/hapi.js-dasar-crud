/*
 * File yang bertanggung jawab untuk menghubungkan routing url dengan fungsi atau aksi yang sesuai
 * TASK 1: Pada file ini hanya akan dijelaskan satu fungsi saja, sisanya mohon dicoba untuk dipahami sendiri
 */

// memanggil berkas model untuk kontakSchema dari folder models
const kontak = require('../models/kontak.model');

module.exports = {

    // ini adalah fungsi untuk Create, memasukkan data ke database
    create (r, h) {
        /*
         * Seperti yang telah diketahui dari file kontak.model.js dari folder models,
         * diketahui bahwa field 'nama' merupakan komponen yang wajib
         * maka pertama kita perlu mengecek apakah user memasukan data pada field 'nama'
         */ 
        if (!r.payload.name) {
            /* 
             * jika field 'nama' tidak ada maka aplikasi akan menampilkan teks berikut,
             * beserta dengan HTTP code 400, daftar code bisa dilihat https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
             */
            return h.response({
                er: 'name is required'
            }).code(400);
        }

        /*
         * Pada Hapi.js versi 17, setiap metode handler harus dapat mengembalikan sebuah value/nilai
         * promise, atau mengembalikan galat (throw an error), detil: https://hapijs.com/api/#lifecycle-methods. 
         * "Each lifecycle method must return a value or a promise that resolves into a value. If a lifecycle method returns 
         * without a value or resolves to an undefined value, an Internal Server Error (500) error response is sent."
         * Untuk fungsi dari kelas salah satu cara untuk mengembalikan datanya dengan cara membuat sebuah Promise
         * dengan variabel resolve dan reject. Resolve digunakan untuk Promises yang sukses dan 
         * reject untuk Promises yang gagal.
         */ 
        const promise = new Promise((resolve, reject) => {
            /*
             * fungsi create() merupakan inheritance (warisan) dari kelas Model dari library mongoose
             * Metode-metode apa saja yang dapat dilakukan dapat dilihat pada https://mongoosejs.com/docs/api.html
             */
            kontak.create({
                name: r.payload.name,
                phone: r.payload.phone,
                address: r.payload.address
            }, function (err, savedkontak) {
                if (err) {
                    reject(h.response(err).code(500));
                }
                resolve(h.response(savedkontak));
            });
        });

        return promise;
    },

    findsAll (r, h) {
        const promise = new Promise((resolve, reject) => {
            kontak.find({}, (err, kontaks) => {
                if (err) {
                    reject(h.response(err).code(404));
                }
                resolve(h.response(kontaks));
            });
        });

        return promise;
    },

    find(r, h) {
        if (!r.params.id) {
            return h.response({
                err: 'id is required param'
            }).code(400);
        }

        const promise = new Promise((resolve, reject) => {
            kontak.findById(r.params.id, (err, kontak) => {
                if (err) {
                    reject(h.response(err).code(404));
                }
                resolve(h.response(kontak));
            });
        });

        return promise;
    },

    update (r, h) {
        if (!r.params.id) {
            return h.response({
                err: 'id is required param'
            }).code(400);
        }
        let attributes = {};

        if (r.payload.name) {
            attributes.name = r.payload.name;
        }

        if (r.payload.phone) {
            attributes.phone = r.payload.phone;
        }

        if (r.payload.address) {
            attributes.address = r.payload.address;
        }

        const promise = new Promise((resolve, reject) => {
            kontak.findByIdAndUpdate(
                r.params.id,
                attributes, {
                    new: true
                },
                (err, kontak) => {
                    if (err) {
                        reject(h.response(err).code(500));
                    }
                    resolve(h.response(kontak));
                }
            );
        });

        return promise;
    },

    delete (r, h) {
        if (!r.params.id) {
            return h.response({err: 'id is required param'}).code(400);
        }

        const promise = new Promise((resolve, reject) => {
            kontak.findByIdAndRemove(r.params.id, (err, result) => {
                if (err) {
                    reject(h.response(err).code(500));
                }
                resolve(h.response({msg: `kontak has deleted with id ${r.params.id}`}));
            });
        });
        return promise;
    }
}