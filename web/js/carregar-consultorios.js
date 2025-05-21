if (!localStorage.getItem("userId")) {
    alert("Você não está logado. Redirecionando para a página de login.");
    window.location.href = "/web/pages/login-page.html";
}

const horariosDisponiveis = [
    { inicio: "13:30", fim: "14:00" },
    { inicio: "16:00", fim: "16:30" },
    { inicio: "18:15", fim: "18:45" },
    { inicio: "20:00", fim: "20:30" }
];

let idConsultorioSelecionado = null;

const carregarConsultorios = async () => {
    const response = await fetch("http://localhost:8080/doctor");
    const data = await response.json();

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

    const tabela = document.getElementById("tabela-horarios");
    tabela.innerHTML = "";

    horariosDisponiveis.forEach((h, index) => {
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

carregarConsultorios();
