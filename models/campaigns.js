id INT AUTO_INCREMENT PRIMARY KEY
name VARCHAR(255)
description TEXT
goal_amount DECIMAL(10,2)
collected_amount DECIMAL(10,2)
start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
end_date TIMESTAMP
status ENUM('active', 'completed', 'emergency') DEFAULT 'active'