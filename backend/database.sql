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
-- Table `ecophone44`.`brands`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecophone44`.`brands` ;

CREATE TABLE
    IF NOT EXISTS `ecophone44`.`brands` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `pic` VARCHAR(255) NULL DEFAULT NULL,
        `is_smart` TINYINT NOT NULL,
        `index_id` INT NULL DEFAULT 0,
        `is_visible` TINYINT NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `ecophone44`.`models`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecophone44`.`models` ;

CREATE TABLE
    IF NOT EXISTS `ecophone44`.`models` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `pic` VARCHAR(255) NULL DEFAULT NULL,
        `index_id` INT NULL DEFAULT 1,
        `is_visible` TINYINT NOT NULL DEFAULT 1,
        `brand_id` INT NOT NULL,
        CONSTRAINT `brand_id` FOREIGN KEY (`brand_id`) REFERENCES `ecophone44`.`brands` (`id`),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `ecophone44`.`repairs`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecophone44`.`repairs` ;

CREATE TABLE
    IF NOT EXISTS `ecophone44`.`repairs` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        `text` VARCHAR(255) NOT NULL,
        `price` INT NULL DEFAULT NULL,
        `index_id` INT NULL DEFAULT 1,
        `is_visible` TINYINT NOT NULL DEFAULT 1,
        `model_id` INT NOT NULL,
        CONSTRAINT `model_id` FOREIGN KEY (`model_id`) REFERENCES `ecophone44`.`models` (`id`),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;