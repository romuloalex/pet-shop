export async function scheduleFetchAll() {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/agendamentos`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    alert("Não foi possível buscar os agendamentos do servidor.");
    return [];
  }
}
