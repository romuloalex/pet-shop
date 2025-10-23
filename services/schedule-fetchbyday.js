import { apiConfig } from "./api-config.js"

export async function scheduleFetchAll() {
    try {
        // Fazer a requisição dos dados do banco de dados (API)
        const response = await fetch(`${apiConfig.baseUrl}/agendamentos`)
        // Converte para json
        const data = await response.json()

        /*
        //Filtra os agendamentos pelo dia selecionado
        const dailySchedules = data.filter((schedule) => 
            dayjs(date).isSame(schedule.when, "day")
        )

        return dailySchedules
        */

        return data
        
    } catch (error) {
        console.log(error)
        alert("Não foi possivel buscar os agendamentos do dia selecionado")
    }
}
