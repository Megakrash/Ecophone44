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
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `ecophone44`.`marque` (name, pic )
VALUES
  ( 'apple', 'APPLE.jpg'),
  ( 'samsung', 'SAMSUNG.jpg'),
  ( 'huawei', 'HUAWEI.jpg');
-- -----------------------------------------------------

-- Table `ecophone44`.`modele`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecophone44`.`modele` ;

CREATE TABLE
    IF NOT EXISTS `ecophone44`.`modele` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `pic` VARCHAR(255) NULL DEFAULT NULL,
        `marque_id` INT NOT NULL,
        CONSTRAINT `marque_id` FOREIGN KEY (`marque_id`) REFERENCES `ecophone44`.`marque` (`id`),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `ecophone44`.`modele` (name, pic, marque_id )
VALUES
  ( 'iphone 6', 'IPHONE6.png', 1),
  ( 'iphone 7', 'IPHONE7.png', 1),
  ( 'iphone 8', 'IPHONE8.png', 1);

-- -----------------------------------------------------
-- Table `ecophone44`.`reparation`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecophone44`.`reparation` ;

CREATE TABLE
    IF NOT EXISTS `ecophone44`.`reparation` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `price` INT NULL DEFAULT NULL,
        `position` INT NULL DEFAULT NULL,
        `modele_id` INT NOT NULL,
        CONSTRAINT `modele_id` FOREIGN KEY (`modele_id`) REFERENCES `ecophone44`.`modele` (`id`),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `ecophone44`.`reparation` (name, position, price, modele_id )
VALUES
  ( 'Façade avant', 1, 59, 1),
  ( 'Batterie', 2, 39, 1),
  ( 'Caméra arrière', 3, 39, 1),
  ( 'Façade avant', 1, 69, 2),
  ( 'Batterie', 2, 49, 2),
  ( 'Caméra arrière', 2, 49, 2);