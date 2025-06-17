const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ mensagem: 'Erro ao listar usuários.' });
        }
        res.json(results);
    });
});
router.post('/', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ mensagem: 'Nome e e-mail são obrigatórios.' });
    }
    db.query(
        'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
        [nome, email],
        (err, results) => {
            if (err) {
                return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' });
            }
            res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: results.insertId });
        }
    );
});

module.exports = router;