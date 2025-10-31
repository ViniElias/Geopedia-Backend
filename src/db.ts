import pg from 'pg';
import 'dotenv/config';

// Pool gerencia múltiplas conexões
const { Pool } = pg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Função para testar a conexão
export const test_db_connection = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
    } catch (error) {
        console.log('Erro ao conectar com o PostgreSQL: ', error);
        process.exit(1); // Encerra a aplicação se não conseguir conectar
    }
};