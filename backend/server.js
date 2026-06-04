const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

app.get('/', (req, res) => {

  res.json({

    status: 'online',

    mensagem: 'API SmartMonitor funcionando',

  })

})

// =========================
// REGISTER
// =========================

app.post('/register', async (req, res) => {

  console.log('REGISTER RECEBIDO')
  console.log(req.body)

  const {
    nome,
    email,
    senha,
  } = req.body;

  try {

    const usuarioExistente =
      await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );

    if (
      usuarioExistente.rows.length > 0
    ) {

      return res.status(400).json({
        erro: 'Email já cadastrado'
      });

    }

    const senhaHash =
      await bcrypt.hash(
        senha,
        10
      );

    const resultado =
      await pool.query(
        `
        INSERT INTO usuarios
        (
          nome,
          email,
          senha
        )

        VALUES
        (
          $1,
          $2,
          $3
        )

        RETURNING
        id,
        nome,
        email
        `,
        [
          nome,
          email,
          senhaHash
        ]
      );

    res.status(201).json(
      resultado.rows[0]
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      erro: 'Erro ao cadastrar usuário'
    });

  }

});

// =========================
// LOGIN
// =========================

app.post('/login', async (req, res) => {

  const {
    email,
    senha,
  } = req.body;

  try {

    const resultado =
      await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );

    if (
      resultado.rows.length === 0
    ) {

      return res.status(401).json({
        erro: 'Email ou senha inválidos'
      });

    }

    const usuario =
      resultado.rows[0];

    const senhaValida =
      await bcrypt.compare(
        senha,
        usuario.senha
      );

    if (!senhaValida) {

      return res.status(401).json({
        erro: 'Email ou senha inválidos'
      });

    }

    const token =
      jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
        },
        'projetoA3SuperSecreto2026',
        {
          expiresIn: '7d',
        }
      );

    res.json({

      token,

      usuario: {

        id: usuario.id,

        nome: usuario.nome,

        email: usuario.email,

      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      erro: 'Erro ao fazer login'
    });

  }

});

// =========================
// LISTAR DISPOSITIVOS
// =========================

app.get('/sensores/:usuario_id/lista', async (req, res) => {

  const { usuario_id } = req.params

  try {

    const resultado = await pool.query(

      `
      SELECT *
      FROM sensores
      WHERE usuario_id = $1
      ORDER BY id ASC
      `,

      [usuario_id]

    )

    res.json(resultado.rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: 'Erro ao buscar dispositivos'
    })

  }

})

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
    usuario_id,
  } = req.body;

  try {

    const resultado = await pool.query(
      `
      INSERT INTO sensores
      (
        dispositivo,
        sensor,
        status,
        valor,
        usuario_id
      )

      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5
      )

      RETURNING *
      `,
      [
        dispositivo,
        sensor,
        status,
        valor,
        usuario_id || null,
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

    const sensorAtualizado =
  resultado.rows[0]

  console.log(
  'SALVANDO HISTORICO:',
  sensorAtualizado
)

await pool.query(
  `
  INSERT INTO historico_sensores
  (
    usuario_id,
    dispositivo,
    sensor,
    valor,
    status
  )

  VALUES
  (
    $1,
    $2,
    $3,
    $4,
    $5
  )
  `,
  [
    sensorAtualizado.usuario_id,
    sensorAtualizado.dispositivo,
    sensorAtualizado.sensor,
    sensorAtualizado.valor,
    sensorAtualizado.status
  ]
)

    res.json(resultado.rows[0]);

 } catch (error) {

  console.error(
    'ERRO COMPLETO:',
    error
  )

  res.status(500).json({
    erro: error.message
  })

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
// HISTÓRICO
// =========================

app.get('/historico/:usuario_id', async (req, res) => {

  const { usuario_id } = req.params

  try {

    const resultado = await pool.query(
      `
      SELECT *
      FROM historico_sensores
      WHERE usuario_id = $1
      ORDER BY criado_em DESC
      `,
      [usuario_id]
    )

    res.json(resultado.rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: 'Erro ao buscar histórico'
    })

  }

})

// =========================
// SERVIDOR
// =========================

app.get('/teste', (req, res) => {

  res.json({
    ok: true,
    mensagem: 'Servidor atualizado'
  })

})

const PORT =
  process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {

  console.log(
    `Servidor rodando na porta ${PORT}`
  )

})