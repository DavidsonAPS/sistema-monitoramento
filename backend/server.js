require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sensoresRoutes = require(
    './src/routes/sensoresRoutes'
);

const app = express();

app.use(cors());

app.use(express.json());

app.use('/sensores', sensoresRoutes);

app.get('/', (req, res) => {

    res.send('API funcionando');

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});