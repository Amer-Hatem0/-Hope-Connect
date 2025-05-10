 

const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

 
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: 'user',
    };

    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        console.error("Error inserting new user:", err);
        return res.status(500).json({ error: 'Registration failed. Try again.' });
      }

      res.status(201).json({ message: 'User registered successfully', id: result.insertId });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      logger.error('Database error during login:', err);
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      logger.warn(`Login failed for unknown email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn(`Login failed for email: ${email} - incorrect password`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`Login successful for email: ${email} - role: ${user.role}`);
    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role
    });
  });
};
