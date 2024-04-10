CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT,
        username VARCHAR(45) NOT NULL UNIQUE,
        password VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL,
        role VARCHAR(45) DEFAULT "Por Asignar",
        PRIMARY KEY(id) 
);

INSERT INTO users (username, password, email) VALUES
    ('Rock', 'FinalBoss', 'thefinalboss@wwe.com'),
    ('Roman', 'TribalChief', 'headofthetable@wwe.com'),
    ('Cody', 'AmericanNightmare', 'americanightmare@wwe.com'),
    ('Seth', 'Freakin', 'thefightingchampion@wwe.com');

DESCRIBE users;

SELECT * FROM users;

SELECT * FROM users WHERE password='Freakin';

CREATE TABLE IF NOT EXISTS paymentMethod(
    _id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(45) NOT NULL, /* Antes era name */
    extraInfoTitle VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS visits (
        _id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        boys INT(3) NOT NULL DEFAULT 0,
        girls INT(3) NOT NULL DEFAULT 0,
        courtesyKids INT(4) NOT NULL DEFAULT 0,
        totalKids INT(4) AS (boys + girls),
        men INT(3) NOT NULL DEFAULT 0,
        women INT(3) NOT NULL DEFAULT 0,
        courtesyAdults INT(4) NOT NULL DEFAULT 0,
        totalAdults INT(4) AS (men + women),
        elderMen INT(3) NOT NULL DEFAULT 0,
        elderWomen INT(3) NOT NULL DEFAULT 0,
        totalElders INT(4) AS (elderMen + elderWomen),
        totalFamily INT(5) NOT NULL DEFAULT 1,
        totalDolars DEC(6,2) NOT NULL,
        totalBolivars DEC(8,2) NOT NULL,
        paymentMethod_id INT(11) NOT NULL,
        extraInfoValue VARCHAR(255),
        representativeName VARCHAR(100),
        representativePhone VARCHAR(20),
        date VARCHAR(10) NOT NULL,
        time VARCHAR(10) NOT NULL,
        FOREIGN KEY(paymentMethod_id) REFERENCES paymentMethod(_id)
);

DROP TABLE visits;

CREATE TABLE IF NOT EXISTS kids (
        _id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        boys INT(3) NOT NULL DEFAULT 0,
        girls INT(3) NOT NULL DEFAULT 0,
        courtesyKids INT(4) NOT NULL DEFAULT 0,
        totalKids INT(4) AS (boys + girls)
);

CREATE TABLE IF NOT EXISTS adults (
        _id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        men INT(3) NOT NULL DEFAULT 0,
        women INT(3) NOT NULL DEFAULT 0,
        courtesyAdults INT(4) NOT NULL DEFAULT 0,
        totalAdults INT(4) AS (men + women)
);

CREATE TABLE IF NOT EXISTS elders (
        _id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        elderMen INT(3) NOT NULL DEFAULT 0,
        elderWomen INT(3) NOT NULL DEFAULT 0,
        totalElders INT(4) AS (elderMen + elderWomen)
);

CREATE TABLE IF NOT EXISTS visits (
        _id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        kids_id INT(11) NOT NULL,
        adults_id INT(11) NOT NULL,
        elders_id INT(11) NOT NULL,
        totalFamily INT(5) NOT NULL DEFAULT 1,
        totalDolars DEC(6,2) NOT NULL,
        totalBolivars DEC(8,2) NOT NULL,
        paymentMethod_id INT(11) NOT NULL,
        extraInfoValue VARCHAR(255) NOT NULL,
        representativeName VARCHAR(100) NOT NULL,
        representativePhone VARCHAR(20) NOT NULL,
        date VARCHAR(10) NOT NULL,
        time VARCHAR(10) NOT NULL,
        FOREIGN KEY(paymentMethod_id) REFERENCES paymentMethod(_id),
        FOREIGN KEY(kids_id) REFERENCES kids(_id),
        FOREIGN KEY(adults_id) REFERENCES adults(_id),
        FOREIGN KEY(elders_id) REFERENCES elders(_id)
);

INSERT INTO kids (boys, girls) VALUES
    (1, 2),
    (2, 0),
    (5, 3),
    (12, 2);

INSERT INTO adults (men, women) VALUES
    (1, 1),
    (0, 1),
    (2, 3),
    (1, 5);

INSERT INTO elders (elderMen, elderWomen) VALUES
    (0, 0),
    (0, 1),
    (1, 0),
    (1, 1);

INSERT INTO paymentMethod (name, extraInfoTitle) VALUES
    ('Pago Móvil', 'Número de Referencia'),
    ('Transferencia', 'Número de Referencia'),
    ('Efectivo', 'Moneda'),
    ('Otro', 'Información del Pago');

INSERT INTO visits (kids_id, adults_id, elders_id, totalFamily, totalDolars, totalBolivars, paymentMethod_id, extraInfoValue, representativeName, representativePhone, date, time) VALUES
    (1,1,1,20,421.34,1245.57,1,"0102","Cody Rhodes","04123541126","08/04/2024","11:31 pm");

SELECT visits.representativeName, paymentMethod.name, visits.representativePhone
FROM visits
INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id;

ALTER TABLE `paymentmethod` CHANGE `name` `method` VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;

SELECT visits.representativeName, paymentMethod.method, visits.representativePhone
FROM visits
INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id;

SELECT visits.representativeName, paymentMethod.method, visits.representativePhone, kids.totalKids
FROM visits
INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id
INNER JOIN kids ON visits.kids_id=kids._id;

SELECT visits.representativeName, paymentMethod.method, visits.representativePhone, kids.totalKids, adults.totalAdults, elders.totalElders
FROM visits
INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id
INNER JOIN kids ON visits.kids_id=kids._id
INNER JOIN adults ON visits.adults_id=adults._id
INNER JOIN elders ON visits.elders_id=elders._id;


INSERT INTO users (username, password, email, role) VALUES
("AngelDavid","$2a$10$dAgCB6RbjQuDR/GUDo5.qeErIO0L8K6Q8EEinW4J2OsAczcnCmG0q","angel@admin.com","Administrador");

SELECT * FROM users WHERE username="AngelDavid" /*username = ${variable} */

CREATE TABLE configs (
    _id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    internetDolar CHAR(3) NOT NULL DEFAULT "off",
    defaultDolar VARCHAR(10) NOT NULL,
    kidsPrice VARCHAR(10) NOT NULL,
    adultsPrice VARCHAR(10) NOT NULL
);

INSERT INTO configs (internetDolar, defaultDolar, kidsPrice, adultsPrice ) VALUES
("on","36.50","1.50","2");

SELECT * FROM configs LIMIT 1;

SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date FROM visits;