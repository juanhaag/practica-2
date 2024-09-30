CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL
);
CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    album VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    year INT
);

CREATE TABLE user_albums (
    user_id INT,
    album_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (album_id) REFERENCES albums(id),
    PRIMARY KEY (user_id, album_id)
);