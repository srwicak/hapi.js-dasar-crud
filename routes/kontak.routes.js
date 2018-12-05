/*
 * File yang bertanggung jawab untuk mengatur jalur alamat API
 * TASK 2: Pada file ini hanya akan dijelaskan satu alur saja, sisanya mohon dicoba untuk dipahami sendiri
 */

 // memanggil berkas kontroller
const kontakController = require('../controllers/kontak.controllers');

module.exports = [{
        /*
         * path, merupakan alamat yang akan dikendalikan
         * method, merupakan metode dalam melakukan request kepada HTTP, 
         * untuk lebih jelasnya dapat mengunjungi:
         * - https://developer.mozilla.org/id/docs/Web/HTTP/Methods
         * - https://www.tutorialspoint.com/http/http_methods.htm
         * - https://restfulapi.net/http-methods/
         * - https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
         * handler, merupakan aksi yang dilakukan pada alamat tersebut
         * pada contoh ini handler tersebut mengambil dari file kontak.controllers.js pada folder controllers.
         * Oleh karena itu pada contoh ini dapat kita ketahui bahwa dengan mengakses 
         * menggunakan metode POST pada alamat
         * http://localhost:8000/api
         * dilakukan aksi dari metode create dari KontakController
         */
        path: '/api/kontak',
        method: 'POST',
        handler: kontakController.create
    },
    {
        path: '/api/kontak',
        method: 'GET',
        handler: kontakController.findsAll
    },
    {
        path: '/api/kontak/{id}',
        method: 'GET',
        handler: kontakController.find
    },
    {
        path: '/api/kontak/{id}',
        method: 'PUT',
        handler: kontakController.update
    },
    {
        path: '/api/kontak/{id}',
        method: 'DELETE',
        handler: kontakController.delete
    }
];