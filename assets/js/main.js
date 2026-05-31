document.addEventListener("DOMContentLoaded", () => {

    // Page glow cursor effect
    const pageGlow = document.querySelector('.page-glow');

        document.addEventListener('mousemove', event => {
            pageGlow.style.left = `${event.clientX}px`;
            pageGlow.style.top = `${event.clientY}px`;
            pageGlow.style.opacity = '1';
        });

        document.addEventListener('mouseout', event => {
            if (!event.relatedTarget) {
                pageGlow.style.opacity = '0';
            }
        });
    
    
    // Mobile navigation toggle logic
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
        
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
            menuToggle.textContent = mainNav.classList.contains("open") ? "✕" : "☰";
        });
    }

    
    // CAPS information switcher
    const displayBox = document.getElementById("caps-display");
    const listItems = document.querySelectorAll(".list-item");

    const dadosCaps = {
        passo1: `<h3>Acolhimento de Demanda Espontânea</h3>
                 <p>Os Centros de Atenção Psicossocial operam sob a lógica do acolhimento imediato e universal. Isso significa que qualquer cidadão que esteja enfrentando sofrimento mental severo, persistente ou decorrente do uso de substâncias químicas pode se dirigir diretamente ao local, sem necessidade de encaminhamento prévio ou agendamento de consultas.</p>`,
        passo2: `<h3>Documentação para Prontuário SUS</h3>
                 <p>Embora nenhuma situação de emergência aguda ou crise seja negligenciada por questões burocráticas, para a estruturação do seu acompanhamento continuado é ideal portar: Documento de identidade oficial com foto (RG ou CNH), Cartão Nacional do SUS atualizado e um comprovante de residência legível impresso.</p>`,
        passo3: `<h3>O Projeto Terapêutico Singular (PTS)</h3>
                 <p>A grande chave do CAPS é o PTS. Trata-se de um plano de metas e ações terapêuticas desenhado de forma colaborativa entre o paciente e uma equipe transdisciplinar (composta por assistentes sociais, psicólogos, terapeutas ocupacionais e médicos psiquiatras), visando a autonomia e reinserção social integral.</p>`
    };

    if (listItems.length > 0 && displayBox) {
        
        displayBox.innerHTML = dadosCaps["passo1"];

        listItems.forEach(item => {
            item.addEventListener("click", () => {
                
                listItems.forEach(i => i.classList.remove("active"));
                
                item.classList.add("active");

                
                displayBox.style.opacity = "0";
                const target = item.getAttribute("data-target");

                setTimeout(() => {
                    displayBox.innerHTML = dadosCaps[target];
                    displayBox.style.opacity = "1";
                }, 180);
            });
        });
    }

    
    console.log(
        "%c[Mentalis] Sistema modular carregado com sucesso. Arquitetura 100% independente.",
        "color: #61a388; font-weight: bold; font-size: 13px;"
    );
});