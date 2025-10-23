// api/agendamentos.js

import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  try {
    // 1. Encontra o caminho absoluto para o 'server.json' na raiz do projeto
    const jsonFilePath = path.resolve(process.cwd(), 'server.json');

    // 2. Lê o conteúdo do arquivo
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');

    // 3. Converte o texto em um objeto JSON
    const data = JSON.parse(fileContents);

    // 4. Envia os dados como resposta da API
    //    Se o seu server.json tiver uma chave "agendamentos" e você quiser
    //    retornar SÓ os agendamentos, use: res.status(200).json(data.agendamentos);
    //
    //    Se você quiser retornar TUDO que está no server.json, use:
    res.status(200).json(data);

  } catch (error) {
    console.error('Erro ao ler o server.json:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
