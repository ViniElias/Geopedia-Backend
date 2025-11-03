import { Request, Response } from 'express';
import { pool } from '../db.js';

const getContinenteId = async (id: string | number) => {
    try {
        const query = `SELECT * FROM continentes WHERE id = $1`;
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rows.length == 0) {
            return null;
        }

        return result.rows[0];

    } catch (error) {
        console.error('Erro ao buscar continente por ID: ', error);
        throw error;
    }
}

export const getAllContinentes = async (req: Request, res: Response) => {
    try {
        const query = "SELECT * FROM continentes";

        const result = await pool.query(query);

        res.status(200).json(result.rows);

    } catch (error) {
        console.error('Erro ao buscar continentes: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export const addContinente = async (req: Request, res: Response) => {
    const { nome, descricao } = req.body;

    try {
        const query = `
        INSERT INTO continentes (nome, descricao)
        VALUES ($1, $2)
        RETURNING *`;

        const values = [nome, descricao];
        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Erro ao adicionar continente: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export const deleteContinente = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const continente = await getContinenteId(id);

        if (!continente) {
            return res.status(404).json({ error: 'Continente não encontrado.' });
        }

        await pool.query('DELETE FROM continentes WHERE id = $1', [id]);

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir continente: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export const updateContinente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
        const continente = await getContinenteId(id);

        if (!continente) {
            return res.status(404).json({ error: 'Continente não encontrado.' });
        }

        const result = await pool.query('UPDATE continentes SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *', [nome, descricao, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar continente: ', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}