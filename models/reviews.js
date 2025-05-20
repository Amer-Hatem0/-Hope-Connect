id INT AUTO_INCREMENT PRIMARY KEY
donor_id INT
orphan_id INT
rating INT CHECK (rating BETWEEN 1 AND 5)
comment TEXT
review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
organizations_id INT