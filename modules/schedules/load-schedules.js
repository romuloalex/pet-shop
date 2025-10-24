import dayjs from "dayjs"
import { scheduleFetchAll } from "../../services/schedule-fetchbyday.js"
import { buscarAgendamentos } from "../../services/main.js"
import { hoursLoad } from "../forms/hours-load.js"
import { scheduleShow } from "./show.js"

// Seleciona o input de data do filtro e do modal
const dateFilter = document.getElementById("datePicker")
const dateForm = document.getElementById("datePickerForm")

// --- MELHORIA: Cache de Estado ---
// Armazena os agendamentos localmente para evitar buscas repetidas na API
let allSchedulesCache = []

// --- NOVA FUNÇÃO ---
// Exportada para ser usada pelo 'date-change.js' (do formulário)
// Atualiza APENAS as horas do modal, usando os dados do cache.
export function updateModalHours() {
    const dateForModalHours = dateForm.value || dayjs().format("YYYY-MM-DD")
    
    // Usa o cache, não busca na API
    hoursLoad({ date: dateForModalHours, allSchedules: allSchedulesCache })
}

// --- FUNÇÃO PRINCIPAL (Refatorada) ---
// Agora é responsável por:
// 1. Buscar os dados da API (ou do fallback)
// 2. Salvar os dados no cache
// 3. Atualizar a lista principal E as horas do modal
export async function schedulesDay() {

    // --- CORREÇÃO: Lógica de Fallback ---
    // Tenta o método principal e salva no cache
    allSchedulesCache = await scheduleFetchAll()
    
    // Se o método principal FALHAR (retornar null/undefined), tenta o alternativo
    // CORRIGIDO: Removido '|| allSchedules.length === 0' para não tratar dias vazios como erro
    if (!allSchedulesCache) {
        console.log("Tentando método alternativo de busca...")
        allSchedulesCache = await buscarAgendamentos() // Salva no cache
    }

    // Se ainda não conseguiu buscar dados, usar array vazio (programação defensiva)
    if (!allSchedulesCache) {
        allSchedulesCache = []
        console.warn("Não foi possível carregar agendamentos")
    }

    // --- Lógica original mantida, mas agora usa o CACHE ---

    // --- CORREÇÃO DE FILTRO (Timezone Bug) ---
    // Filtra os agendamentos para exibição na página principal
    const dateToFilterDisplay = dateFilter.value || dayjs().format("YYYY-MM-DD")
    
    const dailySchedulesForDisplay = allSchedulesCache.filter((schedule) => {
        // 1. Pega a data do agendamento (ex: "2025-10-25T01:00:00Z")
        // 2. Formata ela para a string "YYYY-MM-DD" (no fuso local, que é o mesmo do filtro)
        const scheduleDate = dayjs(schedule.when).format("YYYY-MM-DD")
        
        // 3. Compara as strings (ex: "2025-10-25" === "2025-10-25")
        // Isso ignora completamente a hora e o fuso horário.
        return scheduleDate === dateToFilterDisplay
    })
    // --- FIM DA CORREÇÃO ---

    // Exibir os agendamentos na página principal
    scheduleShow({ dailySchedules: dailySchedulesForDisplay })

    // Rendenriza as horas disponíveis no SELECT do form do MODAL
    // (Chamando a nova função interna para usar o cache)
    updateModalHours()
}
