-- SQLBook: Code
-- Active: 1667902495509@@127.0.0.1@3306@ecophone44

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,FOREIGN_KEY_CHECKS = 0;

SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ecophone44
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `ecophone44` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `ecophone44` ;

-- -----------------------------------------------------
-- Table `ecophone44`.`marque`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecophone44`.`marque` ;

CREATE TABLE
    IF NOT EXISTS `ecophone44`.`marque` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `pic` VARCHAR(255) NULL DEFAULT NULL,
        `is_smart` TINYINT NOT NULL,
        `index_id` INT NULL DEFAULT NULL,
        `is_visible` TINYINT NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `ecophone44`.`marque` (name, pic, is_smart, index_id )
VALUES
  ( 'apple', 'APPLE.jpg', 1, 1 ),
  ( 'samsung', 'SAMSUNG.jpg', 1, 2 ),
  ( 'huawei', 'HUAWEI.jpg', 1, 3 ),
  ( 'apple', 'APPLE.jpg', 0, 4 ),
  ( 'samsung', 'SAMSUNG.jpg', 0, 5 );
-- -----------------------------------------------------

-- Table `ecophone44`.`modele`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecophone44`.`modele` ;

CREATE TABLE
    IF NOT EXISTS `ecophone44`.`modele` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `pic` VARCHAR(255) NULL DEFAULT NULL,
        `index_id` INT NULL DEFAULT NULL,
        `is_visible` TINYINT NOT NULL DEFAULT 1,
        `marque_id` INT NOT NULL,
        CONSTRAINT `marque_id` FOREIGN KEY (`marque_id`) REFERENCES `ecophone44`.`marque` (`id`),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `ecophone44`.`modele` (name, pic, marque_id )
VALUES
  ( 'iphone 6', 'IPHONE6.png', 1),
  ( 'iphone 7', 'IPHONE7.png', 1),
  ( 'iphone 8', 'IPHONE8.png', 1),
  ( 'ipad 2', 'IPAD2.jpg', 4);

-- -----------------------------------------------------
-- Table `ecophone44`.`reparation`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecophone44`.`reparation` ;

CREATE TABLE
    IF NOT EXISTS `ecophone44`.`reparation` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        `text` VARCHAR(255) NULL DEFAULT NULL,
        `price` INT NULL DEFAULT NULL,
        `index_id` INT NULL DEFAULT NULL,
        `is_visible` TINYINT NOT NULL DEFAULT 1,
        `modele_id` INT NOT NULL,
        CONSTRAINT `modele_id` FOREIGN KEY (`modele_id`) REFERENCES `ecophone44`.`modele` (`id`),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `ecophone44`.`reparation` (name, price, modele_id )
VALUES
  ( 'Façade avant', 59, 1),
  ( 'Batterie', 39, 1),
  ( 'Caméra arrière', 39, 1),
  ( 'Façade avant', 69, 2),
  ( 'Batterie', 49, 2),
  ( 'Caméra arrière', 49, 2),
  ( 'Vitre tactile', 59, 4);