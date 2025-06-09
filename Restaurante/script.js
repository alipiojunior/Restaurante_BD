const BASE_URL = 'http://localhost:3000'; 

function formatToMySQLDateTime(datetimeLocalString) {
    if (!datetimeLocalString) return null;
    const [datePart, timePart] = datetimeLocalString.split('T');
    return `${datePart} ${timePart}:00`;
}

document.getElementById('btnCadastrarCliente')?.addEventListener('click', async () => {
    const nome = document.getElementById('nomeCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;
    const email = document.getElementById('emailCliente').value;

    try {
        const response = await fetch(`${BASE_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, telefone, email })
        });
        const message = await response.text();
        if (response.ok) {
            alert(message);
            document.getElementById('nomeCliente').value = '';
            document.getElementById('telefoneCliente').value = '';
            document.getElementById('emailCliente').value = '';
        } else {
            alert('Erro ao cadastrar cliente: ' + message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão ao cadastrar cliente.');
    }
});

document.getElementById('btnMostrarClientes')?.addEventListener('click', async () => {
    try {
        const response = await fetch(`${BASE_URL}/clientes`);
        const clientes = await response.json();
        alert('Clientes cadastrados:\n' + JSON.stringify(clientes, null, 2));
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao buscar clientes.');
    }
});

document.getElementById('btnDeletarCliente')?.addEventListener('click', async () => {
    const email = document.getElementById('emailDeletarCliente').value;

    try {
        const response = await fetch(`${BASE_URL}/clientes/${email}`, {
            method: 'DELETE'
        });
        const message = await response.text();
        if (response.ok) {
            alert(message);
            document.getElementById('emailDeletarCliente').value = '';
        } else {
            alert('Erro ao deletar cliente: ' + message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão ao deletar cliente.');
    }
});

document.getElementById('btnCadastrarMesa')?.addEventListener('click', async () => {
    const capacidade = document.getElementById('capacidadeMesa').value;
    const localizacao = document.getElementById('localizacaoMesa').value;

    try {
        const response = await fetch(`${BASE_URL}/mesas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ capacidade, localizacao })
        });
        const message = await response.text();
        if (response.ok) {
            alert(message);
            document.getElementById('capacidadeMesa').value = '';
            document.getElementById('localizacaoMesa').value = '';
        } else {
            alert('Erro ao cadastrar mesa: ' + message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão ao cadastrar mesa.');
    }
});

document.getElementById('btnMostrarMesas')?.addEventListener('click', async () => {
    try {
        const response = await fetch(`${BASE_URL}/mesas`);
        const mesas = await response.json();
        alert('Mesas cadastradas:\n' + JSON.stringify(mesas, null, 2));
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao buscar mesas.');
    }
});

document.getElementById('btnCadastrarReserva')?.addEventListener('click', async () => {
    const id_cliente = document.getElementById('idClienteReserva').value;
    const id_mesa = document.getElementById('idMesaReserva').value;
    const data_hora = document.getElementById('dataHoraReserva').value;
    const num_pessoas = document.getElementById('numPessoasReserva').value;

    try {
        const response = await fetch(`${BASE_URL}/reservas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_cliente, id_mesa, data_hora, num_pessoas })
        });
        const message = await response.text();
        if (response.ok) {
            alert(message);
            document.getElementById('idClienteReserva').value = '';
            document.getElementById('idMesaReserva').value = '';
            document.getElementById('dataHoraReserva').value = '';
            document.getElementById('numPessoasReserva').value = '';
        } else {
            alert('Erro ao cadastrar reserva: ' + message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão ao cadastrar reserva.');
    }
});


document.getElementById('btnMostrarReservas')?.addEventListener('click', async () => {
    try {
        const response = await fetch(`${BASE_URL}/reservas`);
        const reservas = await response.json();
        alert('Reservas cadastradas:\n' + JSON.stringify(reservas, null, 2));
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao buscar reservas.');
    }
});

document.getElementById('btnAtualizarReserva')?.addEventListener('click', async () => {
    const id_reserva = document.getElementById('idReservaAtualizar').value;
    const novoNumPessoas = document.getElementById('novoNumPessoasReserva').value;

    const data_hora = document.getElementById('novaDataHoraReserva').value;

    try {
        const response = await fetch(`${BASE_URL}/reservas/${id_reserva}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data_hora, num_pessoas: novoNumPessoas })
        });
        const message = await response.text();
        if (response.ok) {
            alert(message);
            document.getElementById('idReservaAtualizar').value = '';
            document.getElementById('novaDataHoraReserva').value = '';
            document.getElementById('novoNumPessoasReserva').value = '';
        } else {
            alert('Erro ao atualizar reserva: ' + message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão ao atualizar reserva.');
    }
});

document.getElementById('btnDeletarReserva')?.addEventListener('click', async () => {
    const id_reserva = document.getElementById('idReservaDeletar').value;

    try {
        const response = await fetch(`${BASE_URL}/reservas/${id_reserva}`, {
            method: 'DELETE'
        });
        const message = await response.text();
        if (response.ok) {
            alert(message);
            document.getElementById('idReservaDeletar').value = '';
        } else {
            alert('Erro ao deletar reserva: ' + message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão ao deletar reserva.');
    }
});
