
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
        
        <button class="btn-consulta" onclick=marcarConsulta(${consultorio.id})>📅 Marcar Consulta</button>
    `;
    lista.appendChild(div);
    })
}

const marcarConsulta = async (id) => {
    const response = await fetch("http://localhost:8080/appointments", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            patientId: localStorage.getItem("userId"), 
            consultancyId: id.toString(),                         
        })
    });
    console.log(localStorage.getItem("userId"));
    console.log(id.toString());
    const data = await response.json();
    if (response.status === 201) {
        alert("Consulta marcada com sucesso!");
    } else {
        alert("Erro ao marcar consulta: " + data);
    }
}

carregarConsultorios();