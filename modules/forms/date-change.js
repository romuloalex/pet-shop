// --- CORREÇÃO: Importa a função específica para não re-buscar dados da API ---
import { updateModalHours } from "../schedules/load-schedules.js"

// Selecionar o input de data
const selectedDate = document.getElementById("datePickerForm")

//Recarregar a lista de horários quando o input type date mudar
selectedDate.onchange = () => {
    // --- CORREÇÃO: Chama apenas a função que atualiza o modal ---
    // Isso usa o cache e não re-renderiza a lista principal da página
    updateModalHours()
}
