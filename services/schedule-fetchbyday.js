import dayjs from "dayjs";

export async function scheduleFetchAll(date) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`);
    if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);

    const data = await response.json();

    // Filtra pelo dia selecionado
    const dailySchedules = data.filter(schedule => 
      dayjs(schedule.when).isSame(date, "day")
    );

    return dailySchedules;

  } catch (error) {
    console.error(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado.");
    return [];
  }
}
