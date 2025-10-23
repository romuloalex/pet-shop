import { apiConfig } from "./api-config.js"

export async function scheduleCancel ({ id }) {
    try {
        const response = await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
            method: "DELETE",
        })

        if(!response.ok) {
            // Objeto para armazenar dados do erro
            let errorData = {}
            try {
                errorData = await response.json();
            } catch (jsonError) {
                console.warn("Não foi possível parsear o JSON de erro da API:", jsonError);
                errorData.message = `Erro ${response.status}: ${response.statusText || "Resposta inesperada do servidor."}`;
            }
            return { success: false, message: errorData.message || "Erro desconhecido ao cancelar agendamento." };
        }
        return { success: true, message: "Agendamento cancelado com sucesso!" };

    } catch (error) {
        console.error("Erro capturado em scheduleCancel:", error)

        return { success: false, message: error.message || "Não foi possível conectar ao servidor. Verifique sua conexão." }
    }
}