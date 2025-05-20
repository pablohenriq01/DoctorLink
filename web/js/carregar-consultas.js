const carregarConsultas = async () => {
    const userId = localStorage.getItem("userId");
    const typeUser = localStorage.getItem("typeUser");

    console.log(typeUser)
    if(typeUser == "1"){
        const response = await fetch(`http://localhost:8080/appointments/patient/${userId}`);
        
        const consultas = await response.json();

        const container = document.getElementById("consultas-container");
        container.innerHTML = ""; // limpar antes de adicionar

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
            `;
            container.appendChild(div);
        });

    } else if(typeUser === "2"){
        const response = await fetch(`http://localhost:8080/appointments/consultancy/${userId}`);
        
        const consultas = await response.json();

        const container = document.getElementById("consultas-container");
        container.innerHTML = "";

        consultas.forEach(consulta => {
            const div = document.createElement("div");
            div.className = "consulta-card";
            div.innerHTML = `
                <h3>Consulta com : ${consulta.patient.name}</h3> 
                
                <p><strong>Telefone:</strong> ${consulta.patient.telephone}</p>
            `;
            container.appendChild(div);
        });

    }
    
    
};

// Chamar ao carregar a página
document.addEventListener("DOMContentLoaded", carregarConsultas);
