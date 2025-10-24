import dayjs from "dayjs"

// Selecionar sessões da manha, tarde e noite
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")


export function scheduleShow({ dailySchedules }) {
    try {
        // Limpa o conteúdo de cada UL de período
        periodMorning.innerHTML = ""
        periodAfternoon.innerHTML = ""
        periodNight.innerHTML = ""

        //Interar sobre cada agendamento recebido da API
        dailySchedules.forEach((schedule) => {
            //Extrai a hora do agendamento para classificação de turno
            const scheduleHour = dayjs(schedule.when).hour()

            // --- CORREÇÃO: Lógica de classificação de turno ---
            // --- CORREÇÃO: Erro de digitação (targelist -> targetList) ---
            let targetList // <-- Corrigido

            // Lógica corrigida para não classificar 8h como "Noite"
            // (Ajuste os horários 12 e 18 se a regra de negócio for diferente)
            if(scheduleHour < 12) { // Manhã: (00:00 - 11:59)
                targetList = periodMorning
            } else if(scheduleHour >= 12 && scheduleHour < 18) { // Tarde: (12:00 - 17:59)
                targetList = periodAfternoon
            } else { // Noite: (18:00 - 23:59)
                targetList = periodNight
            }

            //Criar um elemento LI
            const liElement = document.createElement("li")
            liElement.classList.add("d-flex", "p-3", "align-items-lg-center", "col-12")
            liElement.dataset.id = schedule.id

            //Definir o innerHTML da tag LI com as informações do agendamento
            liElement.innerHTML = `
                        <div class="col-lg-5 col-12 hours-name-group d-flex gap-3 align-items-lg-center">
                            <span class="hours">${dayjs(schedule.when).format("HH:mm")}</span>
                            <p class="name"><span>${schedule.pet}</span> / ${schedule.name}</p>
                        </div>
                        <div class="col-lg-4 col-12 service ms-lg-auto">${schedule.description}</div>
                        <div class="col-lg-3 col-12 remove text-end">
                            <a href="#" class="remove-schedule">Remover agendamento</a>
                        </div>
            `
            
            targetList.appendChild(liElement) // <-- Corrigido
        })

    } catch (error) {
        alert("Não foi possivel exibir os agendamentos")
        console.log(error)
    }
}
