const sensoresIniciais = [
    { id: 1, nome: "Sensor Galpão A", tipo: "Temperatura", valor:
    24.5, unidade: "°C", status: "normal" },
    { id: 2, nome: "Sensor Estufa 02", "tipo": "Umidade", valor: 88.0,
    unidade: "%", status: "critico" },
    { id: 3, nome: "Sensor Compressor", tipo: "Pressão", valor: 6.2,
    unidade: "bar", status: "normal" },

    { id: 4, nome: "Sensor Câmara Fria", tipo: "Temperatura", valor: -
    2.1, unidade: "°C", status: "normal" },
    { id: 5, nome: "Sensor Almoxarifado", tipo: "Umidade", valor:
    45.5, unidade: "%", status: "normal" },
    { id: 6, nome: "Sensor Caldeira", tipo: "Temperatura", valor: 98.4,
    unidade: "°C", status: "critico" }
];

const container = document.getElementById("sensores");
const tipoSensor = document.getElementById("tipo-sensor");
const botaoAtualizar = document.getElementById("atualizar");
const ultimaAtualizacao = document.getElementById("ultima-atualizacao");

function renderizarDashboard(lista) {
    container.innerHTML = "";
    lista.forEach(sensor => {
        const card = document.createElement("div");
        card.classList.add("card");
        if (sensor.status === "critico") {
            card.classList.add("card-alerta");
        }
        card.innerHTML = `
            <h2>${sensor.nome}</h2>
            <p>Tipo: ${sensor.tipo}</p>
            <p class="valor">${sensor.valor} ${sensor.unidade}</p>
            <p>Status: ${sensor.status}</p>
            <button class="historico">Histórico</button>
        `;
        container.appendChild(card);
    });
}

tipoSensor.addEventListener("change", () => {
    const tipoSelecionado = tipoSensor.value;
    let sensoresFiltrados;
    if (tipoSelecionado === "todos") {
        sensoresFiltrados = sensoresIniciais;
    } else {
        sensoresFiltrados = sensoresIniciais.filter(sensor => {
            return sensor.tipo === tipoSelecionado;
        });
    }
    renderizarDashboard(sensoresFiltrados);
});


function atualizarSensores() {
    sensoresIniciais.forEach(sensor => {
        const variacao = (Math.random() * 2) - 1;
        sensor.valor += variacao;
        sensor.valor = Number(sensor.valor.toFixed(1));
        if (sensor.tipo === "Temperatura") {
            if (sensor.valor > 37) {
                sensor.status = "critico";
            } else {
                sensor.status = "normal";
            }
        } else if (sensor.tipo === "Umidade") {
            if (sensor.valor < 80) {
                sensor.status = "critico";
            } else {
                sensor.status = "normal";
            }
        } else if (sensor.tipo === "Pressão") {

            if (sensor.valor > 7) {
                sensor.status = "critico";
            } else {
                sensor.status = "normal";
            }
        }
    });
    aplicarFiltroAtual();
}

function aplicarFiltroAtual() {
    const tipoSelecionado = tipoSensor.value;
    if (tipoSelecionado === "todos") {
        renderizarDashboard(sensoresIniciais);
        return;
    }
    const sensoresFiltrados = sensoresIniciais.filter(sensor => {
        return sensor.tipo === tipoSelecionado;
    });
    renderizarDashboard(sensoresFiltrados);
}

botaoAtualizar.addEventListener("click", () => {
    atualizarSensores();
});
setInterval(() => {
    atualizarSensores();
}, 30000);

renderizarDashboard(sensoresIniciais);