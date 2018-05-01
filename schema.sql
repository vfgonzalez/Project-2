-- Database Creator HERE::::

CREATE DATABASE project2_db;

CREATE TABLE resources;

INSERT INTO `resources` (`ID`, `User_name`, `Title`, `Link`, `Link_description`, `Category`, `Votes`)
VALUES
	(1, 'ThomasSeaman', 'Chrome Developer Tools', 'https://developers.google.com/web/tools/chrome-devtools/?hl=en', 'This link is useful for navigating through the available Chrome Developer Tools.', 'General Tools', 0),
	(2, 'ThomasSeaman', 'HTML Validator', 'https://validator.w3.org/#validate_by_input', 'Tool to check the markup of web documents', 'General Tools', 0),
	(3, 'ThomasSeaman', 'Free Code Camp', 'https://medium.freecodecamp.org/', 'Free Code Camp is a great resource for learning new languages or getting a refresher on the basics.', 'Learning Resource', 0);