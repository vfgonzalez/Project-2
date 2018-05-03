
-- Database Creator HERE::::


CREATE DATABASE project2_db;
USE project2_db;

CREATE TABLE resources
(
	id INT AUTO_INCREMENT NOT NULL,
	link VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    category VARCHAR(255) NOT NULL,
	createdAt TIMESTAMP NOT NULL,
    author VARCHAR(255) NOT NULL,
    voteCount INTEGER(11) DEFAULT 0 NOT NULL,
	updatedAt TIMESTAMP NOT NULL,
	PRIMARY KEY(id)
);





