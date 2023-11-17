CREATE DATABASE IF NOT EXISTS usof;
CREATE USER IF NOT EXISTS 'dharin'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON usof.* TO 'dharin'@'localhost';

USE usof;

CREATE TABLE IF NOT EXISTS users (
                                     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                     login VARCHAR(30) NOT NULL UNIQUE,
                                     full_name VARCHAR(256) NOT NULL,
                                     email VARCHAR(256) NOT NULL UNIQUE,
                                     password VARCHAR(256) NOT NULL,
                                     rating VARCHAR(256) NOT NULL DEFAULT 0,
                                     role INT NOT NULL DEFAULT 1,
                                     online BOOLEAN NOT NULL DEFAULT FALSE,
                                     picture VARCHAR(256) NOT NULL DEFAULT '/avatars/default_avatar.png'
);

CREATE TABLE IF NOT EXISTS posts (
                                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                        author_id INT NOT NULL,
                                        title VARCHAR(256) NOT NULL,
                                        publish_date DATETIME NOT NULL,
                                        status BOOLEAN NOT NULL DEFAULT 1,
                                        content TEXT NOT NULL,
                                        CONSTRAINT FK_posts FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS categories (
                                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                        title VARCHAR(256) NOT NULL,
                                        description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS postsCategories (
                                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                        post_id INT NOT NULL,
                                        category_id INT NOT NULL,
                                        CONSTRAINT FK0_postsCategories FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
                                        CONSTRAINT FK1_postsCategories FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS likes (
                                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                        user_id INT NOT NULL,
                                        publish_date DATETIME NOT NULL,
                                        entity_type BOOLEAN NOT NULL,
                                        entity_id INT NOT NULL,
                                        type BOOLEAN NOT NULL,
                                        CONSTRAINT FK_likes FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS comments (
                                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                                        author_id INT NOT NULL,
                                        post_id INT NOT NULL,
                                        publish_date DATETIME NOT NULL,
                                        content TEXT NOT NULL,
                                        CONSTRAINT FK0_comment FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
                                        CONSTRAINT FK1_comment FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE

);

INSERT INTO users VALUES (1, 'raddzor', 'Danylo Harin', 'dharin@gmail.com', '1234', '100', 2, false, '/avatars/default_avatar.png');

INSERT INTO posts VALUES (1, 1, 'How 2 close vim', '2004-05-23T14:25:10', true, 'Idk lmao');

INSERT INTO categories VALUES (1, 'VIM', 'Linux program vim');
INSERT INTO postsCategories VALUES (1, 1, 1);

INSERT INTO likes VALUES (1, 2, '2004-05-23T14:25:10', 1, 1, 0);

INSERT INTO comments VALUES (1, 1, 1, '2004-05-23T14:25:10', 'Hit the Esc key to enter "Normal mode". Then you can type : to enter "Command-line mode". A colon (:) will appear at the bottom of the screen and you can type in one of the following commands. To execute a command, press the Enter key.')