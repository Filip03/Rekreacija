CREATE DATABASE  IF NOT EXISTS `rekreacija` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rekreacija`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: rekreacija
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ekipa`
--

DROP TABLE IF EXISTS `ekipa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ekipa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ekipa`
--

LOCK TABLES `ekipa` WRITE;
/*!40000 ALTER TABLE `ekipa` DISABLE KEYS */;
INSERT INTO `ekipa` VALUES (2,'Gardisti',NULL),(3,'Pro Conto',NULL);
/*!40000 ALTER TABLE `ekipa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `phone_number` varchar(9) DEFAULT NULL,
  `date_of_registration` date DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `team_id` (`team_id`),
  KEY `tip_korisnika` (`type_id`),
  CONSTRAINT `korisnik_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `ekipa` (`id`),
  CONSTRAINT `tip_korisnika` FOREIGN KEY (`type_id`) REFERENCES `tip` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (5,'Marko','Marković','marko@example.com','{bcrypt}$2a$10$CnzUSy283OYNLdUfu702quXtJOi.kZahYR9pIeY8g5N2ZD.r/kd8m','marko1','061234567','2025-04-05',2,1),(6,'Filip','Marković','filip@example.com','{bcrypt}$2a$10$jvD5Ewf8qhYs1bIAnjmIXezlxwKYXkSybH9RFY1KD.EEFkBqtg7Sa','filip','061234567','2025-04-05',NULL,1),(9,'Filip','Filipovic','filip2@example.com','{bcrypt}$2a$10$cmH/G0/ZglUoL0N4W4a6lOEi.0nLAkf060vEZNQRUT9VPBGChpWbO','filip1','067123123','2025-04-14',NULL,1);
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obavjestenja`
--

DROP TABLE IF EXISTS `obavjestenja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obavjestenja` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `pitch_id` int DEFAULT NULL,
  `title` text,
  `description` text,
  `date` date DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `pitch_id` (`pitch_id`),
  CONSTRAINT `obavjestenja_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `korisnik` (`id`),
  CONSTRAINT `obavjestenja_ibfk_2` FOREIGN KEY (`pitch_id`) REFERENCES `teren` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obavjestenja`
--

LOCK TABLES `obavjestenja` WRITE;
/*!40000 ALTER TABLE `obavjestenja` DISABLE KEYS */;
/*!40000 ALTER TABLE `obavjestenja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ocjena`
--

DROP TABLE IF EXISTS `ocjena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ocjena` (
  `id` int NOT NULL AUTO_INCREMENT,
  `overall` decimal(2,1) DEFAULT NULL,
  `fair_play` int DEFAULT NULL,
  `intensity` int DEFAULT NULL,
  `quality` int DEFAULT NULL,
  `team_id` int NOT NULL,
  `loan_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_id` (`team_id`),
  UNIQUE KEY `loan_id` (`loan_id`),
  CONSTRAINT `loan_rating` FOREIGN KEY (`loan_id`) REFERENCES `pozajmica` (`id`),
  CONSTRAINT `team_rating` FOREIGN KEY (`team_id`) REFERENCES `ekipa` (`id`),
  CONSTRAINT `ocjena_chk_1` CHECK (((`overall` >= 0.0) and (`overall` <= 5.0))),
  CONSTRAINT `ocjena_chk_2` CHECK (((`fair_play` >= 0) and (`fair_play` <= 5))),
  CONSTRAINT `ocjena_chk_3` CHECK (((`intensity` >= 0) and (`intensity` <= 5))),
  CONSTRAINT `ocjena_chk_4` CHECK (((`quality` >= 0) and (`quality` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocjena`
--

LOCK TABLES `ocjena` WRITE;
/*!40000 ALTER TABLE `ocjena` DISABLE KEYS */;
/*!40000 ALTER TABLE `ocjena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pozajmica`
--

DROP TABLE IF EXISTS `pozajmica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pozajmica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `reservation_id` int DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `reservation_id` (`reservation_id`),
  CONSTRAINT `pozajmica_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `korisnik` (`id`),
  CONSTRAINT `pozajmica_ibfk_2` FOREIGN KEY (`reservation_id`) REFERENCES `rezervacija` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pozajmica`
--

LOCK TABLES `pozajmica` WRITE;
/*!40000 ALTER TABLE `pozajmica` DISABLE KEYS */;
/*!40000 ALTER TABLE `pozajmica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rezervacija`
--

DROP TABLE IF EXISTS `rezervacija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rezervacija` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('zauzeto','slobodno') DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `pitch_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pitch_id` (`pitch_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `rezervacija_ibfk_1` FOREIGN KEY (`pitch_id`) REFERENCES `teren` (`id`),
  CONSTRAINT `rezervacija_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `korisnik` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rezervacija`
--

LOCK TABLES `rezervacija` WRITE;
/*!40000 ALTER TABLE `rezervacija` DISABLE KEYS */;
/*!40000 ALTER TABLE `rezervacija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teren`
--

DROP TABLE IF EXISTS `teren`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teren` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `adress` varchar(50) DEFAULT NULL,
  `contact` varchar(9) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `description` text,
  `rating` decimal(2,1) DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `owner_of_pitch` (`owner_id`),
  CONSTRAINT `owner_of_pitch` FOREIGN KEY (`owner_id`) REFERENCES `korisnik` (`id`),
  CONSTRAINT `chk_rating` CHECK (((`rating` >= 0.0) and (`rating` <= 5.0)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teren`
--

LOCK TABLES `teren` WRITE;
/*!40000 ALTER TABLE `teren` DISABLE KEYS */;
/*!40000 ALTER TABLE `teren` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip`
--

DROP TABLE IF EXISTS `tip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tip` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip`
--

LOCK TABLES `tip` WRITE;
/*!40000 ALTER TABLE `tip` DISABLE KEYS */;
INSERT INTO `tip` VALUES (1,'regular'),(2,'owner'),(3,'admin');
/*!40000 ALTER TABLE `tip` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 23:00:26
