import { schedulesDay } from "./load-schedules.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"

const confirmDeleteModalElement = document.getElementById("confirmDeleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const resultDeleteModalElement = document.getElementById("resultDeleteModal");
const deleteResultAlert = document.getElementById("deleteResultAlert");
const deleteResultIcon = document.getElementById("deleteResultIcon");
const deleteResultMessage = document.getElementById("deleteResultMessage")

// Variáveis para as instâncias dos modais do Bootstrap
let confirmDeleteModalInstance;
let resultDeleteModalInstance;

// Variável para armazenar o ID do agendamento temporariamente
let currentScheduleIdToDelete = null;

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar instâncias dos novos modais do Bootstrap
    if (confirmDeleteModalElement) {
        confirmDeleteModalInstance = new bootstrap.Modal(confirmDeleteModalElement);
    }
    if (resultDeleteModalElement) {
        resultDeleteModalInstance = new bootstrap.Modal(resultDeleteModalElement);
    }

    const periods = document.querySelectorAll(".period")

    periods.forEach((period) => {
        //Capturar o evento de clique na lista
        period.addEventListener("click", (event) => {
            if(event.target.classList.contains("remove-schedule")) {
                event.preventDefault()
    
                const listItem = event.target.closest("li")
                const { id } = listItem.dataset
    
                if(id) {
                    // Armazena o ID temporariamente
                    currentScheduleIdToDelete = id
                    // Abre o modal de confirmação
                    if(confirmDeleteModalInstance) {
                        confirmDeleteModalInstance.show()
                    } else {
                        console.error("Instância do modal de confirmação não encontrada.")
                    }
                } else {
                    console.warn("ID do agendamento não encontrado no botão de remoção.", removeButton)
                }
    
    
    
    
                /*
                event.preventDefault()
                // Obtem a li pai do elemento clicado
                const item = event.target.closest("li")
                //Obtem o id do agendamento
                const { id } = item.dataset
                
                // Confirma que o id é do agendamento
                if(id) {
                    //Confirma se o usuário quer cancelar o agendamento
                    const isConfirm = confirm("Tem certeza que quer cancelar este agendamento?")
    
                    if(isConfirm) {
                        // Faz a requisição na API para cancelar
                        await scheduleCancel({ id })
    
                        //Recarrega a lista de agendamentos
                        schedulesDay()
                    }
                }
    
                */
            }
        })
    
    })
    // --- Listener para o botão "Excluir" dentro do Modal de Confirmação ---
    if(confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", async () => {
            // Verifica se há um ID para deletar
            if(currentScheduleIdToDelete) {
                // Esconde o modal de confirmação
                confirmDeleteModalInstance.hide()
            }

            try {
                const result = await scheduleCancel({ id: currentScheduleIdToDelete })

                if(result.success) {
                    // Exibe Modal de Resultado - SUCESSO
                    if(deleteResultAlert && deleteResultIcon && deleteResultMessage) {
                        deleteResultAlert.classList.remove("alert-danger", "alert-warning");
                        deleteResultAlert.classList.add("alert-success");
                        deleteResultIcon.classList.remove("bi-exclamation-triangle-fill", "bi-x-circle-fill");
                        deleteResultIcon.classList.add("bi-check-circle-fill");
                        deleteResultMessage.textContent = result.message;
                    }
                    // Mostra o modal de sucesso
                    if(resultDeleteModalInstance) {
                        resultDeleteModalInstance.show()
                    }
                    // Recarrega todos os agendamentos
                    await schedulesDay()

                } else {
                    // Exibir Modal de Resultado - Erro
                    if (deleteResultAlert && deleteResultIcon && deleteResultMessage) {
                        deleteResultAlert.classList.remove("alert-success", "alert-warning");
                        deleteResultAlert.classList.add("alert-danger");
                        deleteResultIcon.classList.remove("bi-check-circle-fill", "bi-exclamation-triangle-fill");
                        deleteResultIcon.classList.add("bi-x-circle-fill");
                        deleteResultMessage.textContent = result.message;
                    }
                    // Mostra o modal de erro
                    if (resultDeleteModalInstance) {
                        resultDeleteModalInstance.show();
                    }
                }
            } catch (error) {
                console.log(error)
                alert("Ocorreu um erro inesperado ao tentar remover o agendamento.")
                
            } finally {
                // Limpa o ID após a tentativa
                currentScheduleIdToDelete = null
            }
        })
    }

    // --- Limpar o ID temporário quando o modal de confirmação for fechado sem exclusão ---
    if(confirmDeleteModalElement) {
        confirmDeleteModalElement.addEventListener("hidden.bs.modal", function() {
            currentScheduleIdToDelete = null
        })
    }
})