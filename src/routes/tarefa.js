const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { descricao, status, prioridade, usuario_id, nome_setor } = req.body;
    if (!descricao || !status || !usuario_id) {
        return res.status(400).json({ mensagem: 'Descrição, status e usuário são obrigatórios.' });
    }
    db.query(
        'INSERT INTO tarefas (descricao, status, prioridade, usuario_id, nome_setor) VALUES (?, ?, ?, ?, ?)',
        [descricao, status, prioridade, usuario_id, nome_setor],
        (err, results) => {
            if (err) {
                console.error('Erro ao cadastrar tarefa:', err);
                return res.status(500).json({ mensagem: 'Erro ao cadastrar tarefa.' });
            }
            res.status(201).json({ mensagem: 'Tarefa cadastrada com sucesso!', id: results.insertId });
        }
    );
});

router.get('/', (req, res) => {
    const sql = `
        SELECT 
            tarefas.id,
            tarefas.descricao,
            tarefas.status,
            tarefas.prioridade,
            tarefas.nome_setor,
            usuarios.id AS usuario_id,
            usuarios.nome AS usuario_nome,
            usuarios.email AS usuario_email
        FROM tarefas
        JOIN usuarios ON tarefas.usuario_id = usuarios.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar tarefas:', err);
            return res.status(500).json({ mensagem: 'Erro ao listar tarefas.' });
        }
        res.json(results);
    });
});

router.patch('/:id', (req, res) => {
    const { descricao, status, prioridade, usuario_id, nome_setor } = req.body;
    db.query(
        'UPDATE tarefas SET descricao=?, status=?, prioridade=?, usuario_id=?, nome_setor=? WHERE id=?',
        [descricao, status, prioridade, usuario_id, nome_setor, req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ mensagem: 'Erro ao atualizar tarefa.' });
            }
            res.json({ mensagem: 'Tarefa atualizada com sucesso!' });
        }
    );
});

router.delete('/:id', (req, res) => {
    db.query(
        'DELETE FROM tarefas WHERE id=?',
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ mensagem: 'Erro ao excluir tarefa.' });
            }
            res.json({ mensagem: 'Tarefa excluída com sucesso!' });
        }
    );
});

module.exports = router;
