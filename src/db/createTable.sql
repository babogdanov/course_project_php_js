CREATE DATABASE `table_anotator`;
USE `table_anotator`;

CREATE TABLE `users` (
`id` INT NOT NULL AUTO_INCREMENT,
`username` VARCHAR(50) NOT NULL UNIQUE,
`password` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`));

CREATE TABLE `tables` (
`id` INT NOT NULL AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
`creatorID` INT NOT NULL,
`rows` INT NOT NULL,
`columns`INT NOT NULL, 
`table` TEXT NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`creatorID`) REFERENCES users(`id`));