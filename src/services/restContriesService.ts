export interface CountryApiData {
    populacao: number;
    idioma: string;
    moeda: string;
    nome_pt: string;
}

//  Interface simplificada esperada da API
interface ApiCountry {
    name: {
        common: string;
    };
    population: number;
    languages: { [key: string]: string } | null;
    currencies: { [key: string]: { name: string; symbol: string } } | null;
    translations: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
}

export const fetchCountryData = async (nome: string): Promise<CountryApiData> => {
    try {
        const url = `https://restcountries.com/v3.1/translation/${nome}?fullText=true`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`País "${nome}" não encontrado.`);
        }

        const data = (await response.json()) as ApiCountry[];

        if (!data || data.length === 0) {
            throw new Error(`Nenhum dado retornado pela API para "${nome}".`);
        }

        const pais = data[0];
        const nome_pt = pais.translations.por.common;
        const populacao = pais.population;

        const idioma =
            pais.languages && Object.keys(pais.languages).length > 0
                ? Object.values(pais.languages)[0]
                : 'N/D'; // 'N/D' (Não Definido) como fallback

        const moeda =
            pais.currencies && Object.keys(pais.currencies).length > 0
                ? Object.values(pais.currencies)[0].name
                : 'N/D'; // 'N/D' como fallback

        return { populacao, idioma, moeda, nome_pt };

    } catch (error) {
        console.error('Erro ao buscar dados da API: ', error);
        throw error;
    }
}