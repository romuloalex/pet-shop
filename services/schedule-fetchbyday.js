import { apiConfig } from "./api-config.js";

export async function scheduleFetchAll() {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const data = await response.json();

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
    // Retorna null para que o 'load-schedules.js' tente o fallback
    console.warn("Resposta da API principal não é um array:", data);
    return null; 

  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    alert("Não foi possível buscar os agendamentos do servidor.");
    // Retorna 'null' para acionar o fallback
    return null; 
  }
}
