// script.js - Sara
document.addEventListener('DOMContentLoaded', function() {
    console.log('🖤 Site da Sara carregado com sucesso! 🌷');
    
    // Remover tela de carregamento
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Funcionalidade de marcar exercícios como completos
    const exercicios = document.querySelectorAll('.exercicio');
    
    exercicios.forEach(exercicio => {
        exercicio.addEventListener('click', function(e) {
            // Não marcar como completo se clicou no ícone de dica
            if (e.target.classList.contains('dica-icon')) {
                return;
            }
            
            this.classList.toggle('completo');
            salvarProgresso();
            
            // Feedback visual
            if (this.classList.contains('completo')) {
                this.style.transform = 'scale(1.01)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Efeito de confete de tulipa
                const confetti = document.createElement('div');
                confetti.innerHTML = '🌷';
                confetti.style.position = 'absolute';
                confetti.style.fontSize = '1.5rem';
                confetti.style.animation = 'confettiFall 1s ease-out';
                confetti.style.right = '10px';
                confetti.style.top = '0';
                this.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 1000);
            }
        });
    });
    
    // Estilo para confetti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(50px) rotate(180deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Modal para dicas
    const modal = document.getElementById('dicaModal');
    const dicaTexto = document.getElementById('dicaTexto');
    const closeBtn = document.querySelector('.close');
    
    if (modal && dicaTexto && closeBtn) {
        document.querySelectorAll('.dica-icon').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                const dica = this.getAttribute('data-dica');
                dicaTexto.textContent = dica;
                modal.style.display = 'block';
            });
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display ='none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Salvar progresso no localStorage
    function salvarProgresso() {
        const progresso = {};
        document.querySelectorAll('.dia-treino').forEach(dia => {
            const diaId = dia.id;
            const exerciciosCompletos = [];
            dia.querySelectorAll('.exercicio.completo').forEach(ex => {
                const nomeExercicio = ex.querySelector('.nome').textContent.trim();
                exerciciosCompletos.push(nomeExercicio);
            });
            progresso[diaId] = exerciciosCompletos;
        });
        localStorage.setItem('treinoSaraProgress', JSON.stringify(progresso));
        
        // Disparar evento para atualizar motivacao se estiver na página
        window.dispatchEvent(new CustomEvent('progressoAtualizado'));
    }
    
    // Carregar progresso do localStorage
    function carregarProgresso() {
        const progresso = JSON.parse(localStorage.getItem('treinoSaraProgress') || '{}');
        
        Object.keys(progresso).forEach(diaId => {
            const exerciciosCompletos = progresso[diaId];
            const dia = document.getElementById(diaId);
            if (dia) {
                dia.querySelectorAll('.exercicio').forEach(ex => {
                    const nomeExercicio = ex.querySelector('.nome').textContent.trim();
                    if (exerciciosCompletos.includes(nomeExercicio)) {
                        ex.classList.add('completo');
                    }
                });
            }
        });
    }
    
    // Carregar progresso ao iniciar
    carregarProgresso();
    
    // Efeito de digitação no título
    const titulo = document.querySelector('h1');
    if (titulo && !window.location.href.includes('motivacao')) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 80);
    }
    
    // Adicionar tulipas flutuantes (opcional)
    function criarFloresFlutuantes() {
        if (document.querySelectorAll('.floating-flower').length > 0) return;
        
        const flores = ['🌷', '⚜️'];
        for (let i = 0; i < 8; i++) {
            const flor = document.createElement('div');
            flor.innerHTML = flores[Math.floor(Math.random() * flores.length)];
            flor.className = 'floating-flower';
            flor.style.position = 'fixed';
            flor.style.fontSize = Math.random() * 20 + 15 + 'px';
            flor.style.left = Math.random() * 100 + 'vw';
            flor.style.top = Math.random() * 100 + 'vh';
            flor.style.opacity = '0.05';
            flor.style.zIndex = '-1';
            flor.style.pointerEvents = 'none';
            flor.style.animation = `floatFlower ${Math.random() * 20 + 15}s infinite ease-in-out`;
            document.body.appendChild(flor);
        }
    }
    
    // Animação de flutuar para flores
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes floatFlower {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(-5deg); }
            66% { transform: translateY(-5px) rotate(5deg); }
        }
    `;
    document.head.appendChild(floatStyle);
    
    // Criar flores apenas se não estiver no mobile com muitos elementos
    if (window.innerWidth > 768) {
        criarFloresFlutuantes();
    }
    
    // Tooltip alternativo para mobile (opcional)
    if ('ontouchstart' in window) {
        document.querySelectorAll('.dica-icon').forEach(icon => {
            icon.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const dica = this.getAttribute('data-dica');
                alert('💡 Dica: ' + dica);
            });
        });
    }
});