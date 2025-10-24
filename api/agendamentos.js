import { createClient } from '@vercel/kv';

// Conecta ao banco de dados KV
const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const KEY_SCHEDULES_LIST = 'schedules';

export default async function handler(req, res) {
  
  // --- MÉTODO GET (Buscar) ---
  if (req.method === 'GET') {
    try {
      const data = await kv.get(KEY_SCHEDULES_LIST);
      const schedules = data || []; 
      res.status(200).json({ schedules: schedules });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar dados do banco.' });
    }
  } 
  
  // --- MÉTODO POST (Cadastrar) ---
  else if (req.method === 'POST') {
    try {
      const newSchedule = req.body;
      const currentSchedules = await kv.get(KEY_SCHEDULES_LIST) || [];
      currentSchedules.push(newSchedule);
      await kv.set(KEY_SCHEDULES_LIST, currentSchedules);
      res.status(201).json({ success: true, message: 'Agendamento criado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao salvar dados no banco.' });
    }
  }

  // --- MUDANÇA 3: Adicionado o Bloco DELETE ---
  else if (req.method === 'DELETE') {
    try {
        // 1. Pega o ID enviado no body pelo 'schedule-cancel.js'
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID do agendamento não fornecido." });
        }

        // 2. Busca a lista atual
        const currentSchedules = await kv.get(KEY_SCHEDULES_LIST) || [];

        // 3. Filtra a lista, removendo o agendamento com o ID correspondente
        const newSchedules = currentSchedules.filter(schedule => schedule.id !== id);

        // 4. Salva a nova lista (sem o item deletado) de volta no banco
        await kv.set(KEY_SCHEDULES_LIST, newSchedules);
        
        res.status(200).json({ success: true, message: "Agendamento cancelado com sucesso!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar o agendamento." });
    }
  }
  
  // --- Se for qualquer outro método (ex: PUT) ---
  else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']); // <-- Atualiza o 'Allow'
    res.status(405).json({ message: `Método ${req.method} não permitido.` });
  }
}
