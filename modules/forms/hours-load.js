import dayjs from "dayjs"
import { openingHours } from "../../utils/open_hours.js"


export function hoursLoad({ date, allSchedules }) {
    
    const hoursSelect = document.getElementById("hour")
    
    //Limpa as seleções existentes
    hoursSelect.innerHTML = ""

    //Filtrar os agendamentos para a DATA ESPECÍFICA do modal
    const schedulesForSelectedModalDate = allSchedules.filter(schedule => 
        dayjs(date).isSame(schedule.when, "day")
    )

    // Obtem a lista de horários OCUPADOS PARA AQUELA DATA DO MODAL
    const unavailableHours = schedulesForSelectedModalDate.map((schedule) => 
        dayjs(schedule.when).format("HH:mm")
    )

    // Gerar as opções de horário
    openingHours.forEach((hour) => {
        const [ scheduleHour, scheduleMinute ] = hour.split(":")
        const scheduleDateTime = dayjs(date).hour(parseInt(scheduleHour)).minute(parseInt(scheduleMinute))

        //Verifica se a hora agendada esta no passado em relação ao momento atual
        const isPastHourToday = dayjs(date).isSame(dayjs(), "day") && scheduleDateTime.isBefore(dayjs())

        //Verifica se o horário está disponível, não esta ocupado e não esta no passado
        const available = !unavailableHours.includes(hour) && !isPastHourToday

        const option = document.createElement("option")
        option.value = hour
        option.textContent = hour

        if(!available) {
            option.disabled = true
        }

        hoursSelect.appendChild(option)

    })

    
}