id INT AUTO_INCREMENT PRIMARY KEY
name VARCHAR(255) NOT NULL
age INT NOT NULL
education_status VARCHAR(255)
health_condition VARCHAR(255)
date_of_birth DATE
well_being_status VARCHAR(255)
current_status VARCHAR(255)
location VARCHAR(255)
latitude DECIMAL(10,8)
longitude DECIMAL(11,8)
user_id INT
email VARCHAR(255)
image_url VARCHAR(255)
report_url VARCHAR(255)
support_message TEXT
is_verified BOOLEAN DEFAULT FALSE