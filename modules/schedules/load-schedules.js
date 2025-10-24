import dayjs from "dayjs"
import { scheduleFetchAll } from "../../services/schedule-fetchbyday.js"
import { buscarAgendamentos } from "../../services/main.js"
import { hoursLoad } from "../forms/hours-load.js"
import { scheduleShow } from "./show.js"

// Seleciona o input de data do filtro e do modal
const dateFilter = document.getElementById("datePicker")
const dateForm = document.getElementById("datePickerForm")

export async function schedulesDay() {

    // A data para exibir na página principal é sempre do filtro ou a atual
    const dateToFilterDisplay = dateFilter.value || dayjs().format("YYYY-MM-DD")

  // Em: pet-shop/modules/schedules/load-schedules.js

    let allSchedules = await scheduleFetchAll()
     
    // Se o método principal FALHAR (null/undefined), tentar com o método alternativo
    if (!allSchedules) { // <--- CORREÇÃO AQUI
        console.log("Tentando método alternativo de busca...")
        allSchedules = await buscarAgendamentos()
    }
    
    // Se ainda não conseguiu buscar dados, usar array vazio
    if (!allSchedules) {
        allSchedules = []
        console.warn("Não foi possível carregar agendamentos")
    }

    //Filtra os agendamentos para exibição na página principal
    const dailySchedulesForDisplay = allSchedules.filter((schedule) => 
        dayjs(dateToFilterDisplay).isSame(schedule.when, "day")
    )

    //Exibir os agendamentos na página principal
    scheduleShow({ dailySchedules: dailySchedulesForDisplay })

    // Rendenriza as horas disponíveis no SELECT do form do MODAL
    const dateForModalHours = dateForm.value || dayjs().format("YYYY-MM-DD")
    hoursLoad({ date: dateForModalHours, allSchedules: allSchedules })
}
