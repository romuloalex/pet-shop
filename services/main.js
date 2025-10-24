import { apiConfig } from './api-config.js';

export async function buscarAgendamentos() {
  try {
    // --- ADICIONE ESTAS OPÇÕES DE CACHE ---
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    // ----------------------------------------

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Agendamentos recebidos (fallback):", data);

    if (data && data.agendamentos && Array.isArray(data.agendamentos)) {
        return data.agendamentos;
    }
    if (Array.isArray(data)) {
        return data;
    }

    console.warn("Resposta do fallback não é um array:", data);
    return null; 

  } catch (error) {
    console.error("Não foi possível buscar os agendamentos:", error);
    return null;
  }
}
