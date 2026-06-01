document.addEventListener('DOMContentLoaded', () => {
  // Page glow cursor effect
  const pageGlow = document.querySelector('.page-glow');
  if (pageGlow) {
    document.addEventListener('mousemove', (event) => {
      pageGlow.style.left = `${event.clientX}px`;
      pageGlow.style.top = `${event.clientY}px`;
      pageGlow.style.opacity = '1';
    });
    document.addEventListener('mouseout', (event) => {
      if (!event.relatedTarget) pageGlow.style.opacity = '0';
    });
  }
 
  // CAPS information switcher
  const displayBox = document.getElementById('caps-display');
  const listItems = document.querySelectorAll('.list-item');
  const dadosCaps = {
    passo1: `<h3>Acolhimento de Demanda Espontânea</h3>
                 <p>Os Centros de Atenção Psicossocial operam sob a lógica do acolhimento imediato e universal. Isso significa que qualquer cidadão que esteja enfrentando sofrimento mental severo, persistente ou decorrente do uso de substâncias químicas pode se dirigir diretamente ao local, sem necessidade de encaminhamento prévio ou agendamento de consultas.</p>`,
    passo2: `<h3>Documentação para Prontuário SUS</h3>
                 <p>Embora nenhuma situação de emergência aguda ou crise seja negligenciada por questões burocráticas, para a estruturação do seu acompanhamento continuado é ideal portar: Documento de identidade oficial com foto (RG ou CNH), Cartão Nacional do SUS atualizado e um comprovante de residência legível impresso.</p>`,
    passo3: `<h3>O Projeto Terapêutico Singular (PTS)</h3>
                 <p>A grande chave do CAPS é o PTS. Trata-se de um plano de metas e ações terapêuticas desenhado de forma colaborativa entre o paciente e uma equipe transdisciplinar (composta por assistentes sociais, psicólogos, terapeutas ocupacionais e médicos psiquiatras), visando a autonomia e reinserção social integral.</p>`,
  };
  if (displayBox && listItems.length > 0) {
    displayBox.innerHTML = dadosCaps.passo1;
    listItems.forEach((item) => {
      item.addEventListener('click', () => {
        listItems.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
        displayBox.style.opacity = '0';
        const target = item.getAttribute('data-target');
        setTimeout(() => {
          displayBox.innerHTML = dadosCaps[target];
          displayBox.style.opacity = '1';
        }, 180);
      });
    });
  }
 
  // Fórum de Apoio (migrado de forum.html)
  const forumPosts = document.getElementById('forum-posts');
  const anonymousForm = document.getElementById('anonymous-post-form');
  const responseForm = document.getElementById('professional-response-form');
  const responseAlert = document.getElementById('response-alert');
  const responsePost = document.getElementById('response-post');
  if (anonymousForm && forumPosts && responsePost) {
    anonymousForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('nome-post').value.trim() || 'Anônimo';
      const message = document.getElementById('mensagem-post').value.trim();
      if (!message) return;
      const postId = `post-${Date.now()}`;
      const article = document.createElement('article');
      article.className = 'forum-post';
      article.id = postId;
      article.innerHTML = `
                <div class="post-header">
                    <div>
                        <span class="status-pill">${name}</span>
                        <h3>${message.substring(0, 60)}${message.length > 60 ? '...' : ''}</h3>
                    </div>
                    <span class="post-time">Agora</span>
                </div>
                <p>${message}</p>
                <div class="response-list"></div>
            `;
      forumPosts.prepend(article);
      const option = document.createElement('option');
      option.value = postId;
      option.textContent = message.substring(0, 60) + (message.length > 60 ? '...' : '');
      responsePost.appendChild(option);
      anonymousForm.reset();
    });
  }
  if (responseForm) {
    responseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (responseAlert) responseAlert.textContent = '';
      const selectedPost = document.getElementById(responsePost ? responsePost.value : '');
      const crp = document.getElementById('response-crp') ? document.getElementById('response-crp').value.trim() : '';
      const responseText = document.getElementById('response-text') ? document.getElementById('response-text').value.trim() : '';
      if (!crp || !responseText) {
        if (responseAlert) responseAlert.textContent = 'Informe seu CRP e escreva sua orientação antes de publicar.';
        return;
      }
      const validCrp = /^CRP-\d{2}\/\d{5}$/i.test(crp);
      if (!validCrp) {
        if (responseAlert) responseAlert.textContent = 'Formato de CRP inválido. Use algo como CRP-08/12345.';
        return;
      }
      if (!selectedPost) {
        if (responseAlert) responseAlert.textContent = 'Selecione um relato para responder.';
        return;
      }
      const responseList = selectedPost.querySelector('.response-list') || (() => {
        const div = document.createElement('div');
        div.className = 'response-list';
        selectedPost.appendChild(div);
        return div;
      })();
      const responseCard = document.createElement('div');
      responseCard.className = 'response-card';
      responseCard.innerHTML = `
                <div class="response-meta">
                    <span>Psicólogo credenciado</span>
                    <span>${crp.toUpperCase()}</span>
                </div>
                <p>${responseText}</p>
            `;
      responseList.appendChild(responseCard);
      responseForm.reset();
      if (responseAlert) responseAlert.textContent = 'Orientação publicada com sucesso.';
      setTimeout(() => { if (responseAlert) responseAlert.textContent = ''; }, 4500);
    });
  }
 
  // Atividades (migrado de atividades.html)
  const breathingCircle = document.getElementById('breathing-circle');
  const breathingStep = document.getElementById('breathing-step');
  const breathingButton = document.getElementById('breathing-start');
  const affirmationBox = document.getElementById('affirmation-box');
  const affirmationButton = document.getElementById('affirmation-button');
  const focusList = document.getElementById('focus-list');
  const focusShuffle = document.getElementById('focus-shuffle');
  const affirmations = [
    'Respire fundo e permita-se pausar por um instante.',
    'Você merece cuidado e momentos de tranquilidade.',
    'Observe seu corpo sem julgamento e celebre o presente.',
    'Um passo de cada vez é um progresso verdadeiro.',
  ];
  const focusTasks = [
    'Feche os olhos e tente notar quatro cheiros diferentes.',
    'Toque em uma superfície com as pontas dos dedos e descreva a sensação.',
    'Olhe para fora e identifique três objetos que contenham azul.',
    'Sente-se ereto e conte lentamente até dez, sentindo cada número.',
  ];
  let breathingPhase = 0;
  let breathingInterval = null;
  if (breathingButton) {
    breathingButton.addEventListener('click', () => {
      if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
        if (breathingCircle) breathingCircle.style.transform = 'scale(1)';
        breathingCircle && breathingCircle.classList.remove('active');
        if (breathingStep) breathingStep.textContent = 'Exercício pausado. Pressione novamente para reiniciar.';
        breathingButton.textContent = 'Reiniciar exercício';
        return;
      }
      breathingPhase = 0;
      breathingButton.textContent = 'Parar exercício';
      if (breathingStep) breathingStep.textContent = 'Inspire por 4 segundos...';
      breathingCircle && breathingCircle.classList.add('active');
      breathingInterval = setInterval(() => {
        breathingPhase = (breathingPhase + 1) % 3;
        if (breathingPhase === 0) {
          breathingStep && (breathingStep.textContent = 'Inspire por 4 segundos...');
          breathingCircle && (breathingCircle.style.transform = 'scale(1.1)');
        } else if (breathingPhase === 1) {
          breathingStep && (breathingStep.textContent = 'Segure por 7 segundos...');
          breathingCircle && (breathingCircle.style.transform = 'scale(1.25)');
        } else {
          breathingStep && (breathingStep.textContent = 'Expire por 8 segundos...');
          breathingCircle && (breathingCircle.style.transform = 'scale(0.85)');
        }
      }, 4800);
    });
  }
  if (affirmationButton && affirmationBox) {
    affirmationButton.addEventListener('click', () => {
      const random = affirmations[Math.floor(Math.random() * affirmations.length)];
      affirmationBox.textContent = random;
      affirmationBox.classList.add('affirmation-reveal');
      setTimeout(() => affirmationBox.classList.remove('affirmation-reveal'), 900);
    });
  }
  if (focusShuffle && focusList) {
    focusShuffle.addEventListener('click', () => {
      const shuffled = focusTasks.sort(() => 0.5 - Math.random()).slice(0, 3);
      focusList.innerHTML = shuffled.map((task) => `<li>${task}</li>`).join('');
    });
  }
  console.log("%c[Mentalis] Sistema modular carregado com sucesso. Arquitetura 100% independente.", "color: #61a388; font-weight: bold; font-size: 13px;");
});
 
