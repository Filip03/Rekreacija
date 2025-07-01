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
  `creator_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `creator_id_UNIQUE` (`creator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ekipa`
--

LOCK TABLES `ekipa` WRITE;
/*!40000 ALTER TABLE `ekipa` DISABLE KEYS */;
/*!40000 ALTER TABLE `ekipa` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `prosjek_rating_ekipe` BEFORE UPDATE ON `ekipa` FOR EACH ROW BEGIN
  -- Ako se rating mijenja
  IF NEW.rating != OLD.rating THEN
    SET NEW.rating = ROUND((OLD.rating + NEW.rating) / 2, 1);
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
INSERT INTO `korisnik` VALUES (2,'Filip','Zejak','filipzejak2@gmail.com','{bcrypt}$2a$10$AZCcuU5Z8Y94YAo19mQzwO3PhSovamAQRsPLjJ/MMsJjKIEOoHO0W','CofiZ','068162526','2025-05-18',NULL,3),(4,'Arsenije','Obradović','arsenije@gmail.com','{bcrypt}$2a$10$9lBEFrXL9fWTeJj01PsD1u518H/fsBCXDpA.flz5W/IUrqtH4Hpii','Arsenije','068723425','2025-06-22',NULL,2),(5,'Nemanja','Urosevic','nemanja@gmail.com','{bcrypt}$2a$10$mJHsPQJvLdXTq66WEgzOUOM2hLOpQIXnXf5wEj0oWYqo1oOtjGYpC','Nemanja','067722101','2025-06-22',NULL,2),(6,'Milos','Duborija','milos@gmail.com','{bcrypt}$2a$10$Iu2unzpnmcPaA.DGEWJBUOo/mWc385Vdh3/6X0VeHeJWggyxJSF4a','Milos','068900125','2025-06-22',NULL,2),(7,'Ranko','Nikolic','ranko@gmail.com','{bcrypt}$2a$10$obr0bG/XjqYCc/JE1kB.V.zOoO3f.9f.urYzblZA03SZwHVs6uCdq','Ranko','066515404','2025-06-22',NULL,2),(8,'Aleksa','Tovjanin','aleksatovjanin@gmail.com','{bcrypt}$2a$10$ko6wo.1/XqurpDcKLA6e3...TZMwnt6J8j6vB.6U3TKOTXh.q5mye','Tovi','067432474','2025-06-22',NULL,3),(9,'Luka','Sekulic','lukasekulic@gmail.com','{bcrypt}$2a$10$NYRvXoc8koh8uFH71OUjWOg7Gs4dt1N.DC7bsKuXqz94GjZz6DNv2','Sekula','067202237','2025-06-22',NULL,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obavjestenja`
--

