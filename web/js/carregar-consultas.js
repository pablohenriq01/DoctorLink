
if (!localStorage.getItem("userId")) {
    alert("Você não está logado. Redirecionando para a página de login.");
    window.location.href = "/web/pages/login-page.html"; 
}

const carregarConsultas = async () => {
    const userId = localStorage.getItem("userId");
    const typeUser = localStorage.getItem("typeUser");

    console.log(typeUser)
    if(typeUser == "1"){
        const response = await fetch(`http://localhost:8080/appointments/patient/${userId}`);
        
        const consultas = await response.json();

        const container = document.getElementById("consultas-container");
        container.innerHTML = ""; 

        if (!Array.isArray(consultas) || consultas.length === 0) {
            container.innerHTML = "<p>Nenhuma consulta marcada.</p>";
            return;
        }

        consultas.forEach(consulta => {
            const div = document.createElement("div");
            div.className = "consulta-card";
            div.innerHTML = `
                <h3>Consulta em : ${consulta.consultancy.nameConsultancy}</h3>
                <p><strong>Email do consultório:</strong> ${consulta.consultancy.user.email}</p>
                <p><strong>Especialidade:</strong> ${consulta.consultancy.specialty}</p>
                <hr>
                <p><strong>Paciente:</strong> ${consulta.patient.name}</p>
                <p><strong>Telefone:</strong> ${consulta.patient.telephone}</p>
                <p><strong>Data de nascimento:</strong> ${consulta.patient.dateBirth}
                <hr>
                <p><strong>Data da consulta:</strong> ${consulta.date}</p>
                <p><strong>Status da consulta:</strong> ${consulta.status}</p>
                
            `;
            if (consulta.status === "Marcado") {div.innerHTML +=`
                <hr>
                <button class="btn-consulta" id="cancelamento" onclick="cancelarConsulta('${consulta.id}')">❌ Cancelar Consulta</button>`
            }
            container.appendChild(div);
        });

    } else if(typeUser === "2"){
        const response = await fetch(`http://localhost:8080/appointments/consultancy/${userId}`);
        
        const consultas = await response.json();

        const container = document.getElementById("consultas-container");
        container.innerHTML = "";

        if (!Array.isArray(consultas) || consultas.length === 0) {
            container.innerHTML = "<p>Nenhuma consulta marcada.</p>";
            return;
        }
        
            consultas.forEach(consulta => {
                const div = document.createElement("div");
                div.className = "consulta-card";
                div.innerHTML = `
                    <h3>Consulta com : ${consulta.patient.name}</h3> 
                    <p><strong>Email do paciente:</strong> ${consulta.patient.user.email}</p>
                    <p><strong>Telefone:</strong> ${consulta.patient.telephone}</p>
                    <hr>
                    <p><strong>Data da consulta:</strong> ${consulta.date}</p>
                    <p><strong>Status da consulta:</strong> ${consulta.status}</p>`
                    
                if (consulta.status === "Marcado") { div.innerHTML +=
                    `<hr>
                    <button class="btn-consulta" id="cancelamento" onclick="cancelarConsulta('${consulta.id}')">❌ Cancelar Consulta</button>
                    <button class="btn-consulta" id="finalizacao" onclick="finalizarConsulta('${consulta.id}')">✅ Finalizar Consulta</button>`;
                }
                container.appendChild(div);
            });
        
    }
};

const cancelarConsulta = async (id) => {
    confirmacao = confirm("Você tem certeza que deseja cancelar esta consulta?");
    if (!confirmacao) {
        return;
    }
    const response = await fetch(`http://localhost:8080/appointments/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.status === 200) {
        alert("Consulta cancelada com sucesso!");
        window.location.reload();
    } 
    
}

const finalizarConsulta = async (id) => {
    confirmacao = confirm("Você tem certeza que deseja finalizar esta consulta?");
    if (!confirmacao) {
        return;
    }
    const response = await fetch(`http://localhost:8080/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            status: "Finalizado"
        })
    });
    if (response.status === 200) {
        alert("Consulta finalizada com sucesso!");
        window.location.reload();
    } 
}

document.addEventListener("DOMContentLoaded", carregarConsultas);
