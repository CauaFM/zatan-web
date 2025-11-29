/* ============================================
   ZATAN - Quiz System
   Sistema de quiz educativo
   ============================================ */

const quizQuestions = [
  {
    question: 'Você está navegando em uma "Zona Restrita" (marcada em vermelho no mapa). Qual das seguintes atividades é PERMITIDA?',
    options: [
      'Ancoragem e banho de mar.',
      'Apenas trânsito de passagem, sem parar.',
      'Pesca esportiva com linha.',
      'Esportes náuticos motorizados (jet ski).'
    ],
    correct: 1,
    feedback: 'Correto! Zonas Restritas são áreas de preservação máxima. Apenas a passagem inofensiva é permitida para não perturbar o ecossistema sensível.'
  },
  {
    question: 'Em uma "Zona Regulada", qual é a velocidade máxima permitida para embarcações?',
    options: [
      'Velocidade livre, sem restrições.',
      'Até 10 nós.',
      'Até 20 nós.',
      'Apenas navegação à vela.'
    ],
    correct: 1,
    feedback: 'Correto! Zonas Reguladas têm limite de velocidade reduzida (ex: 10 nós) para proteger o ambiente e garantir segurança.'
  },
  {
    question: 'Qual atividade é PROIBIDA em todas as zonas do ZATAN?',
    options: [
      'Navegação recreativa.',
      'Descarte de resíduos no mar.',
      'Banho e natação.',
      'Pesca artesanal.'
    ],
    correct: 1,
    feedback: 'Correto! O descarte de resíduos no mar é proibido em todas as zonas para proteger o meio ambiente marinho.'
  },
  {
    question: 'Em uma "Zona Liberal", você pode:',
    options: [
      'Ancorar sobre recifes de coral.',
      'Realizar pesca conforme legislação vigente.',
      'Navegar sem respeitar normas de segurança.',
      'Descartar lixo no mar.'
    ],
    correct: 1,
    feedback: 'Correto! Zonas Liberais permitem uso geral, mas sempre respeitando as leis marítimas e ambientais vigentes.'
  },
  {
    question: 'Qual é a melhor prática ao encontrar animais marinhos durante a navegação?',
    options: [
      'Aproximar-se para fotografar.',
      'Manter distância segura e não perturbar.',
      'Alimentar os animais.',
      'Tocar nos animais para interação.'
    ],
    correct: 1,
    feedback: 'Correto! É fundamental manter distância segura dos animais marinhos para não causar estresse ou perturbação ao ecossistema.'
  },
  {
    question: 'O que você deve fazer com o lixo gerado durante uma atividade náutica?',
    options: [
      'Descartar no mar, pois se decompõe naturalmente.',
      'Trazer todo o resíduo de volta para terra.',
      'Enterrar na areia da praia.',
      'Queimar o lixo na embarcação.'
    ],
    correct: 1,
    feedback: 'Correto! A prática "Lixo Zero" exige que todo resíduo seja trazido de volta para terra, garantindo a preservação do ambiente marinho.'
  },
  {
    question: 'Em uma Zona Regulada, o mergulho é permitido:',
    options: [
      'Em qualquer local da zona.',
      'Apenas em pontos demarcados.',
      'Apenas para profissionais.',
      'Mergulho é proibido em todas as zonas.'
    ],
    correct: 1,
    feedback: 'Correto! Em Zonas Reguladas, o mergulho é permitido apenas em pontos específicos demarcados para garantir segurança e proteção ambiental.'
  },
  {
    question: 'Qual zona do ZATAN permite pesca esportiva com cotas?',
    options: [
      'Zona Restrita.',
      'Zona Regulada.',
      'Zona Liberal.',
      'Nenhuma zona permite pesca esportiva.'
    ],
    correct: 1,
    feedback: 'Correto! Zonas Reguladas permitem pesca esportiva com cotas estabelecidas para equilibrar uso recreativo e preservação.'
  },
  {
    question: 'Ao navegar próximo a praias e banhistas, você deve:',
    options: [
      'Manter velocidade normal.',
      'Reduzir a velocidade para segurança.',
      'Usar buzina para alertar.',
      'Evitar completamente essas áreas.'
    ],
    correct: 1,
    feedback: 'Correto! É essencial reduzir a velocidade próximo a praias e banhistas para garantir segurança e evitar acidentes.'
  },
  {
    question: 'Pesquisa científica em Zonas Restritas é permitida:',
    options: [
      'Livremente, sem restrições.',
      'Apenas com autorização prévia.',
      'Apenas durante o dia.',
      'Não é permitida em nenhuma circunstância.'
    ],
    correct: 1,
    feedback: 'Correto! Pesquisa científica em Zonas Restritas requer autorização prévia, pois essas áreas são de proteção máxima.'
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function initQuiz() {
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer) return;

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  
  showQuestion();
  updateProgress();
}

function showQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    showResults();
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  const questionElement = document.querySelector('.quiz-question');
  const optionsContainer = document.querySelector('.quiz-options');
  const feedbackElement = document.querySelector('.quiz-feedback');
  const nextButton = document.querySelector('.quiz-next');

  if (!questionElement || !optionsContainer) return;

  // Atualizar pergunta
  const titleElement = questionElement.querySelector('.quiz-question__title');
  if (titleElement) {
    titleElement.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}: ${question.question}`;
  }

  // Limpar opções anteriores
  optionsContainer.innerHTML = '';

  // Criar opções
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('button');
    optionElement.className = 'quiz-option';
    optionElement.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    optionElement.setAttribute('data-index', index);
    
      optionElement.addEventListener('click', () => selectOption(index));
      
      optionsContainer.appendChild(optionElement);
  });

  // Esconder feedback e resetar botão
  if (feedbackElement) {
    feedbackElement.classList.remove('active', 'quiz-feedback--correct', 'quiz-feedback--incorrect');
    feedbackElement.textContent = '';
  }

  if (nextButton) {
    nextButton.style.display = 'none';
    nextButton.disabled = true;
  }
}

function selectOption(selectedIndex) {
  const question = quizQuestions[currentQuestionIndex];
  const options = document.querySelectorAll('.quiz-option');
  const feedbackElement = document.querySelector('.quiz-feedback');
  const nextButton = document.querySelector('.quiz-next');
  let isCorrect = selectedIndex === question.correct;

  // Desabilitar todas as opções
  options.forEach(option => {
    option.disabled = true;
    option.style.cursor = 'not-allowed';
  });

  // Marcar resposta do usuário
  options[selectedIndex].classList.add('selected');

  // Marcar resposta correta
  options[question.correct].classList.add('correct');

  // Se errou, marcar como incorreta
  if (!isCorrect) {
    options[selectedIndex].classList.add('incorrect');
  }

  // Salvar resposta
  userAnswers.push({
    questionIndex: currentQuestionIndex,
    selected: selectedIndex,
    correct: question.correct,
    isCorrect: isCorrect
  });

  // Atualizar pontuação
  if (isCorrect) {
    score++;
  }

  // Mostrar feedback
  if (feedbackElement) {
    feedbackElement.classList.add('active');
    feedbackElement.classList.add(isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect');
    feedbackElement.textContent = isCorrect 
      ? `✓ ${question.feedback}` 
      : `✗ Resposta incorreta. A resposta correta é: ${String.fromCharCode(65 + question.correct)}. ${question.feedback}`;
  }

  // Mostrar botão próximo
  if (nextButton) {
    nextButton.style.display = 'block';
    nextButton.disabled = false;
  }

  updateProgress();
}

function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
  updateProgress();
}

function updateProgress() {
  const progressBar = document.querySelector('.progress-bar__fill');
  const progressText = document.querySelector('.quiz-progress__text');
  
  if (progressBar) {
    const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  if (progressText) {
    progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
  }
}

function showResults() {
  const quizContainer = document.querySelector('.quiz-container');
  const questionElement = document.querySelector('.quiz-question');
  const resultElement = document.querySelector('.quiz-result');

  if (!quizContainer || !resultElement) return;

  // Esconder pergunta
  if (questionElement) {
    questionElement.style.display = 'none';
  }

  // Mostrar resultados
  resultElement.classList.add('active');
  
  const scoreElement = resultElement.querySelector('.quiz-result__score');
  const percentage = Math.round((score / quizQuestions.length) * 100);
  
  if (scoreElement) {
    scoreElement.textContent = `${score}/${quizQuestions.length} (${percentage}%)`;
  }

  const messageElement = resultElement.querySelector('.quiz-result__message');
  if (messageElement) {
    let message = '';
    if (percentage >= 90) {
      message = 'Excelente! Você demonstrou excelente conhecimento sobre o ZATAN!';
    } else if (percentage >= 70) {
      message = 'Muito bom! Você tem um bom entendimento das regras do ZATAN.';
    } else if (percentage >= 50) {
      message = 'Bom! Continue aprendendo sobre o zoneamento e as boas práticas.';
    } else {
      message = 'Continue estudando! Revise as áreas e regras do ZATAN para melhorar seu conhecimento.';
    }
    messageElement.textContent = message;
  }

  // Atualizar barra de progresso
  const progressBar = document.querySelector('.progress-bar__fill');
  if (progressBar) {
    progressBar.style.width = '100%';
  }
}

function restartQuiz() {
  const resultElement = document.querySelector('.quiz-result');
  const questionElement = document.querySelector('.quiz-question');
  
  if (resultElement) {
    resultElement.classList.remove('active');
  }
  
  if (questionElement) {
    questionElement.style.display = 'block';
  }
  
  initQuiz();
}

// Inicializar quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();

  // Botão próximo
  const nextButton = document.querySelector('.quiz-next');
  if (nextButton) {
    nextButton.addEventListener('click', nextQuestion);
  }

  // Botão reiniciar
  const restartButton = document.querySelector('.quiz-restart');
  if (restartButton) {
    restartButton.addEventListener('click', restartQuiz);
  }
});

