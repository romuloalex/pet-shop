import { createClient } from '@vercel/kv';

// Conecta ao banco de dados KV (as chaves KV_REST_API_URL e KV_REST_API_TOKEN
// são injetadas automaticamente pela Vercel no seu projeto)
const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Este é o nome da "chave" no banco onde vamos guardar a lista de agendamentos
const KEY_SCHEDULES_LIST = 'schedules';

// Handler principal que responde às requisições
export default async function handler(req, res) {
  
  // --- MÉTODO GET (Buscar todos os agendamentos) ---
  // Quando o 'load-schedules.js' chama a API
  if (req.method === 'GET') {
    try {
      // 1. Busca a lista de agendamentos no banco KV
      const data = await kv.get(KEY_SCHEDULES_LIST);
      
      // 2. Se não houver nada, retorna um array vazio
      const schedules = data || []; 
      
      // 3. Retorna o objeto no formato { schedules: [...] }
      //    Isto é para ser 100% compatível com o seu frontend
      //    (que procura por 'data.schedules' nos ficheiros de serviço)
      res.status(200).json({ schedules: schedules });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar dados do banco.' });
    }
  } 
  
  // --- MÉTODO POST (Cadastrar novo agendamento) ---
  // Quando o 'schedule-new.js' chama a API
  else if (req.method === 'POST') {
    try {
      // 1. Pega os dados do novo agendamento (enviados pelo frontend)
      const newSchedule = req.body;

      // 2. Busca a lista ATUAL de agendamentos no banco
      const currentSchedules = await kv.get(KEY_SCHEDULES_LIST) || [];
      
      // 3. Adiciona o novo agendamento à lista
      currentSchedules.push(newSchedule);

      // 4. Salva a lista ATUALIZADA de volta no banco
      await kv.set(KEY_SCHEDULES_LIST, currentSchedules);
      
      // 5. Responde com sucesso
      res.status(201).json({ success: true, message: 'Agendamento criado com sucesso!' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao salvar dados no banco.' });
    }
  } 
  
  // --- Se for qualquer outro método (ex: DELETE, PUT) ---
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Método ${req.method} não permitido.` });
  }
}
