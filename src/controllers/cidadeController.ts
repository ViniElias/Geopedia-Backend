import { Request, Response } from "express";
import { pool } from "../db.js";
import { fetchCoordinates } from "../services/openWeatherService.js";

const getCidadeId = async (id: string | number) => {
    try {
        const query = `SELECT * FROM cidades WHERE id = $1`;
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];

    } catch (error) {
        console.error('Erro ao buscar cidade por ID: ', error);
        throw error;
    }
}

export const getAllCidades = async (req: Request, res: Response) => {
    try {
        const query = "SELECT * FROM cidades";

        const result = await pool.query(query);

        res.status(200).json(result.rows);

    } catch (error) {
        console.error('Erro ao buscar cidades: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export const addCidade = async (req: Request, res: Response) => {
  const { nome, populacao, id_pais } = req.body;

  if (!nome || !populacao || !id_pais) {
    return res.status(400).json({ 
      error: 'Campos "nome", "populacao" e "id_pais" são obrigatórios.' 
    });
  }

  try {
    const { lat, lon } = await fetchCoordinates(nome);

    const query = `
      INSERT INTO cidades (nome, populacao, latitude, longitude, id_pais)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;

    const values = [
      nome,
      populacao,
      lat,
      lon,
      id_pais
    ];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);

  } catch (error: any) {
    console.error('Erro ao adicionar cidade:', error);

    // Se o erro veio da API (cidade não encontrada)
    if (error.message.includes("não encontrada")) {
      return res.status(404).json({ error: error.message });
    }

    // Se id_pais não existe
    if (error.code === '23503') { 
      return res.status(409).json({ error: 'O país com este ID não existe.' });
    }

    // Se a cidade já existe (nome + id_pais duplicados)
    if (error.code === '23505') { 
      return res.status(409).json({ error: 'Esta cidade já está cadastrada neste país.' });
    }

    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};