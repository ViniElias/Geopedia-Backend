import { Request, Response } from 'express';
import { pool } from '../db.js';

export const addContinente = async (req: Request, res: Response) => {
    const { nome, descricao } = req.body;

    if (!nome) {
        return res.status(400).json({error: 'O campo "Nome" é obrigatório.'});
    }

    try {
        const query = `
        INSERT INTO continentes (nome, descricao)
        VALUES ($1, $2)
        RETURNING *;`;

        const values = [nome, descricao];

        // Executa a query
        const result = await pool.query(query, values);

        // Retorna o novo continente com status 201 (Criado)
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar continente: ', error);
        
        res.status(500).json({error: 'Erro interno do servidor.'});
    }
}