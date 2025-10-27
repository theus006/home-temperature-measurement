-- Criação do banco de dados
CREATE DATABASE temperatures;

-- Seleciona o banco de dados
USE temperatures;

-- Criação da tabela de medições
CREATE TABLE measures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sensor_name VARCHAR(50) NOT NULL,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    unit ENUM('°C', '°F') NOT NULL,
    value DECIMAL(5,2) NOT NULL
);
