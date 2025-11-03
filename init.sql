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
)