CREATE TABLE
    IF NOT EXISTS users (
        id INT (11) NOT NULL AUTO_INCREMENT,
        username VARCHAR(45) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(45) NOT NULL,
        role VARCHAR(45) DEFAULT 'Por Asignar',
        PRIMARY KEY (id)
    );

INSERT IGNORE INTO users (username, password, email, role)
VALUES
    (
        "AngelDavid",
        "$2a$10$dAgCB6RbjQuDR/GUDo5.qeErIO0L8K6Q8EEinW4J2OsAczcnCmG0q",
        "angel@admin.com",
        "Administrador"
    );

CREATE TABLE
    IF NOT EXISTS paymentMethod (
        _id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        method VARCHAR(45) NOT NULL,
        extraInfoTitle VARCHAR(45) NOT NULL
    );

INSERT IGNORE INTO paymentMethod (method, extraInfoTitle)
VALUES
    ('Pago Móvil', 'Número de Referencia'),
    ('Transferencia', 'Número de Referencia'),
    ('Efectivo', 'Moneda'),
    ('Otro', 'Información del Pago');

CREATE TABLE
    IF NOT EXISTS kids (
        _id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        boys INT (3) NOT NULL DEFAULT 0,
        girls INT (3) NOT NULL DEFAULT 0,
        courtesyKids INT (4) NOT NULL DEFAULT 0,
        totalKids INT (4) AS (boys + girls)
    );

CREATE TABLE
    IF NOT EXISTS adults (
        _id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        men INT (3) NOT NULL DEFAULT 0,
        women INT (3) NOT NULL DEFAULT 0,
        courtesyAdults INT (4) NOT NULL DEFAULT 0,
        totalAdults INT (4) AS (men + women)
    );

CREATE TABLE
    IF NOT EXISTS elders (
        _id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        elderMen INT (3) NOT NULL DEFAULT 0,
        elderWomen INT (3) NOT NULL DEFAULT 0,
        totalElders INT (4) AS (elderMen + elderWomen)
    );

CREATE TABLE
    IF NOT EXISTS visits (
        _id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        kids_id INT (11) NOT NULL,
        adults_id INT (11) NOT NULL,
        elders_id INT (11) NOT NULL,
        totalFamily INT (5) NOT NULL DEFAULT 1,
        totalDolars DEC(6, 2) NOT NULL,
        totalBolivars DEC(8, 2) NOT NULL,
        paymentMethod_id INT (11) NOT NULL,
        paymentInfo VARCHAR(255) NOT NULL,
        representativeName VARCHAR(100) NOT NULL,
        representativePhone VARCHAR(20) NOT NULL,
        date VARCHAR(10) NOT NULL,
        time VARCHAR(10) NOT NULL,
        FOREIGN KEY (paymentMethod_id) REFERENCES paymentMethod (_id),
        FOREIGN KEY (kids_id) REFERENCES kids (_id),
        FOREIGN KEY (adults_id) REFERENCES adults (_id),
        FOREIGN KEY (elders_id) REFERENCES elders (_id)
    );

CREATE TABLE
    IF NOT EXISTS configs (
        _id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        internetDolar CHAR(3) NOT NULL DEFAULT "off",
        defaultDolar VARCHAR(10) NOT NULL,
        kidsPrice VARCHAR(10) NOT NULL,
        adultsPrice VARCHAR(10) NOT NULL
    );

INSERT IGNORE INTO
    configs (
        internetDolar,
        defaultDolar,
        kidsPrice,
        adultsPrice
    )
VALUES
    ("on", "36.50", "1.50", "2");

CREATE TABLE
    IF NOT EXISTS news (
        _id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        subject VARCHAR(60) NOT NULL,
        body VARCHAR(255) NOT NULL,
        author VARCHAR(60) NOT NULL,
        date VARCHAR(10) NOT NULL,
        time VARCHAR(10) NOT NULL
    );