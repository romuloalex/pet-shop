import { apiConfig } from './api-config.js'; 

//Criar uma função para buscar os dados
export async function buscarAgendamentos() {
  try {
    //Usar a configuração importada para fazer a comunicação
    const response = await fetch(apiConfig.baseUrl); 
    
    //Verificar se o backend respondeu com sucesso
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    //Converter a resposta
    const dados = await response.json();

    //Usar os dados
    console.log("Agendamentos recebidos:", dados);
    return dados;

  } catch (error) {
    console.error("Não foi possível buscar os agendamentos:", error);
    return null;
  }
}
