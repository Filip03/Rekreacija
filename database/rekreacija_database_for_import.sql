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
INSERT INTO `ekipa` VALUES (1,'Stari Aerodrom',4.7),(2,'Zabjelo',4.3),(3,'City Kvart',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (1,'Marko','Jocovic','marko@gmail.com','{bcrypt}$2a$10$DUcc/j4Rst5kP92J6Jhc3O3jYTMVBtnDNppVO6iTW9aSASBMoFcRO','Kesa','068051223','2025-05-06',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obavjestenja`
--

LOCK TABLES `obavjestenja` WRITE;
/*!40000 ALTER TABLE `obavjestenja` DISABLE KEYS */;
INSERT INTO `obavjestenja` VALUES (1,1,1,'Tražimo jednog igrača za futsal','Fali nam jedan igrač za večerašnji meč u 18h, javite se!','2025-05-06',0),(2,1,2,'Košarka 2 na 2!','Ekipa iz City Kvarta traži protivnike za friendly 2v2.','2025-05-07',1);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_id` (`team_id`),
  CONSTRAINT `team_rating` FOREIGN KEY (`team_id`) REFERENCES `ekipa` (`id`),
  CONSTRAINT `ocjena_chk_1` CHECK (((`overall` >= 0.0) and (`overall` <= 5.0))),
  CONSTRAINT `ocjena_chk_2` CHECK (((`fair_play` >= 0) and (`fair_play` <= 5))),
  CONSTRAINT `ocjena_chk_3` CHECK (((`intensity` >= 0) and (`intensity` <= 5))),
  CONSTRAINT `ocjena_chk_4` CHECK (((`quality` >= 0) and (`quality` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocjena`
--

LOCK TABLES `ocjena` WRITE;
/*!40000 ALTER TABLE `ocjena` DISABLE KEYS */;
INSERT INTO `ocjena` VALUES (1,4.7,4,5,5,1),(2,4.3,5,4,4,2);
/*!40000 ALTER TABLE `ocjena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ocjena_pozajmica`
--

DROP TABLE IF EXISTS `ocjena_pozajmica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ocjena_pozajmica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `overall` decimal(2,1) DEFAULT NULL,
  `fair_play` int DEFAULT NULL,
  `intensity` int DEFAULT NULL,
  `quality` int DEFAULT NULL,
  `loan_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loan_id` (`loan_id`),
  CONSTRAINT `loan_rating` FOREIGN KEY (`loan_id`) REFERENCES `pozajmica` (`id`),
  CONSTRAINT `ocjena_chk_loan_1` CHECK (((`overall` >= 0.0) and (`overall` <= 5.0))),
  CONSTRAINT `ocjena_chk_loan_2` CHECK (((`fair_play` >= 0) and (`fair_play` <= 5))),
  CONSTRAINT `ocjena_chk_loan_3` CHECK (((`intensity` >= 0) and (`intensity` <= 5))),
  CONSTRAINT `ocjena_chk_loan_4` CHECK (((`quality` >= 0) and (`quality` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocjena_pozajmica`
--

LOCK TABLES `ocjena_pozajmica` WRITE;
/*!40000 ALTER TABLE `ocjena_pozajmica` DISABLE KEYS */;
INSERT INTO `ocjena_pozajmica` VALUES (1,5.0,5,5,5,1),(2,4.0,4,4,4,2);
/*!40000 ALTER TABLE `ocjena_pozajmica` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pozajmica`
--

LOCK TABLES `pozajmica` WRITE;
/*!40000 ALTER TABLE `pozajmica` DISABLE KEYS */;
INSERT INTO `pozajmica` VALUES (1,1,1,5.0),(2,1,2,4.0);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rezervacija`
--

LOCK TABLES `rezervacija` WRITE;
/*!40000 ALTER TABLE `rezervacija` DISABLE KEYS */;
INSERT INTO `rezervacija` VALUES (1,'zauzeto','2025-05-10 18:00:00','2025-05-10 19:00:00',1,1),(2,'zauzeto','2025-05-11 20:00:00','2025-05-11 21:00:00',2,1),(3,'slobodno','2025-05-12 17:00:00','2025-05-12 18:00:00',3,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teren`
--

LOCK TABLES `teren` WRITE;
/*!40000 ALTER TABLE `teren` DISABLE KEYS */;
INSERT INTO `teren` VALUES (1,'Morača - Futsal teren','Bulevar Revolucije bb','067123456',1,'Futsal teren sa veštačkom travom, osvetljenjem i svlačionicama.',4.5,1),(2,'Tološi - Košarkaški teren','Ulica V Proleterske','067987654',2,'Otvoreni košarkaški teren sa reflektorima.',4.2,1),(3,'Teniski tereni Ljubović','Ljubović bb','068222333',3,'Dva teniska terena sa tartan podlogom.',4.7,1);
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

-- Dump completed on 2025-05-06 13:31:26
