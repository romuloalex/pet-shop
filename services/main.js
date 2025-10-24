import { apiConfig } from './api-config.js';

export async function buscarAgendamentos() {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`);

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Agendamentos recebidos (fallback):", data);

    // --- CORREÇÃO REFINADA ---
    
    // Cenário 1: A resposta é um objeto { agendamentos: [...] }
    if (data && data.agendamentos && Array.isArray(data.agendamentos)) {
        return data.agendamentos;
    }
    
    // Cenário 2: A resposta já é o array [...]
    if (Array.isArray(data)) {
        return data;
    }

    // Cenário 3: Resposta é inválida (ex: {}, { "message": "..." })
    // Retorna null para o 'load-schedules.js' saber que o fallback também falhou
    console.warn("Resposta do fallback não é um array:", data);
    return null; 

  } catch (error) {
    console.error("Não foi possível buscar os agendamentos:", error);
    return null;
  }
}
