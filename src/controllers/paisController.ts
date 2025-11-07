import { Request, Response } from "express";
import { pool } from "../db.js";
import { fetchCountryData } from "../services/restContriesService.js";

const getPaisId = async (id: string | number) => {
    try {
        const query = `SELECT * FROM paises WHERE id = $1`;
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rows.length == 0) {
            return null;
        }

        return result.rows[0];

    } catch (error) {
        console.error('Erro ao buscar país por ID: ', error);
        throw error;
    }
};

export const getAllPaises = async (req: Request, res: Response) => {
    try {
        const query = "SELECT * FROM paises";
        const result = await pool.query(query);

        res.status(200).json(result.rows);

    } catch (error) {
        console.error('Erro ao buscar países: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const addPais = async (req: Request, res: Response) => {
    const { nome, id_continente } = req.body;

    if (!nome || !id_continente) {
        return res.status(400).json({
            error: 'Nome e Id do continente obrigatórios.'
        });
    }

    try {
        const apiData = await fetchCountryData(nome);

        const query = `
        INSERT INTO paises (nome, populacao, idioma, moeda, id_continente)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;

        const values = [
            apiData.nome_en,
            apiData.populacao,
            apiData.idioma,
            apiData.moeda,
            id_continente
        ];

        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);

    } catch (error: any) {
        console.error('Erro ao adicionar país: ', error);

        // Se o erro veio da API
        if (error.message.includes("não encontrado")) {
            return res.status(404).json({ error: error.message });
        }

        // Trata erro de violação de FK (id_continente não existe)
        if (error.code === '23503') {
            return res.status(409).json({ error: 'O continente com este ID não existe.' });
        }

        // Trata erro de nome duplicado
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Um país com este nome já existe.' });
        }

        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const deletePais = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const pais = await getPaisId(id);

        if (!pais) {
            return res.status(404).json({ error: 'País não encontrado.' });
        }

        await pool.query('DELETE FROM paises WHERE id = $1', [id]);

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir país: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updatePais = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, populacao, idioma, moeda } = req.body;

    try {
        const pais = await getPaisId(id);

        if (!pais) {
            return res.status(404).json({ error: 'País não encontrado.' });
        }

        const result = await pool.query(`UPDATE paises SET 
            nome = $1, 
            populacao = $2,
            idioma = $3,
            moeda = $4
            WHERE id = $5
            RETURNING *`,
            [nome, populacao, idioma, moeda, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar país: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};