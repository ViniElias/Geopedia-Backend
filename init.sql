CREATE TABLE continentes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT NOT NULL
);

CREATE TABLE paises (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    populacao INT NOT NULL CHECK (populacao >= 0),
    idioma VARCHAR(255) NOT NULL,
    moeda VARCHAR(255) NOT NULL,
    id_continente INT NOT NULL,
    CONSTRAINT fk_continente FOREIGN KEY(id_continente) REFERENCES continentes(id) ON DELETE RESTRICT
);

CREATE TABLE cidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    populacao INT NOT NULL CHECK (populacao >= 0),
    latitude DECIMAL(8, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    id_pais INT NOT NULL,
    CONSTRAINT fk_pais FOREIGN KEY(id_pais) REFERENCES paises(id) ON DELETE RESTRICT, UNIQUE(nome, id_pais)
);