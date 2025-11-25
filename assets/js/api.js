/* ============================================
   ZATAN - API Communication
   Comunicação com o backend
   ============================================ */

// URL base da API - detecta automaticamente o ambiente
const API_BASE_URL = (() => {
  // Em produção, usa URL relativa. Em desenvolvimento, pode usar localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  return '/api';
})();

/**
 * Faz uma requisição HTTP para a API
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, finalOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `Erro HTTP: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('Erro na requisição API:', error);
    throw error;
  }
}

/**
 * Envia formulário de contato
 */
async function submitContact(formData) {
  try {
    const data = await apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify({
        nome: formData.get('nome'),
        email: formData.get('email'),
        tipo: formData.get('tipo'),
        mensagem: formData.get('mensagem'),
      }),
    });
    
    return {
      success: true,
      message: data.message || 'Mensagem enviada com sucesso!',
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Erro ao enviar mensagem. Tente novamente.',
    };
  }
}

/**
 * Salva resultado do quiz
 */
async function saveQuizResult(quizData) {
  try {
    const data = await apiRequest('/quiz/result', {
      method: 'POST',
      body: JSON.stringify({
        score: quizData.score,
        total_questions: quizData.total_questions,
        percentage: quizData.percentage,
        nome: quizData.nome || null,
        email: quizData.email || null,
        answers: quizData.answers || [],
      }),
    });
    
    return {
      success: true,
      message: data.message || 'Resultado salvo com sucesso!',
      data: data.data,
    };
  } catch (error) {
    console.error('Erro ao salvar resultado do quiz:', error);
    // Não retornar erro, apenas logar - o quiz pode funcionar offline
    return {
      success: false,
      message: 'Resultado não foi salvo, mas o quiz foi concluído!',
    };
  }
}

/**
 * Obtém lista de zonas
 */
async function getZones() {
  try {
    const data = await apiRequest('/zones');
    return {
      success: true,
      zones: data.data || [],
    };
  } catch (error) {
    console.error('Erro ao obter zonas:', error);
    return {
      success: false,
      zones: [],
    };
  }
}

/**
 * Obtém estatísticas do quiz
 */
async function getQuizStatistics() {
  try {
    const data = await apiRequest('/quiz/statistics');
    return {
      success: true,
      statistics: data.statistics || {},
    };
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return {
      success: false,
      statistics: null,
    };
  }
}

/**
 * Verifica se a API está online
 */
async function checkAPIHealth() {
  try {
    const data = await apiRequest('/health');
    return {
      online: true,
      message: data.message || 'API online',
    };
  } catch (error) {
    return {
      online: false,
      message: 'API offline',
    };
  }
}

// Exportar funções globais
window.ZATAN_API = {
  submitContact,
  saveQuizResult,
  getZones,
  getQuizStatistics,
  checkAPIHealth,
  API_BASE_URL,
};



