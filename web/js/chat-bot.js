function toggleChat() {
    const chat = document.getElementById("chat-popup");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function responderChat(opcao) {
    const chatBody = document.getElementById("chat-body");
    const options = document.getElementById("chat-options");
    const backContainer = document.getElementById("chat-back-container");

    // Esconde as opções e mostra o botão de voltar
    options.style.display = "none";
    backContainer.style.display = "block";

    // Limpa o corpo do chat
    chatBody.innerHTML = "";

    let pergunta = '';
    let resposta = '';

    switch (opcao) {
        case 'agendar':
            pergunta = 'Quero marcar uma consulta.';
            resposta = 'Para agendar uma consulta o senhor(a) pode seguir o passo a passo: 1 - Clicar em ver consultórios; 2 - Ver as clínicas disponíveis; 3 - Selecionar a clínica e clicar em marcar consulta; 4 - Pronto, sua consulta está marcada!';
            break;
        case 'sobre':
            pergunta = 'Sobre nossa plataforma';
            resposta = 'Somos uma plataforma com o objetivo de facilitar a vida dos consultórios e pacientes. Hospedamos sua clínica online e fornecemos um sistema de agendamento e gerenciamento de consultas.';
            break;
        case 'endereco':
            pergunta = 'Onde ficam as clínicas?';
            resposta = 'No momento hospedamos apenas clínicas online, que ainda não possuem endereço físico.';
            break;
        case 'contato':
            pergunta = 'Como posso entrar em contato para saber mais da plataforma ou me tornar parceiro?';
            resposta = 'Você pode ligar para (11) 99999-9999 ou enviar um e-mail para contato@doctorlink.com.';
            break;
    }

    // Adiciona a pergunta e resposta ao chat
    chatBody.innerHTML += `<p><strong>Você:</strong> ${pergunta}</p>`;
    chatBody.innerHTML += `<p><strong>Bot:</strong> ${resposta}</p>`;

    chatBody.scrollTop = chatBody.scrollHeight;
}

function voltarMenu() {
    const chatBody = document.getElementById("chat-body");
    const options = document.getElementById("chat-options");
    const backContainer = document.getElementById("chat-back-container");

    // Volta pro estado inicial: mostra mensagem inicial e os botões
    chatBody.innerHTML = `
        <p><strong>Bot:</strong> Olá! Como posso ajudar?</p>
    `;

    options.style.display = "flex"; // Alterado para flex para usar flex-direction
    options.style.flexDirection = "column"; // Adicionado para exibir em coluna
    options.style.gap = "10px"; // Adicionado para espaçamento entre os botões
    backContainer.style.display = "none";
}
