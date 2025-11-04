import 'dotenv/config';

export interface GeoCoordinates {
    lat: number;
    lon: number;
}

//  Interface simplificada esperada da API
interface GeocodingResponse {
    name: string;
    lat: number;
    lon: number;
    country: string;
}

export const fetchCoordinates = async (nome: string): Promise<GeoCoordinates> => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if(!apiKey) {
        throw new Error('Chave da API inválida.');
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${nome}&limit=1&appid=${apiKey}`;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Cidade "${nome}" não encontrada.`);
        }

        const data = (await response.json()) as GeocodingResponse[];

        if(!data || data.length === 0) {
            throw new Error(`Nenhum dado retornado pela API para "${nome}".`);
        }

        const { lat, lon } = data[0];

        console.log(`Coordenadas encontradas para ${nome}: ${lat}, ${lon}`);
        return { lat, lon };

    } catch (error) {
        console.error('Erro no serviço OpenWeather: ', error);
        throw error;
    }
}