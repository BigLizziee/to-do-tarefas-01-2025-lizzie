const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const usuarioRoutes = require('./routes/usuario');
app.use('/usuarios', usuarioRoutes);

const tarefaRoutes = require('./routes/tarefa');
app.use('/tarefas', tarefaRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});