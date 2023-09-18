CREATE SCHEMA `nackademin_social` ;

CREATE TABLE `nackademin_social`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `coverPic` VARCHAR(255) NULL,
  `profilePic` VARCHAR(255) NULL,
  `city` VARCHAR(45) NULL,
  `website` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

CREATE TABLE `nackademin_social`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255) NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `nackademin_social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `nackademin_social`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NULL,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `postId_idx` (`postId` ASC) VISIBLE,
  INDEX `commentUserId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `commentUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `nackademin_social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `postId`
    FOREIGN KEY (`postId`)
    REFERENCES `nackademin_social`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `nackademin_social`.`relationships` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `followerUserId` INT NOT NULL,
  `followedUserId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `followerUser_idx` (`followerUserId` ASC) VISIBLE,
  INDEX `followedUser_idx` (`followedUserId` ASC) VISIBLE,
  CONSTRAINT `followerUser`
    FOREIGN KEY (`followerUserId`)
    REFERENCES `nackademin_social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `followedUser`
    FOREIGN KEY (`followedUserId`)
    REFERENCES `nackademin_social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `nackademin_social`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `likeUserId_idx` (`userId` ASC) VISIBLE,
  INDEX `likePostId_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `likeUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `nackademin_social`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `likePostId`
    FOREIGN KEY (`postId`)
    REFERENCES `nackademin_social`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
