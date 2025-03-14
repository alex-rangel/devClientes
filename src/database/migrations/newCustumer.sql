CREATE TABLE IF NOT EXISTS tabelaTeste(
    id int PRIMARY KEY AUTO_INCREMENT,
    name text NOT NULL,
    address text,
    email text NOT NULL,
    role text NOT NULL,
    phone text,
    status boolean NOT NULL
    );
