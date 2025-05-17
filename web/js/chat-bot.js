function toggleChat() {
    const chat = document.getElementById("chat-popup");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
  }

  function responderChat(opcao) {
    const chatBody = document.getElementById("chat-body");
    const options = document.getElementById("chat-options");

    let pergunta = '';
    let resposta = '';

    switch (opcao) {
      case 'agendar':
        pergunta = 'Quero marcar uma consulta.';
        resposta = 'Para agendar, entre em contato pelo telefone (11) 99999-9999 ou clique em "Marcar Consulta" no menu.';
        break;
      case 'sobre':
        pergunta = 'Gostaria de saber mais sobre a clinica';
        resposta = 'nossa clinica começou em um fundo de quintal e hoje decidimos inovar para web consulta certo ';
        break;
      case 'endereco':
        pergunta = 'Onde fica a clínica?';
        resposta = 'A clinica ela nao fica em ninguem lugar né, porque ela é online, duurrr';
        break;
      case 'contato':
        pergunta = 'Como posso entrar em contato?';
        resposta = 'Você pode nos ligar no (11) 99999-9999 ou enviar um e-mail para contato@clinicavida.com.';
        break;
    }

    // Adiciona pergunta
    const userMsg = document.createElement("p");
    userMsg.innerHTML = `<strong>Você:</strong> ${pergunta}`;
    chatBody.appendChild(userMsg);

    // Adiciona resposta
    const botMsg = document.createElement("p");
    botMsg.innerHTML = `<strong>Bot:</strong> ${resposta}`;
    chatBody.appendChild(botMsg);

    chatBody.scrollTop = chatBody.scrollHeight;
  }