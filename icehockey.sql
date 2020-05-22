/*
SQLyog Ultimate v8.32 
MySQL - 5.5.62 : Database - icehockey
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`icehockey` /*!40100 DEFAULT CHARACTER SET gbk */;

USE `icehockey`;

/*Table structure for table `ban_record` */

DROP TABLE IF EXISTS `ban_record`;

CREATE TABLE `ban_record` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `email` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `ban_record` */

/*Table structure for table `game_record` */

DROP TABLE IF EXISTS `game_record`;

CREATE TABLE `game_record` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `my_email` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `rival_email` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `winner` int(11) NOT NULL,
  `my_score` int(11) NOT NULL,
  `rival_score` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`gid`),
  KEY `adversaryid` (`rival_email`),
  KEY `winnerid` (`winner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `game_record` */

/*Table structure for table `login_record` */

DROP TABLE IF EXISTS `login_record`;

CREATE TABLE `login_record` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `email` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `login_record` */

insert  into `login_record`(`lid`,`email`,`time`) values (1,'1223','2020-05-22 17:00:38'),(2,'1223','2020-05-22 17:01:48');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `email` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `point` int(11) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`email`,`password`,`name`,`point`) values ('1223','23','23',23);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
