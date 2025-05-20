id INT AUTO_INCREMENT PRIMARY KEY
donation_id INT
status ENUM('pending', 'in_transit', 'delivered') DEFAULT 'pending'
last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP