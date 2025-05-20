id INT AUTO_INCREMENT PRIMARY KEY
orphan_id INT NOT NULL
donor_id INT NOT NULL
amount DECIMAL(10,2) NOT NULL
frequency ENUM('monthly', 'yearly') DEFAULT 'monthly'
start_date DATE NOT NULL
end_date DATE
status ENUM('active', 'completed', 'cancelled') DEFAULT 'active'
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP