import { apiConfig } from './api-config.js';

export async function buscarAgendamentos() {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`);

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Agendamentos recebidos:", data);

    // --- CORREÇÃO ---
    // Verifica se a API retornou um objeto (como { agendamentos: [...] })
    // Se sim, retorna APENAS o array 'agendamentos' de dentro dele.
    if (data && data.agendamentos && Array.isArray(data.agendamentos)) {
        return data.agendamentos;
    }
    
    // Se a API já retornou um array, retorna o array.
    return data;

  } catch (error) {
    console.error("Não foi possível buscar os agendamentos:", error);
    return null;
  }
}
