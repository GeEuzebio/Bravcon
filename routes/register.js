const express = require('express');
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '210692',
    database: 'bravcon'
})



module.exports = router