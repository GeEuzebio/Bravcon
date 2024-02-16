const express = require("express");
const session = require('express-session');
const flash = require('express-flash');
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const dashboard = require('./routes/dashboard');
const home = require('./routes/home');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(session({secret: 'An@5ophi4', resave: true, saveUninitialized: true}));
app.use(flash());

//Rotas
app.use('/', home);
app.use('/dashboard', dashboard);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})