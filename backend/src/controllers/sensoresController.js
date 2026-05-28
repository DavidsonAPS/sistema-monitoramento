const db = require('../config/db');

exports.listarSensores = async (req, res) => {

    try {

        const result = await db.query(
            'SELECT * FROM sensores ORDER BY id ASC'
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro ao buscar sensores'
        });

    }
};

exports.buscarSensor = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await db.query(
            'SELECT * FROM sensores WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                erro: 'Sensor não encontrado'
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro ao buscar sensor'
        });

    }
};

exports.criarSensor = async (req, res) => {

    try {

        const {
            nome,
            localizacao,
            status,
            temperatura
        } = req.body;

        const result = await db.query(
            `INSERT INTO sensores
            (nome, localizacao, status, temperatura)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [nome, localizacao, status, temperatura]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro ao criar sensor'
        });

    }
};

exports.atualizarSensor = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nome,
            localizacao,
            status,
            temperatura
        } = req.body;

        const result = await db.query(
            `UPDATE sensores
            SET nome = $1,
                localizacao = $2,
                status = $3,
                temperatura = $4
            WHERE id = $5
            RETURNING *`,
            [nome, localizacao, status, temperatura, id]
        );

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro ao atualizar sensor'
        });

    }
};

exports.deletarSensor = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            'DELETE FROM sensores WHERE id = $1',
            [id]
        );

        res.json({
            mensagem: 'Sensor deletado'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro ao deletar sensor'
        });

    }
};