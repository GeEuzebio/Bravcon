const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const mysql = require("mysql2");
const path = require("path");

router.get('/', (req, res) => {
    res.sendFile('C:/Users/georg/OneDrive/Área de Trabalho/Bravecon/home.html');
});

router.get('/get-access-token', (req, res) => {
    fetch('https://development.belvo.com/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Host': 'development.belvo.com',
        },
        body: JSON.stringify({
            "id": "28094c13-1a0c-43a8-97c1-a59df45b9251",
            "password": "-nTod8RtkgZ@j@n2ijrvP4eX@jw@4Mwf0Els3uUnam0arrdJ21#USkH2O#f8fCdz",
            "scopes": "read_institutions,write_links"
        })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const refreshToken = data.refresh;
            const accessToken = data.access;
            res.json({ access: accessToken });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

router.post('/send-link', (req, res) => {
    const result = req.body;
    console.log(result);
    fetch(`https://sandbox.belvo.com/api/accounts/${result.link}/?fields=id`, {method: 'GET'})
    .then(response => {
        console.log(response.status);
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log('Erro: ' + error));
    console.log(userEmail);
    connection.connect();
    connection.query('UPDATE users SET linkId=? WHERE email=?', [result.link, userEmail]);
})



module.exports = router