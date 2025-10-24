import dayjs from "dayjs"
import { scheduleFetchAll } from "../../services/schedule-fetchbyday.js"
import { buscarAgendamentos } from "../../services/main.js"
import { hoursLoad } from "../forms/hours-load.js"
import { scheduleShow } from "./show.js"

// Seleciona o input de data do filtro e do modal
const dateFilter = document.getElementById("datePicker")
const dateForm = document.getElementById("datePickerForm")

// Cache de Estado
let allSchedulesCache = []

// Atualiza horas do modal
export function updateModalHours() {
    const dateForModalHours = dateForm.value || dayjs().format("YYYY-MM-DD")
    hoursLoad({ date: dateForModalHours, allSchedules: allSchedulesCache })
}

// Função Principal
export async function schedulesDay() {

    // Lógica de Fallback
    allSchedulesCache = await scheduleFetchAll()
    if (!allSchedulesCache) {
        console.log("Tentando método alternativo de busca...")
        allSchedulesCache = await buscarAgendamentos()
    }
    if (!allSchedulesCache) {
        allSchedulesCache = []
        console.warn("Não foi possível carregar agendamentos")
    }

    // --- CORREÇÃO DO FILTRO DE TIMEZONE ---
    const dateToFilterDisplay = dateFilter.value || dayjs().format("YYYY-MM-DD")
    
    const dailySchedulesForDisplay = allSchedulesCache.filter((schedule) => {
        // Formata a data do agendamento (do JSON) para "YYYY-MM-DD"
        const scheduleDate = dayjs(schedule.when).format("YYYY-MM-DD")
        
        // Compara a data do agendamento com a data do filtro
        return scheduleDate === dateToFilterDisplay
    })
    // --- FIM DA CORREÇÃO ---

    // Exibir os agendamentos na página principal
    scheduleShow({ dailySchedules: dailySchedulesForDisplay })

    // Rendenriza as horas disponíveis no SELECT
    updateModalHours()
}