LOCK TABLES `obavjestenja` WRITE;
/*!40000 ALTER TABLE `obavjestenja` DISABLE KEYS */;
INSERT INTO `obavjestenja` VALUES (3,2,NULL,'Početak rada','Sa zadovoljstvom Vas možemo obavijesiti da je aplikacija Rekreacija++ 22. juna 2025. godine spremna i dostupna za korišćenje. Isprobajte još danas i rezervišite svoj termin! ','2025-06-22',3),(4,5,16,'Obnova terena','Obavještavamo sve igrače da će teren broj 3 u periodu od 15.7.2025 do 18.7.2025 biti nedostupan za zakazivanje zbog obnove podloge.','2025-07-12',2);
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
/*!40000 ALTER TABLE `ocjena` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_calculate_overall` BEFORE INSERT ON `ocjena` FOR EACH ROW BEGIN
    SET NEW.overall = (NEW.fair_play + NEW.quality + NEW.intensity) / 3.0;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_update_rating_after_insert` AFTER INSERT ON `ocjena` FOR EACH ROW BEGIN
    UPDATE ekipa
    SET rating = NEW.overall
    WHERE id = NEW.team_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_update_rating_after_update` AFTER UPDATE ON `ocjena` FOR EACH ROW BEGIN
    IF OLD.overall <> NEW.overall THEN
        UPDATE ekipa
        SET rating = NEW.overall
        WHERE id = NEW.team_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
/*!40000 ALTER TABLE `ocjena_pozajmica` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_calculate_overall_loan` BEFORE INSERT ON `ocjena_pozajmica` FOR EACH ROW BEGIN
    SET NEW.overall = (NEW.fair_play + NEW.intensity + NEW.quality) / 3.0;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_update_rating_after_insert_loan` AFTER INSERT ON `ocjena_pozajmica` FOR EACH ROW BEGIN
	UPDATE pozajmica
    SET rating = NEW.overall
    WHERE id = NEW.loan_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_update_rating_after_update_loan` AFTER UPDATE ON `ocjena_pozajmica` FOR EACH ROW BEGIN
	IF OLD.overall <> NEW.overall THEN
		UPDATE pozajmica
		SET rating = NEW.overall
		WHERE id = NEW.loan_id;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `image_url` varchar(150) DEFAULT NULL,
  `cordinates_x` varchar(100) DEFAULT NULL,
  `cordinates_y` varchar(100) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `owner_of_pitch` (`owner_id`),
  CONSTRAINT `owner_of_pitch` FOREIGN KEY (`owner_id`) REFERENCES `korisnik` (`id`),
  CONSTRAINT `chk_rating` CHECK (((`rating` >= 0.0) and (`rating` <= 5.0)))
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teren`
--

LOCK TABLES `teren` WRITE;
/*!40000 ALTER TABLE `teren` DISABLE KEYS */;
INSERT INTO `teren` VALUES (1,'Morača - Futsal teren','Bulevar Revolucije bb','067123456',1,'Futsal teren sa vještačkom travom, osvjetljenjem i svlačionicama.',4.5,4,'assets/moraca','42.43926322093669','19.253906786564002','Preko Morace'),(2,'Tološi - Košarkaški teren','Ulica V Proleterske','067987654',2,'Otvoreni košarkaški teren sa reflektorima.',4.2,5,'assets/tolosi.jpg','42.44664660122677','19.236470210106642','Tolosi'),(3,'Teniski teren NEC','22 Vasa Raickovica','068222333',3,'Dva teniska terena sa šljakom.',4.7,6,'assets/nec.jpg','42.44395607894279','19.253744711651198','Novi Grad'),(6,'Balon Gimnazija','Vaka Djurovica','067111451',1,'Futsal teren sa vjestackom travom, osvjetljenjem, Derby loptama',4.8,7,'assets/gimnazija.jpg','42.447688','19.264295','Centar'),(7,'Stampar Sportski centar - Futsal','bb Vijenac Kosovskih Junaka','068886886',1,'Futsal teren sa vjestackom travom, semaforom, osvjetljenjem i loptama najveceg kvaliteta',4.3,4,'assets/stampar.jpg','42.446253','19.242308','Blok 5'),(8,'Sportski Centar Dadex','Masline','066666222',1,'Futsal teren opremljen najnovijom opremom, nova podloga, teren na kojem se igraju mecevi Biznis lige Crne Gore',4.9,5,'assets/dadex.jpg','42.443522','19.281300','Masline'),(9,'Arena Sportski Centar','Kralja Nikole','069888721',1,'Futsal teren pravljen po evropskom standardu, najkvalitetnija vjestacka podloga sa tribinama oko terena',4.4,6,'assets/arena.jpg','42.431683','42.431683','Zabjelo'),(10,'Balon Sutjeska','Nikca od Rovina','068555444',1,'Futsal balon i teren na otvorenom za sve prilike, standardne dimenzije i najbolji kvalitet vjestacke trave sa osvjetljenjem',4.6,7,'assets/sutjeska.jpg','42.447610','19.256017','Momisici'),(15,'Teniski centar Knezevic - Knez','uz Moracu, Podgorica','069593099',3,'Dva teniska terena sa šljakom, teniski reketi svih brendova, osvježenje pored terena',4.9,4,'assets/knezevic.webp','42.412938643161915','19.22232675766976','Zabjelo'),(16,'Teniski klub Eminent','Velje Brdo','067274394',3,'Teniski teren sa modernom opremom, reketima na iznajmljivanje i stručnjacima za unapređenje vaših teniskih vještina',4.1,5,'assets/eminent.jpg','42.48995201780377','19.232496661358066','Velje Brdo'),(17,'Bemax Arena','Ulica Svetlane Kane Radevic','069755666',2,'Moderni kosarkaski tereni namijenjeni za 5 na 5 ili 3 na 3 igru sa modernizovanom podlogom',4.5,6,'assets/bemax.jpg','42.437531341637055','19.254924480740982','Preko Morace'),(18,'Pavle Rovinski Kosarkaski Teren','Stari Aerodrom','066222311',2,'Kosarkaski teren u sklopu Osnovne skole Pavle Rovinski na Starom Aerodromu',3.8,7,'assets/pavle_rovinski.jpg','42.42811324753237','19.27660528466048','Stari Aerodrom'),(19,'Stampar Sportski centar - Kosarka','Vaka Djurovica','067111451',2,'Kosarkaski balon sa visecim obrucima, Molten loptama',4.3,5,'assets/stampar-kosarka.webp','42.44617133381329','19.24224396571497','Blok 5');
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

--
-- Dumping events for database 'rekreacija'
--

--
-- Dumping routines for database 'rekreacija'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-22 12:26:40