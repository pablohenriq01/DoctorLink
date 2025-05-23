if (!localStorage.getItem("userId")) {
    alert("Você não está logado. Redirecionando para a página de login.");
    window.location.href = "/web/pages/login-page.html";
}

var consultorios = [];

let idConsultorioSelecionado = null;

const carregarConsultorios = async () => {
    const response = await fetch("http://localhost:8080/doctor");
    const data = await response.json();
    consultorios = data;

    const lista = document.getElementById("lista-consultorios");
    lista.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
        lista.innerHTML = "<p>Nenhum consultório cadastrado.</p>";
        return;
    }

    data.forEach(consultorio => {
        const div = document.createElement("div");
        div.className = "consultorio";
        div.innerHTML = `
            <h3>${consultorio.name}</h3>
            <p><strong>Email:</strong> ${consultorio.email}</p>
            <p><strong>Especialidade:</strong> ${consultorio.specialty}</p>
            <p><strong>Horário:</strong> ${consultorio.startTime} - ${consultorio.endTime}</p>
            <button class="btn-consulta" onclick="abrirSeletorHorario(${consultorio.id})">📅 Marcar Consulta</button>
        `;
        lista.appendChild(div);
    });
}

const abrirSeletorHorario = (consultorioId) => {
    idConsultorioSelecionado = consultorioId;

    const consultorio = consultorios.find(c => c.id === consultorioId); 
    const horariosGerados = gerarHorariosComIntervalo(consultorio.startTime, consultorio.endTime);

    const tabela = document.getElementById("tabela-horarios");
    tabela.innerHTML = "";

    horariosGerados.forEach(h => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${h.inicio} - ${h.fim}</td>
            <td><button class="btn-consulta" onclick="marcarConsulta('${h.inicio}', '${h.fim}')">Selecionar</button></td>
        `;
        tabela.appendChild(tr);
    });

    document.getElementById("seletor-horario").style.display = "flex";
};


const fecharSeletor = () => {
    document.getElementById("seletor-horario").style.display = "none";
    idConsultorioSelecionado = null;
};

const marcarConsulta = async (horaInicio, horaFim) => {
    const response = await fetch("http://localhost:8080/appointments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            patientId: localStorage.getItem("userId"),
            consultancyId: idConsultorioSelecionado.toString(),
            timeInitial: horaInicio,
            timeFinal: horaFim
        })
    });

    const data = await response.json();

    if (response.status === 201) {
        alert("Consulta marcada com sucesso!");
    } else {
        alert("Erro ao marcar consulta: " + JSON.stringify(data));
    }

    fecharSeletor();
};

function gerarHorariosComIntervalo(start, end) {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const inicio = new Date();
    inicio.setHours(startH, startM, 0, 0);

    const fim = new Date();
    fim.setHours(endH, endM, 0, 0);

    const horarios = [];

    const atual = new Date(inicio);
    while (true) {
        const consultaInicio = new Date(atual);
        const consultaFim = new Date(consultaInicio);
        consultaFim.setHours(consultaFim.getHours() + 1); 

        if (consultaFim > fim) break;

        horarios.push({
            inicio: consultaInicio.toTimeString().slice(0, 5),
            fim: consultaFim.toTimeString().slice(0, 5)
        });

        atual.setHours(atual.getHours() + 2); 
    }

    return horarios;
}


carregarConsultorios();
