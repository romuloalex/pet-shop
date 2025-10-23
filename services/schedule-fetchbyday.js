// services/schedule-fetchbyday.js
import { apiConfig } from "./api-config.js";
// Você precisará do dayjs se for filtrar aqui
import dayjs from 'dayjs'; 

// A função precisa receber o 'date' para filtrar
export async function scheduleFetchByDay(date) { 
  try {
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`);

    // ADICIONE ISSO: Tratamento de erro HTTP
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const data = await response.json();

    // DESCOMENTE E CORRIJA A LÓGICA DE FILTRO
    const dailySchedules = data.filter((schedule) =>
      dayjs(schedule.when).isSame(date, "day")
    );

    return dailySchedules; // Retorna os dados filtrados

  } catch (error) {
    console.log(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado");
    return null; // Retorne null ou [] em caso de erro
  }
}
