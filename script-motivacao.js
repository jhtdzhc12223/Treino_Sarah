// script-motivacao.js - Sara
document.addEventListener('DOMContentLoaded', function() {
    console.log('💫 Página de motivação da Sara carregada! 🌷');
    
    // Inicializar contadores
    atualizarContadores();
    
    // Carregar frase do dia
    carregarFraseDoDia();
    
    // Efeitos especiais
    iniciarEfeitosEspeciais();
    
    // Ouvir atualizações de progresso
    window.addEventListener('progressoAtualizado', function() {
        atualizarContadores();
    });
});

// Frases motivacionais personalizadas para Sara
const frasesMotivacionais = [
    "Como a tulipa que rompe a terra em busca do sol, sua força está florescendo a cada treino.",
    "O lírio representa pureza e renovação. Cada exercício é uma renovação do seu compromisso consigo mesma.",
    "A dor na lombar hoje é o sinal de que seu corpo está pedindo fortalecimento, e você está respondendo.",
    "Você não está apenas levantando pesos, está construindo um trono. Cada glúteo fortalecido é um degrau.",
    "O preto é a cor da força silenciosa, da elegância que não precisa gritar. É assim que você está construindo seu corpo.",
    "O vermelho discreto representa a paixão pelos seus objetivos, mas também o cuidado para não se machucar.",
    "O rosa é a lembrança de que você pode ser forte sem perder a delicadeza.",
    "Sua amiga que teve o mesmo problema entende: no começo é difícil, mas cada treino fortalece a região.",
    "Glúteo forte protege sua lombar, pernas fortes sustentam seu corpo, braços afinados são a expressão da sua dedicação.",
    "Respeite seus limites, mas nunca duvide da sua capacidade de superação.",
    "Cada coice na máquina, cada abdutora, cada step-up está construindo a proteção que sua lombar merece.",
    "A elegância virá com a prática. Seu corpo está aprendendo novos padrões de movimento.",
    "Como a tulipa que floresce na terra mais escura, sua força está nascendo nos treinos mais desafiadores.",
    "O cuidado que você tem hoje com sua lombar é o investimento mais valioso para o futuro.",
    "Você é mais forte do que qualquer dor, mais determinada do que qualquer obstáculo."
];

function novaFrase() {
    const fraseElement = document.getElementById('fraseAtual');
    if (!fraseElement) return;
    
    const fraseAtual = fraseElement.textContent;
    let novaFrase;
    
    // Garantir que a nova frase seja diferente da atual
    do {
        novaFrase = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
    } while (novaFrase === fraseAtual && frasesMotivacionais.length > 1);
    
    // Efeito de transição
    fraseElement.style.opacity = '0';
    fraseElement.style.transform = 'translateY(20px)';
    fraseElement.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        fraseElement.textContent = novaFrase;
        fraseElement.style.opacity = '1';
        fraseElement.style.transform = 'translateY(0)';
        
        // Salvar no localStorage
        localStorage.setItem('ultimaFraseMotivacionalSara', novaFrase);
        localStorage.setItem('timestampFraseSara', new Date().getTime());
    }, 300);
}

function carregarFraseDoDia() {
    const fraseElement = document.getElementById('fraseAtual');
    if (!fraseElement) return;
    
    const ultimaFrase = localStorage.getItem('ultimaFraseMotivacionalSara');
    const timestamp = localStorage.getItem('timestampFraseSara');
    const agora = new Date().getTime();
    const umDia = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    
    // Se não tem frase salva ou passou mais de um dia, pega uma nova
    if (!ultimaFrase || !timestamp || (agora - timestamp > umDia)) {
        novaFrase();
    } else {
        fraseElement.textContent = ultimaFrase;
    }
}

function atualizarContadores() {
    // Recuperar dados do localStorage
    const progresso = JSON.parse(localStorage.getItem('treinoSaraProgress') || '{}');
    
    // Calcular totais
    let totalExerciciosCompletos = 0;
    let diasComTreino = new Set();
    let totalExerciciosExistentes = 0;
    
    // Contar exercícios totais na página
    document.querySelectorAll('.exercicio').forEach(() => {
        totalExerciciosExistentes++;
    });
    
    Object.keys(progresso).forEach(diaId => {
        const exerciciosCompletos = progresso[diaId] || [];
        totalExerciciosCompletos += exerciciosCompletos.length;
        if (exerciciosCompletos.length > 0) {
            diasComTreino.add(diaId);
        }
    });
    
    // Calcular metas alcançadas (considerando 70% dos exercícios completos como meta)
    const metasAlcancadas = totalExerciciosExistentes > 0 
        ? Math.floor((totalExerciciosCompletos / totalExerciciosExistentes) * 10) 
        : 0;
    
    // Atualizar display
    const diasElement = document.getElementById('diasTreino');
    const exerciciosElement = document.getElementById('exerciciosCompletos');
    const metasElement = document.getElementById('metasAlcancadas');
    
    if (diasElement) diasElement.textContent = diasComTreino.size;
    if (exerciciosElement) exerciciosElement.textContent = totalExerciciosCompletos;
    if (metasElement) metasElement.textContent = Math.max(0, metasAlcancadas);
}

function iniciarEfeitosEspeciais() {
    // Efeito de aparecimento sequencial nos cards
    const cards = document.querySelectorAll('.motivacao-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Efeito de brilho nas flores
    const flores = document.querySelectorAll('.motivacao-flower');
    flores.forEach((flor, index) => {
        flor.style.animationDelay = `${index * 0.3}s`;
    });
}

// Atualizar contadores periodicamente
setInterval(atualizarContadores, 10000);