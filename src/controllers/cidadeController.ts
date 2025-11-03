import { Request, Response } from "express";
import { pool } from "../db.js";

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