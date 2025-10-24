import { apiConfig } from './api-config.js';

export async function buscarAgendamentos() {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`, {
      cache: "no-store", // Adicionado o controle de cache aqui também
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Agendamentos recebidos (fallback):", data);

    // --- CORREÇÃO DA CHAVE ---
    // O objeto é { schedules: [...] } e não { agendamentos: [...] }

    // Cenário 1: A resposta é um objeto { schedules: [...] }
    if (data && data.schedules && Array.isArray(data.schedules)) { // <-- Corrigido para 'schedules'
        return data.schedules; // <-- Corrigido para 'schedules'
    }
    
    // Cenário 2: A resposta já é o array [...]
    if (Array.isArray(data)) {
        return data;
    }

    // Cenário 3: Resposta é inválida
    console.warn("Resposta do fallback não é um array:", data);
    return null; 

  } catch (error) {
    console.error("Não foi possível buscar os agendamentos:", error);
    return null;
  }
}
