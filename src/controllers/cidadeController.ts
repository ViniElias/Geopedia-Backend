import { Request, Response } from "express";
import { pool } from "../db.js";
import { fetchCoordinates, fetchCurrentWeather } from "../services/openWeatherService.js";

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
};

export const getAllCidades = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const countResult = await pool.query('SELECT COUNT(*) FROM cidades');
    const total = parseInt(countResult.rows[0].count);

    const query = 'SELECT * FROM cidades ORDER BY nome ASC LIMIT $1 OFFSET $2';
    const result = await pool.query(query, [limit, offset]);

    res.status(200).json({
      data: result.rows,
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error('Erro ao buscar cidades: ', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

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

export const deleteCidade = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cidade = await getCidadeId(id);

    if (!cidade) {
      return res.status(404).json({ error: 'Cidade não encontrada.' });
    }

    await pool.query('DELETE FROM cidades WHERE id = $1', [id]);

    res.status(204).send();

  } catch (error) {
    console.error('Erro ao excluir cidade: ', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export const updateCidade = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, populacao, latitude, longitude } = req.body;

  try {
    const cidade = await getCidadeId(id);

    if (!cidade) {
      return res.status(404).json({ error: 'Cidade não encontrada.' });
    }

    const result = await pool.query(`UPDATE cidades SET
      nome = $1,
      populacao = $2,
      latitude = $3,
      longitude = $4
      WHERE id = $5
      RETURNING *`,
      [nome, populacao, latitude, longitude, id]);

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error('Erro ao atualizar cidade: ', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export const getWeather = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cidade = await getCidadeId(id);
    if (!cidade) {
      return res.status(404).json({ error: 'Cidade não encontrada.' });
    }

    const { latitude, longitude } = cidade;
    const weatherData = await fetchCurrentWeather(latitude, longitude);

    res.status(200).json(weatherData);

  } catch (error) {
    console.error('Erro ao buscar clima da cidade: ', error);
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
};