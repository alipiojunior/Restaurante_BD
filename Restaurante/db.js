const mysql = require('mysql2/promise');

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const connection = await mysql.createConnection("mysql://root:zack22507@localhost:3306/restaurante");

    // const connection = await mysql.createConnection("mysql://root:sua_senha@localhost:3306/SeuBanco"); // Substitua pelas suas informações
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;


}

async function selectClients() {
    const conn = await connect();
    const [rows] = await conn.execute('SELECT * FROM Cliente;');
    return rows;
}

async function registerClients(nome, telefone, email) {
    const conn = await connect();
    try {
        const [result] = await conn.execute('INSERT INTO Cliente (nome, telefone, email) VALUES (?, ?, ?);', [nome, telefone, email]);
        return result;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('E-mail já cadastrado. Por favor, use outro e-mail.');
        }
        throw error;
    }
}

async function deleteClients(email) {
    const conn = await connect();
    const [result] = await conn.execute('DELETE FROM Cliente WHERE email = ?;', [email]);
    return result;
}

// Funções para Mesa
async function selectMesas() {
    const conn = await connect();
    const [rows] = await conn.execute('SELECT * FROM Mesa;');
    return rows;
}

async function registerMesa(capacidade, localizacao) {
    const conn = await connect();
    const [result] = await conn.execute('INSERT INTO Mesa (capacidade, localizacao) VALUES (?, ?);', [capacidade, localizacao]);
    return result;
}

// Funções para Reserva
async function selectReservas() {
    const conn = await connect();
    // Exemplo de JOIN para mostrar dados mais úteis na reserva
    const [rows] = await conn.execute(`
        SELECT
            R.id_reserva,
            C.nome AS cliente_nome,
            C.email AS cliente_email,
            M.localizacao AS mesa_localizacao,
            M.capacidade AS mesa_capacidade,
            R.data_hora,
            R.num_pessoas
        FROM Reserva AS R
        JOIN Cliente AS C ON R.id_cliente = C.id_cliente
        JOIN Mesa AS M ON R.id_mesa = M.id_mesa;
    `);
    return rows;
}

async function registerReserva(id_cliente, id_mesa, data_hora, num_pessoas) {
    const conn = await connect();
    try {
        const [result] = await conn.execute('INSERT INTO Reserva (id_cliente, id_mesa, data_hora, num_pessoas) VALUES (?, ?, ?, ?);', [id_cliente, id_mesa, data_hora, num_pessoas]);
        return result;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Já existe uma reserva para esta mesa neste horário. Por favor, escolha outro horário ou mesa.');
        }
        if (error.code === 'ER_NO_REFERENCED_ROW_2' || error.code === 'ER_NO_REFERENCED_ROW') {
            throw new Error('ID de Cliente ou ID de Mesa inválido. Verifique os IDs informados.');
        }
        throw error;
    }
}

async function updateReserva(id_reserva, data_hora, num_pessoas) {
    const conn = await connect();
    try {
        const [result] = await conn.execute('UPDATE Reserva SET data_hora = ?, num_pessoas = ? WHERE id_reserva = ?;', [data_hora, num_pessoas, id_reserva]);
        return result;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Já existe uma reserva para esta mesa neste horário. Por favor, escolha outro horário.');
        }
        throw error;
    }
}

async function deleteReserva(id_reserva) {
    const conn = await connect();
    const [result] = await conn.execute('DELETE FROM Reserva WHERE id_reserva = ?;', [id_reserva]);
    return result;
}

module.exports = {
    connect,
    selectClients,
    registerClients,
    deleteClients,
    selectMesas,
    registerMesa,
    selectReservas,
    registerReserva,
    updateReserva,
    deleteReserva
};