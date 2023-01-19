CREATE DATABASE  IF NOT EXISTS `TRYBE_FUTEBOL_CLUBE` ;
USE `TRYBE_FUTEBOL_CLUBE`;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Insert values for table `teams`
--

INSERT INTO `teams` VALUES
  (1,'Avaí/Kindermann'),(2,'Bahia'),(3,'Botafogo'),
  (4,'Corinthians'),(5,'Cruzeiro'),(6,'Ferroviária'),
  (7,'Flamengo'),(8,'Grêmio'),(9,'Internacional'),
  (10,'Minas Brasília'),(11,'Napoli-SC'),(12,'Palmeiras'),
  (13,'Real Brasília'),(14,'Santos'),(15,'São José-SP'),
  (16,'São Paulo');

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;

CREATE TABLE `matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `home_team_id` int NOT NULL,
  `home_team_goals` int NOT NULL,
  `away_team_id` int NOT NULL,
  `away_team_goals` int NOT NULL,
  `in_progress` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `home_team_id` (`home_team_id`),
  KEY `away_team_id` (`away_team_id`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`home_team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`away_team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Insert values for table `matches`
--

INSERT INTO `matches` VALUES
  (1,16,1,8,1,0),(2,9,1,14,1,0),(3,4,3,11,0,0),(4,3,0,2,0,0),(5,7,1,10,1,0),
  (6,5,1,13,1,0),(7,12,2,6,2,0),(8,15,0,1,1,0),(9,1,0,12,3,0),(10,2,0,9,2,0),
  (11,13,1,3,0,0),(12,6,0,4,1,0),(13,8,2,5,1,0),(14,14,2,16,1,0),(15,10,0,15,1,0),
  (16,11,0,7,0,0),(17,1,2,8,3,0),(18,12,4,5,2,0),(19,11,2,2,2,0),(20,7,0,9,1,0),
  (21,6,3,13,1,0),(22,4,3,3,1,0),(23,15,2,16,3,0),(24,10,2,14,2,0),(25,2,0,6,1,0),
  (26,13,1,1,0,0),(27,5,1,15,2,0),(28,16,3,7,0,0),(29,9,0,4,4,0),(30,3,0,12,4,0),
  (31,8,2,10,0,0),(32,14,5,11,1,0),(33,1,1,16,1,0),(34,9,3,6,1,0),(35,10,1,5,3,0),
  (36,2,0,7,1,0),(37,15,0,13,1,0),(38,14,2,4,1,0),(39,3,2,11,0,0),(40,12,4,8,1,0);

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Insert values for table `users`
--

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES 
  (1,'Admin','admin','admin@admin.com','$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'),
  (2,'User','user','user@user.com','$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO');
