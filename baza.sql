/*
SQLyog Community
MySQL - 8.0.26 : Database - doctor
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
USE `doctor`;

/*Table structure for table `doctor` */

DROP TABLE IF EXISTS `doctor`;

CREATE TABLE `doctor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `ordinationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b733df2469e483b7ff2e418ae68` (`ordinationId`),
  CONSTRAINT `FK_b733df2469e483b7ff2e418ae68` FOREIGN KEY (`ordinationId`) REFERENCES `ordination` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `doctor` */

insert  into `doctor`(`id`,`firstName`,`lastName`,`phone`,`ordinationId`) values 
(1,'doktor','doktor','064543',1),
(2,'Tamara','Kusakovic','06246576',1);

/*Table structure for table `intervention` */

DROP TABLE IF EXISTS `intervention`;

CREATE TABLE `intervention` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `status` enum('pending','accepted','rejected','finished') NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `doctorId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_67ce728766165b5ba9e9e6a5517` (`userId`),
  KEY `FK_51a3a66babc6d64ede6d08d8b99` (`doctorId`),
  CONSTRAINT `FK_51a3a66babc6d64ede6d08d8b99` FOREIGN KEY (`doctorId`) REFERENCES `doctor` (`id`),
  CONSTRAINT `FK_67ce728766165b5ba9e9e6a5517` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

/*Data for the table `intervention` */

insert  into `intervention`(`id`,`createdAt`,`status`,`start`,`end`,`userId`,`doctorId`) values 
(2,'2022-12-10 18:58:33.104502','finished','2023-01-27 20:28:51','2023-01-14 20:28:51',4,2),
(3,'2023-01-18 18:59:49.000000','finished','2023-01-27 20:28:51',NULL,4,2),
(4,'2023-01-24 19:00:16.000000','finished','2023-01-10 20:28:51',NULL,4,2),
(5,'2022-12-10 19:04:38.723732','pending','2023-01-10 20:28:51',NULL,4,2),
(6,'2023-01-07 19:06:24.000000','finished','2023-01-10 20:28:51',NULL,4,2),
(7,'2022-12-10 19:07:52.356204','pending','2023-01-10 20:28:51',NULL,4,2),
(8,'2022-12-10 19:08:23.294381','pending','2023-01-10 20:28:51',NULL,4,2),
(9,'2022-12-10 19:09:53.067014','pending','2023-01-15 20:28:51',NULL,4,2),
(10,'2022-11-10 19:17:31.358025','pending','2023-01-24 20:28:51',NULL,4,2);

/*Table structure for table `intervention_item` */

DROP TABLE IF EXISTS `intervention_item`;

CREATE TABLE `intervention_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `interventionId` int NOT NULL,
  `serviceId` int DEFAULT NULL,
  `unitPrice` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`,`interventionId`),
  KEY `FK_36b62b7733222d413574b758e84` (`serviceId`),
  KEY `FK_aee366c15cd823ed9feb11d5446` (`interventionId`),
  CONSTRAINT `FK_36b62b7733222d413574b758e84` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`),
  CONSTRAINT `FK_aee366c15cd823ed9feb11d5446` FOREIGN KEY (`interventionId`) REFERENCES `intervention` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;

/*Data for the table `intervention_item` */

insert  into `intervention_item`(`id`,`interventionId`,`serviceId`,`unitPrice`,`quantity`) values 
(1,2,2,1500,1),
(2,2,3,800,1),
(3,2,5,30000,1),
(4,2,7,4000,1),
(5,2,9,4700,5),
(6,3,2,1500,1),
(7,3,3,800,1),
(8,3,5,30000,1),
(9,3,7,4000,1),
(10,3,9,4700,1),
(11,4,2,1500,1),
(12,4,3,800,1),
(14,4,7,4000,1),
(15,4,9,4700,1),
(16,5,2,1500,1),
(17,5,3,800,1),
(19,5,7,4000,1),
(20,5,9,4700,1),
(21,6,2,1500,1),
(22,6,3,800,1),
(23,6,5,30000,1),
(24,6,7,4000,1),
(25,6,9,4700,1),
(26,7,2,1500,1),
(27,7,3,800,1),
(28,7,5,30000,1),
(29,7,7,4000,1),
(30,7,9,4700,1),
(31,8,2,1500,1),
(32,8,3,800,1),
(33,8,5,30000,1),
(34,8,7,4000,1),
(35,8,9,4700,1),
(36,9,2,1500,1),
(37,9,3,800,1),
(38,9,5,30000,1),
(39,9,7,4000,1),
(40,9,9,4700,1),
(41,10,2,1500,1),
(42,10,3,800,1),
(43,10,5,30000,1),
(44,10,7,4000,1),
(45,10,9,4700,1);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`timestamp`,`name`) values 
(1,1663089750515,'users1663089750515'),
(2,1663090355775,'doctors1663090355775'),
(3,1663090730523,'ordinations1663090730523'),
(4,1663091052283,'services1663091052283'),
(5,1663091835006,'interventions1663091835006'),
(6,1663352940019,'itemquantity1663352940019');

/*Table structure for table `ordination` */

DROP TABLE IF EXISTS `ordination`;

CREATE TABLE `ordination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `ordination` */

insert  into `ordination`(`id`,`address`,`phone`,`email`) values 
(1,'adresa1','062353','o1@gmail.com'),
(2,'adresa2','0624554','o2@gmail.com');

/*Table structure for table `service` */

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `service` */

insert  into `service`(`id`,`name`,`description`,`price`) values 
(1,'pregled','Imate problem ali ne znate sta je?. Dodjite na pregled',1000),
(2,'Krvna slika','Crvena i bela krvna zrnca, segmentacija. \r\n\r\nPovoljno',1500),
(3,'Biohemija','Secer, dobar i los holesterol, trigliceridi...',800),
(4,'Ocni pregled','Kompletan ocni pregled i utvrdjivanje dioptrije',3000),
(5,'Dermatoloski pregled','Imate probleme sa suvom kozom? Imate ceste bubuljice',30000),
(6,'Rentgen','Najmoderiniji rentgen sa minimalnim stetnim zracenjem',25000),
(7,'Plucna oboljenja','Ne mozete doci do vazduha, osecate bol u plucima, brzo se umarate?',4000),
(8,'ORL','ORL pregled',2500),
(9,'Ortopedija','Pregled izmestenih kostiju, preloma, naprsnuca',4700);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `type` enum('patient','technitian') NOT NULL DEFAULT 'patient',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`email`,`password`,`birthDate`,`type`) values 
(1,'','','','/1rBkZBCSx2I+UGe+UmuVuDMGJSPSvImWSM+5EHH84A=','1970-01-01','patient'),
(2,'','','laxi2168@gmail.com','/1rBkZBCSx2I+UGe+UmuVuDMGJSPSvImWSM+5EHH84A=','1970-01-01','patient'),
(3,'afds','daf','lazar.milosavljevic@appcargo.com','/1rBkZBCSx2I+UGe+UmuVuDMGJSPSvImWSM+5EHH84A=','1970-01-01','patient'),
(4,'Nevena','Maksimovic','a@test.com','/1rBkZBCSx2I+UGe+UmuVpocBu2UFZ8f/Tl9g0uiuSQ=','2022-09-30','patient'),
(5,'Medicinski','Tehnicar','tech@test.com','/1rBkZBCSx2I+UGe+UmuVm99EJL9j/wWOMl9pvJ/Oxg=','1989-08-17','technitian');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
