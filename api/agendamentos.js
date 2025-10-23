
import data from '../server.json';

export default async function handler(req, res) {
  try {
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ message: 'Erro Interno do Servidor' });
  }
}
