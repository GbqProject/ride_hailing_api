
-- Create database
-- CREATE DATABASE "ride_hailing";

-- Rider
CREATE TABLE rider (
	rider_id INT PRIMARY KEY NOT NULL, 
	rider_name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	payment_source INT,
	token VARCHAR
);

-- Driver
CREATE TABLE driver (
	driver_id INT PRIMARY KEY NOT NULL,
	driver_name VARCHAR NOT NULL,
	current_location JSON NOT NULL,
	on_a_ride BOOLEAN DEFAULT FALSE
);

-- Ride

CREATE TABLE ride (
	ride_id SERIAL PRIMARY KEY,
	fk_rider_id INT NOT NULL,
	fk_driver_id INT NOT NULL,
	start_location JSON,
	end_location JSON,
	start_date TIMESTAMP,
	end_date TIMESTAMP,
	transaction_id VARCHAR,
	transaction_value DECIMAL,
	payment_source INT
);

-- Adding data
INSERT INTO rider (rider_id, rider_name, email, payment_source, token)
VALUES 
	(1, 'Rider 1', 'rider1@example.com', 45181,'tok_test_30859_efBe912286fd9fF21a5a09bce2cb1991'),
	(2, 'Rider 2', 'rider2@example.com', null,'tok_test_30859_73F62C051Baff215f8716e1b2Ce069f1'),
	(3, 'Rider 3', 'rider3@example.com', null,'tok_test_30859_73F62C051Baff215f8716e1b2Ce069f1');

INSERT INTO driver (driver_id, driver_name, current_location)
VALUES 
 (1, 'Driver 1', '{"lat":1,"lng":1}'),
 (2, 'Driver 2', '{"lat":2,"lng":2}'),
 (3, 'Driver 3', '{"lat":3,"lng":3}');