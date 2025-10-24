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
    
    // --- CORREÇÃO ---
    // Verifica se a API retornou um objeto (como { agendamentos: [...] })
    // Se sim, retorna APENAS o array 'agendamentos' de dentro dele.
    if (data && data.agendamentos && Array.isArray(data.agendamentos)) {
        return data.agendamentos;
    }
    
    // Se a API já retornou um array, retorna o array.
    return data; 

  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    alert("Não foi possível buscar os agendamentos do servidor.");
    // Mantém o retorno 'null' para o fallback funcionar
    return null; 
  }
}
