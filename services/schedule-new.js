import { apiConfig } from "./api-config.js"

export async function scheduleNew({ id, name, pet, description, when }) {
    try {
        // Faz a requisição para enviar os dados para o banco (API)
        const response = await fetch(`${apiConfig.baseUrl}/schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, name, pet, description, when })
        })

        if(!response.ok) {
            let errorData = {
                message: "Erro desconhecido ao agendar"
            }
            try {
                errorData = await response.json()
            } catch (jsonError) {
                console.warn("Não foi possível parsear o JSON de erro:", jsonError)
            }
            throw new Error(errorData.message || `Erro do servidor ${response.status}`)
        }
        
        //Requisição bem sucedida, retorna um objeto success
        return {
            success: true,
            message: "Agendamento realizado com sucesso"
        }
        
    } catch (error) {
        console.error("Erro no agendamento (API):", error)
        return {
            success: false,
            message: error.message
            ||
            "Não foi possível agendar. Verifique sua conexão ou tente novamente mais tarde."
        }
    }
} 