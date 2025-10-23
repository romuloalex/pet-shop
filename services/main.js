// services/main.js
import { apiConfig } from './api-config.js'; // Assumindo que está na mesma pasta

//...
export async function buscarAgendamentos() {
  try {
    // Usa o baseUrl ('/api') + o nome do endpoint ('/agendamentos')
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`);

    //... (o resto do seu código está perfeito)
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    const dados = await response.json();
    console.log("Agendamentos recebidos:", dados);
    return dados;
  } catch (error) {
    console.error("Não foi possível buscar os agendamentos:", error);
    return null;
  }
}
