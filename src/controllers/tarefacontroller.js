const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarTarefa(req, res) {
  try {
    const { usuarioId, descricao, nome_setor, prioridade } = req.body;

    if (!usuarioId || !descricao || !nome_setor || !prioridade) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const tarefa = await prisma.tarefa.create({
      data: {
        usuarioId,
        descricao,
        nome_setor,
        prioridade,
        
      },
      include: { usuario: true },
    });

    res.status(201).json(tarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function listarTarefas(req, res) {
  try {
    const tarefas = await prisma.tarefa.findMany({
      include: { usuario: true },
      orderBy: { data_cadastro: 'desc' },
    });
    res.json(tarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function atualizarTarefa(req, res) {
  try {
    const { id } = req.params;
    const { status, prioridade } = req.body;

    const dadosAtualizar = {};
    if (status) dadosAtualizar.status = status;
    if (prioridade) dadosAtualizar.prioridade = prioridade;

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: dadosAtualizar,
      include: { usuario: true },
    });

    res.json(tarefaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function excluirTarefa(req, res) {
  try {
    const { id } = req.params;

    await prisma.tarefa.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

module.exports = {
  criarTarefa,
  listarTarefas,
  atualizarTarefa,
  excluirTarefa,
};
