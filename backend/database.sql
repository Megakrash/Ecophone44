-- SQLBook: Code
-- Active: 1667902495509@@127.0.0.1@3306@ecophone44

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,FOREIGN_KEY_CHECKS = 0;

SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ecophone44
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `yflt5483_ecophone44` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `yflt5483_ecophone44` ;

-- -----------------------------------------------------
-- Table `ecophone44`.`brands`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `yflt5483_ecophone44`.`brands` ;

CREATE TABLE
    IF NOT EXISTS `yflt5483_ecophone44`.`brands` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `pic` VARCHAR(255) NULL DEFAULT NULL,
        `type` INT NOT NULL,
        `index_id` INT NULL DEFAULT 0,
        `is_visible` TINYINT NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------

-- Table `ecophone44`.`models`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `yflt5483_ecophone44`.`models` ;

CREATE TABLE
    IF NOT EXISTS `yflt5483_ecophone44`.`models` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `text` VARCHAR(500) NULL DEFAULT NULL,
        `price` VARCHAR(100) NULL DEFAULT NULL,
        `pic` VARCHAR(255) NULL DEFAULT NULL,
        `index_id` INT NULL DEFAULT 0,
        `is_visible` TINYINT NOT NULL DEFAULT 1,
        `brand_id` INT NOT NULL,
        CONSTRAINT `brand_id` FOREIGN KEY (`brand_id`) REFERENCES `yflt5483_ecophone44`.`brands` (`id`),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `ecophone44`.`repairs`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `yflt5483_ecophone44`.`repairs` ;

CREATE TABLE
    IF NOT EXISTS `yflt5483_ecophone44`.`repairs` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        `text` VARCHAR(255) NOT NULL,
        `price` VARCHAR(100) NOT NULL,
        `icon_id` INT NOT NULL,
        `index_id` INT NULL DEFAULT 0,
        `is_visible` TINYINT NOT NULL DEFAULT 0,
        `model_id` INT NOT NULL,
        CONSTRAINT `icon_id` FOREIGN KEY (`icon_id`) REFERENCES `yflt5483_ecophone44`.`icons` (`id`),
        CONSTRAINT `model_id` FOREIGN KEY (`model_id`) REFERENCES `yflt5483_ecophone44`.`models` (`id`),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ecophone44`.`icons`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `yflt5483_ecophone44`.`icons` ;

CREATE TABLE
    IF NOT EXISTS `yflt5483_ecophone44`.`icons` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `pic` VARCHAR(255) NULL DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `yflt5483_ecophone44`.`icons` ( pic )
VALUES
  ('screen.png'),
  ('batterie.png'),
  ('back.png'),
  ('dock.png'),
  ('camback.png'),
  ('hublot.png'),
  ('ecouteur.png'),
  ('camfront.png'),
  ('water.png'),
  ('tools.png'),
  ('autres.png'),
  ('hp.png');

-- -----------------------------------------------------
-- Table `ecophone44`.`users`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `yflt5483_ecophone44`.`users` ;

CREATE TABLE
    IF NOT EXISTS `yflt5483_ecophone44`.`users` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `email` VARCHAR(100) NOT NULL,
        `password` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `yflt5483_ecophone44`.`users` ( email, password )
VALUES
  (
    'contact@ecophone44.com',
    '$argon2id$v=19$m=65536,t=5,p=1$hEeGADZLO1WVrDX6BY5/kg$vzijLuYZ6r+QnOAWq3YETH2rzWWKQgTwZJo7zmTRlnY'
  ),
  (
    'guest@guest.com',
    '$argon2id$v=19$m=65536,t=5,p=1$aBs0WHcFXLn59ycb3QzHsA$+gSqVQK2BvnGL09GkBMnGSiybbTlpJwI0BXtE2tFf5A'
  ),
  (
    'jscattolini@gmail.com',
    '$argon2id$v=19$m=65536,t=5,p=1$zZPOnktP/6elpx5YF8NeQw$Q85ZQzK9AlP6hF1oRo6flSKnZ02AJ+eBtRQQs89xTkw'
  );

-- -----------------------------------------------------
-- Table `ecophone44`.`calendar`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `yflt5483_ecophone44`.`calendar` ;

CREATE TABLE
    IF NOT EXISTS `yflt5483_ecophone44`.`calendar` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `firstName` VARCHAR(100) NOT NULL,
        `lastName` VARCHAR(100) NOT NULL,
        `email` VARCHAR(100) NOT NULL,
        `phoneNumber` VARCHAR(100) NOT NULL,
        `zipCode` VARCHAR(100) NOT NULL,
        `start_date` DATETIME NOT NULL,
        `end_date` DATETIME NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
