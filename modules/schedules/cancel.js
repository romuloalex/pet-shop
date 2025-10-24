import { apiConfig } from "./api-config.js"

export async function scheduleCancel ({ id }) {
    try {
        // MUDANÇA 1: Removido /${id} da URL
        const response = await fetch(`${apiConfig.baseUrl}/agendamentos`, { 
            method: "DELETE",
            // MUDANÇA 2: Adicionado headers e body para enviar o ID
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }) 
        })

        if(!response.ok) {
            let errorData = {}
            try {
                errorData = await response.json();
            } catch (jsonError) {
                console.warn("Não foi possível parsear o JSON de erro da API:", jsonError);
                errorData.message = `Erro ${response.status}: ${response.statusText || "Resposta inesperada do servidor."}`;
            }
            return { success: false, message: errorData.message || "Erro desconhecido ao cancelar agendamento." };
        }
        
        // Se a resposta for OK, tenta ler o JSON de sucesso
        const resultData = await response.json();
        return { success: true, message: resultData.message || "Agendamento cancelado com sucesso!" };

    } catch (error) {
        console.error("Erro capturado em scheduleCancel:", error)
        return { success: false, message: error.message || "Não foi possível conectar ao servidor. Verifique sua conexão." }
    }
}
