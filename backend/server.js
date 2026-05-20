require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.get('/sensores', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM sensores');
        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao buscar sensores'
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});