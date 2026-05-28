const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({

  user: 'postgres.defiggptiubvpzecduvq',

  host: 'aws-1-sa-east-1.pooler.supabase.com',

  database: 'postgres',

  password: 'ProjetoA3Sexta!',

  port: 6543,

  ssl: {
    rejectUnauthorized: false,
  },

});


// =========================
// LISTAR DISPOSITIVOS
// =========================

app.get('/sensores', async (req, res) => {

  try {

    const resultado = await pool.query(
      'SELECT * FROM sensores ORDER BY id ASC'
    );

    res.json(resultado.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      erro: 'Erro ao buscar dispositivos',
    });

  }

});


// =========================
// BUSCAR POR ID
// =========================

app.get('/sensores/:id', async (req, res) => {

  const { id } = req.params;

  try {

    const resultado = await pool.query(
      'SELECT * FROM sensores WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        erro: 'Dispositivo não encontrado',
      });

    }

    res.json(resultado.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      erro: 'Erro ao buscar dispositivo',
    });

  }

});


// =========================
// CRIAR
// =========================

app.post('/sensores', async (req, res) => {

  const {
    dispositivo,
    sensor,
    status,
    valor,
  } = req.body;

  try {

    const resultado = await pool.query(
      `
      INSERT INTO sensores
      (
        dispositivo,
        sensor,
        status,
        valor
      )

      VALUES ($1, $2, $3, $4)

      RETURNING *
      `,
      [
        dispositivo,
        sensor,
        status,
        valor,
      ]
    );

    res.status(201).json(
      resultado.rows[0]
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      erro: 'Erro ao criar dispositivo',
    });

  }

});


// =========================
// ATUALIZAR
// =========================

app.put('/sensores/:id', async (req, res) => {

  const { id } = req.params;

  const {
    dispositivo,
    sensor,
    status,
    valor,
  } = req.body;

  try {

    const resultado = await pool.query(
      `
      UPDATE sensores

      SET
        dispositivo = $1,
        sensor = $2,
        status = $3,
        valor = $4

      WHERE id = $5

      RETURNING *
      `,
      [
        dispositivo,
        sensor,
        status,
        valor,
        id,
      ]
    );

    if (resultado.rows.length === 0) {

      return res.status(404).json({
        erro: 'Dispositivo não encontrado'
      });

    }

    res.json(resultado.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      erro: 'Erro ao atualizar dispositivo',
    });

  }

});


// =========================
// DELETAR
// =========================

app.delete('/sensores/:id', async (req, res) => {

  const { id } = req.params;

  try {

    await pool.query(
      'DELETE FROM sensores WHERE id = $1',
      [id]
    );

    res.json({
      mensagem:
        'Dispositivo deletado com sucesso',
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      erro: 'Erro ao deletar dispositivo',
    });

  }

});


// =========================
// SERVIDOR
// =========================

app.listen(3000, '0.0.0.0', () => {

  console.log(
    'Servidor rodando na porta 3000'
  );

});