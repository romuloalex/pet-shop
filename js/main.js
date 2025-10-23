"use strict"

// Configuração do Day.js
import "../libs/day.js"
import "../libs/imask.js"

// importar os arquivos CSS
import "../css/index.css" //tinha que tirar porém tem um endereçamento do icons do bootstrap que não funciona sem esse arquivo
import "../css/reset.css"
import "../css/global.css"
import "../css/utility.css"
import "../css/content.css"

// importar os arquivos JS
import "../modules/forms/submit.js"
import "../modules/page-load.js"
import "../modules/forms/date-change.js"
import "../modules/schedules/cancel.js"

// importar o serviço de busca de agendamentos
import "../services/main.js"

// Calendar
document.addEventListener("DOMContentLoaded", function() {
    const arrowDown = document.querySelector(".bi-chevron-down")
    const dateInput = document.getElementById("datePicker")

    if(arrowDown && dateInput) {
        arrowDown.addEventListener("click", function() {
            dateInput.showPicker()
        })
    }

    const arrowDownForm = document.querySelector(".open-date-picker")
    const dateInputForm = document.getElementById("datePickerForm")

    if(arrowDownForm && dateInputForm) {
        arrowDownForm.addEventListener("click", function() {
            dateInputForm.showPicker()
        })
    }
})

// Focus do Modal
const modalSchedule = document.getElementById("modalSchedule")
const inputModal = document.getElementById("namePerson")
const btnNewSchedule = document.querySelector("#btn-new-schedule .btn-info")

modalSchedule.addEventListener("shown.bs.modal", () => {
    inputModal.focus()
})

modalSchedule.addEventListener("hidden.bs.modal", () => {
    if(btnNewSchedule) {
        btnNewSchedule.focus()
    }
})


