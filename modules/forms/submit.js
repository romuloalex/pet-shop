import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load-schedules.js"

const modalSchedule = document.getElementById("modalSchedule")
const scheduleSuccess = document.getElementById("scheduleSuccess")
const svgAlert = document.getElementById("svgAlert")
const mensageAlert = document.getElementById("mensage-alert") // <--- 'mensage-alert'

const dateForm = document.getElementById("datePickerForm")
const dateFilter = document.getElementById("datePicker")

const nameInput = document.getElementById("namePerson")
const petInput = document.getElementById("pet")
const descriptionInput = document.getElementById("description")
const phoneInput = document.getElementById("phone")
const hourInput = document.getElementById("hour")

const validationAlert = document.getElementById("validationAlert")

//Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual no date do modal e da página de agendamentos
dateForm.value = inputToday
dateFilter.value = inputToday

// Definir a data mínima do form como sendo a data atual
dateForm.min = inputToday

document.addEventListener("DOMContentLoaded", function() {
    //Carregar agendamentos quando a página carrega pela primeira vez
    if(dateFilter && dateFilter.value) {
        dateFilter.value = dayjs(new Date()).format("YYYY-MM-DD")
    }
    //Carrega os agendamentos para a data inicial que esta selecionada no input da pagina de agendamentos
    schedulesDay()

    // Adicionar event listener ao input de data de FILTRO
    if(dateFilter) {
        dateFilter.addEventListener("change", schedulesDay)
    } else {
        console.warn("Data não encontrada ou inexistente")
    }

    const captureFormBtn = document.getElementById("saveScheduleBtn")

    if(captureFormBtn) {
        captureFormBtn.addEventListener("click", async () => {
            try {
                if(validationAlert) {
                    validationAlert.classList.add("d-none")
                }
                if(scheduleSuccess) {
                    scheduleSuccess.classList.remove("d-flex")
                    scheduleSuccess.classList.add("d-none")
                    scheduleSuccess.classList.add("alert-success")
                    scheduleSuccess.classList.remove("alert-danger")
                }
    
                // Coletar os valores (já fazendo o trim para remover espaços em branco)
                const name = nameInput.value.trim()
                const pet = petInput.value.trim()
                const description = descriptionInput.value.trim()
                const date = dateForm.value
                const hour = hourInput.value
    
                // Realizar a validação manual dos campos obrigatórios
                if(name === "" || pet === "" || description === "" || date === "" || hour === "") {
                    if(validationAlert) {
                        validationAlert.classList.remove("d-none")
                        validationAlert.textContent = "Campos com asterisco são obrigatórios o preenchimento"
                    }
                    return
                }
    
                // Recuperar somente a hora
                const [ hourSelected ] = hour.split(":")
    
                // Inserir a hora na data
                const when = dayjs(dateForm.value).add(hourSelected, "hour")
    
                // Gerar um ID para identificar o agendamento
                const id = new Date().getTime().toString()
    
                const modalInstance = bootstrap.Modal.getInstance(modalSchedule) || new bootstrap.Modal(modalSchedule);
    
                const result = await scheduleNew({
                    id,
                    name,
                    pet,
                    description,
                    when
                })
    
                if(result.success) {
                    //Se a API retornou sucesso
                    if(scheduleSuccess) {
                        scheduleSuccess.classList.remove("d-none")
                        svgAlert.classList.remove("d-none")
                        scheduleSuccess.classList.remove("alert-danger")
                        scheduleSuccess.classList.add("d-flex", "alert-success")
                        mensageAlert.textContent = result.message
                        
    
                        setTimeout(() => {
                            scheduleSuccess.classList.add("d-none")
                            scheduleSuccess.classList.remove("d-flex")
                        }, 5000)
                    }
    
                    // Fechar o modal
                    if(modalInstance) {
                        modalInstance.hide()
                    }

                    // --- ESTA É A LINHA CORRETA QUE VOCÊ JÁ TINHA ---
                    // Recarrega os agendamentos na tela
                    await schedulesDay()
    
                } else {
                    
                    // --- CORREÇÃO NO BLOCO DE ERRO ---
                    if(scheduleSuccess) {
                        scheduleSuccess.classList.remove("d-none")
                        scheduleSuccess.classList.remove("alert-success")
                        scheduleSuccess.classList.add("d-flex", "alert-danger") // Adiciona classe de perigo
                        
                        // CORREÇÃO 1: Mostrar o SVG
                        svgAlert.classList.remove("d-none") 
                        
                        // CORREÇÃO 2: Usar 'mensageAlert' e não 'scheduleSuccess'
                        mensageAlert.textContent = result.message 
                        
                        setTimeout(() => {
                            scheduleSuccess.classList.add("d-none")
                            scheduleSuccess.classList.remove("d-flex", "alert-danger")
                            scheduleSuccess.classList.add("alert-success") // Reseta para o padrão
                        }, 7000)
                    }
    
                    if(modalInstance) {
                        modalInstance.hide()
                    }
                }
                
            } catch (error) {
                alert("Não foi possivel realizar o agendamento")
                console.log(error)
            }
        })

    }

    // Fechamento do modal e limpeza dos inputs
    if(modalSchedule) {
        modalSchedule.addEventListener("hidden.bs.modal", function() {
            nameInput.value = ""
            petInput.value = ""
            descriptionInput.value = ""
            phoneInput.value = ""

            if(validationAlert) {
                validationAlert.classList.add("d-none")
            }

        })
    }
})
