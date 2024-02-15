const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const mysql = require("mysql2");
const path = require("path");

var userEmail = '';

function setUserEmail(email){
    userEmail = email;
}

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '210692',
    database: 'bravcon'
})

router.get('/', (req, res) => {
    res.sendFile('C:/Users/georg/OneDrive/Área de Trabalho/Bravecon/home.html');
});

router.get('/login', (req, res) => {
    res.sendFile('C:/Users/georg/OneDrive/Área de Trabalho/Bravecon/login.html');
});

router.post('/login', (req, res) => {
    const user = req.body;
    connection.connect();
    connection.query('SELECT * FROM users WHERE email=? AND senha=?', [user.email, user.password], (result) => {
        setUserEmail(user.email);
        res.redirect('/');
    });
});

router.get('/register', (req, res) => {
    res.sendFile('C:/Users/georg/OneDrive/Área de Trabalho/Bravecon/register.html');
});

router.post('/register', (req, res) => {
    const form = req.body;
    console.log(form);
    if (form.senha !== form.confirmsenha) {
       req.flash('error', 'Senhas diferentes!');
       return res.redirect('/register');
    }
    res.redirect('/login');
});

router.get('/quem-somos', (req, res) => {
    res.sendFile('C:/Users/georg/OneDrive/Área de Trabalho/Bravecon/quemsomos.html')
});

module.exports = router