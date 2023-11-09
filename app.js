const express = require("express");
const belvo = require("belvo").default;
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

var client = new belvo(
    '523aaabe-3dce-49ea-bb14-b735b6ee260a',
    't-hdVW@gcWjDF@b7QuCqBm1FYOCqJbQ2dqGKBYEQblEso2dIWwI_UhKehbs2J@EK',
    'sandbox'
);

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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-access-token', (req, res) => {
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
            console.log(response);
            return response.json();
        })
        .then(data => {
            const refreshToken = data.refresh;
            const accessToken = data.access;
            console.log(accessToken);
            res.json({ access: accessToken });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.post('/send-link', (req, res) => {
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

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register_screen.html'));
});

app.post('/register', (req, res) => {
    const form = req.body;
    if (form.password === form.confirmPassword) {
        connection.connect((err) => {
            if (err) {
                console.log('Erro ao se conectar: ' + err.stack);
                return;
            }
            console.log('Conexão bem-sucedida!');
        })

        const newUser = {
            nome: form.firstName,
            sobrenome: form.lastName,
            email: form.email,
            senha: form.password,
            linkId: ''
        }

        connection.query('INSERT INTO users SET ?', newUser);
    } else {
        console.log('Senhas diferentes')
    }
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const user = req.body;
    connection.connect();
    connection.query('SELECT * FROM users WHERE email=? AND senha=?', [user.email, user.password], (result) => {
        setUserEmail(user.email);
        res.redirect('/');
    });
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})