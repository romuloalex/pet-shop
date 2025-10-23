import IMask from "imask"

const phoneInput = document.getElementById("phone")

const phoneMask = {
    mask: [
        "(00) 0000-0000",
        '(00) 00000-0000'
    ],
    lazy: false,
}

if(phoneInput) {
    IMask(phoneInput, phoneMask)
}