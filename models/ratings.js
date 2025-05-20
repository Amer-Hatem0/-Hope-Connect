id INT AUTO_INCREMENT PRIMARY KEY
donor_id INT
orphan_id INT
campaign_id INT
service_id INT
rating INT CHECK (rating BETWEEN 1 AND 5)
comment TEXT
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP