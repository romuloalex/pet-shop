import { schedulesDay } from "../schedules/load-schedules.js"

// Selecionar o input de data
const selectedDate = document.getElementById("datePickerForm")

//Recarregar a lista de horários quando o input type date mudar
selectedDate.onchange = () => {
    schedulesDay()
}