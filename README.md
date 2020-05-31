"# contest_page" 
use following mysql code to make database format
DROP DATABASE IF EXISTS `sql_invoicing`;
CREATE DATABASE `sql_invoicing`; 
USE `sql_invoicing`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `contests` (
	`id` tinyint NOT NULL ,
    `title` varchar(100) NOT NULL,
    `date` DATE NOT NULL,
    `duration` INT NOT NULL,
    `link` varchar(100),
    PRIMARY KEY (`id`)
);

INSERT INTO `contest` VALUES(1,'now or never','2020-05-12',180);
INSERT INTO `contest` VALUES(2,'biweekly','2020-06-12',120);
INSERT INTO `contest` VALUES(3,'now or never 2','2020-06-18',180);
INSERT INTO `contest` VALUES(4,'biweekly 2','2020-08-12',120);
