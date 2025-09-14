CREATE TABLE user (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) not NULL UNIQUE,
	password VARCHAR(255) not NULL,
	firstname VARCHAR(255) not null,
	lastname VARCHAR(255) NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
	created_at datetime DEFAULT CURRENT_TIMESTAMP,
	updated_at datetime default NUll ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE measurement (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id int NOT NULL,
	measured_at date NOT NULL DEFAULT (CURRENT_DATE),
	weight decimal(5, 2) DEFAULT NULL,
	chest decimal(5, 1) DEFAULT NULL,
	underbust decimal(5, 1) DEFAULT NULL,
	waist decimal(5, 1) DEFAULT NULL,
	belly decimal(5, 1) DEFAULT NULL,
	hips decimal(5, 1) DEFAULT NULL,
	thigh decimal(5, 1) DEFAULT NULL,
	arm decimal(5, 1) DEFAULT NULL,
	created_at datetime DEFAULT CURRENT_TIMESTAMP,
	updated_at datetime default NULL ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE weight_goal (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_id int NOT NULL,
	target_weight DECIMAL(5, 2),
	created_at datetime DEFAULT CURRENT_TIMESTAMP,
	updated_at datetime default NUll ON UPDATE CURRENT_TIMESTAMP,
	status ENUM("active", "archived") DEFAULT 'active',
	FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

--Si besoin de créer un premier utilisateur : 
-- INSERT INTO user (email, password, firstname, lastname, is_verified)
-- VALUES ('user1@example.fr', 'password', 'John', 'Doe', true);#