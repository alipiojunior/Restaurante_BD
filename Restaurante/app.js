const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../Front-End')));

// Rotas para clientes
app.post('/clientes', async (req, res) => {
    const { nome, telefone, email } = req.body;
    try {
        await db.registerClients(nome, telefone, email);
        res.status(201).send('Cliente cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(400).send(error.message); 
    }
});

app.delete('/clientes/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const result = await db.deleteClients(email);
        if (result.affectedRows === 0) {
            res.status(404).send('Cliente não encontrado.');
        } else {
            res.status(200).send('Cliente deletado com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).send('Erro interno do servidor ao deletar cliente.');
    }
});

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await db.selectClients();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).send('Erro interno do servidor ao buscar clientes.');
    }
});

// Rotas para mesas
app.post('/mesas', async (req, res) => {
    const { capacidade, localizacao } = req.body;
    try {
        await db.registerMesa(capacidade, localizacao);
        res.status(201).send('Mesa cadastrada com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar mesa:', error);
        res.status(500).send('Erro interno do servidor ao cadastrar mesa.');
    }
});

app.get('/mesas', async (req, res) => {
    try {
        const mesas = await db.selectMesas();
        res.status(200).json(mesas);
    } catch (error) {
        console.error('Erro ao buscar mesas:', error);
        res.status(500).send('Erro interno do servidor ao buscar mesas.');
    }
});

// Rotas para reservas
app.post('/reservas', async (req, res) => {
    const { id_cliente, id_mesa, data_hora, num_pessoas } = req.body; // Alterado 'horario' para 'data_hora'
    try {
        await db.registerReserva(id_cliente, id_mesa, data_hora, num_pessoas);
        res.status(201).send('Reserva cadastrada com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar reserva:', error);
        res.status(400).send(error.message); // Envia a mensagem de erro específica do banco ou da validação
    }
});

app.put('/reservas/:id', async (req, res) => {
    const { data_hora, num_pessoas } = req.body; // Alterado 'horario' para 'data_hora'
    const { id } = req.params;
    try {
        const result = await db.updateReserva(id, data_hora, num_pessoas);
        if (result.affectedRows === 0) {
            res.status(404).send('Reserva não encontrada.');
        } else {
            res.status(200).send('Reserva atualizada com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao atualizar reserva:', error);
        res.status(400).send(error.message);
    }
});

app.delete('/reservas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.deleteReserva(id);
        if (result.affectedRows === 0) {
            res.status(404).send('Reserva não encontrada.');
        } else {
            res.status(200).send('Reserva deletada com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao deletar reserva:', error);
        res.status(500).send('Erro interno do servidor ao deletar reserva.');
    }
});

app.get('/reservas', async (req, res) => {
    try {
        const reservas = await db.selectReservas();
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Erro ao buscar reservas:', error);
        res.status(500).send('Erro interno do servidor ao buscar reservas.');
    }
});

// Rota raiz (opcional)
app.get('/', (req, res) => {
    res.send('API do Restaurante funcionando!');
});

// Rodar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});