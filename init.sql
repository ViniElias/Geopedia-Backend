CREATE TABLE continentes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE paises (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    populacao BIGINT CHECK (populacao >= 0),
    idioma VARCHAR(255),
    moeda VARCHAR(255),
    id_continente INT,
    CONSTRAINT fk_continente FOREIGN KEY(id_continente) REFERENCES continentes(id) ON DELETE SET NULL
);

CREATE TABLE cidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    populacao BIGINT CHECK (populacao >= 0),
    latitude DECIMAL(8, 6),
    longitude DECIMAL(9, 6),
    id_pais INT,
    CONSTRAINT fk_pais FOREIGN KEY(id_pais) REFERENCES paises(id) ON DELETE SET NULL, 
    CONSTRAINT cidade_pais_unica UNIQUE(nome, id_pais)
);