import { apiConfig } from "./api-config.js"
import dayjs from "dayjs" // 1. Importar a biblioteca dayjs

// 2. Receber 'date' como parâmetro
export async function scheduleFetchAll(date) { 
    try {
        // Fazer a requisição dos dados do banco de dados (API)
        const response = await fetch(`${apiConfig.baseUrl}/agendamentos`)
        // Converte para json
        const data = await response.json()

        
        //Filtra os agendamentos pelo dia selecionado
        const dailySchedules = data.filter((schedule) => 
            dayjs(date).isSame(schedule.when, "day")
        )

        return dailySchedules
        
        // 3. Remover o 'return data' que nunca seria alcançado
        
    } catch (error) {
        console.log(error)
        alert("Não foi possivel buscar os agendamentos do dia selecionado")
    }
}
