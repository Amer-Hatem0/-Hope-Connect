const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

 const allowedRoles = ['user', 'donor', 'volunteer', 'orphan'];

  const selectedRole = allowedRoles.includes(role) ? role : 'user';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: selectedRole,
    };

 
    db.beginTransaction((err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        return res.status(500).json({ error: 'Registration failed. Try again.' });
      }

 
      db.query('INSERT INTO users SET ?', newUser, (err, userResult) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error inserting new user:", err);
            res.status(500).json({ error: 'Registration failed. Try again.' });
          });
        }

        const userId = userResult.insertId;

    if (selectedRole === 'donor') {
  db.query('INSERT INTO donors (user_id, name, email) VALUES (?, ?, ?)',
    [userId, name, email], (err) => {
      if (err) return db.rollback(() => res.status(500).json({ error: 'Registration failed (donor)' }));
      completeRegistration();
    });
} else if (selectedRole === 'volunteer') {
  db.query('INSERT INTO volunteers (user_id, name, email) VALUES (?, ?, ?)',
    [userId, name, email], (err) => {
      if (err) return db.rollback(() => res.status(500).json({ error: 'Registration failed (volunteer)' }));
      completeRegistration();
    });
} else if (selectedRole === 'orphan') {
  db.query('INSERT INTO orphans (user_id, name, email) VALUES (?, ?, ?)',
    [userId, name, email], (err) => {
      if (err) return db.rollback(() => res.status(500).json({ error: 'Registration failed (orphan)' }));
      completeRegistration();
    });
} else {
  completeRegistration();
}


        // Function to commit transaction and send response
        function completeRegistration() {
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error committing transaction:", err);
                res.status(500).json({ error: 'Registration failed. Try again.' });
              });
            }
            res.status(201).json({ 
              message: 'User registered successfully', 
              id: userId, 
              role: selectedRole 
            });
          });
        }
      });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
//     if (err) return res.status(500).json({ error: 'Database error' });
//     if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

//     const user = results[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     // If user is donor, get donor_id
//     if (user.role === 'donor') {
//       db.query('SELECT id FROM donors WHERE user_id = ?', [user.id], (err, donorResult) => {
//         if (err || donorResult.length === 0)
//           return res.status(500).json({ error: 'Failed to fetch donor ID' });

//         const donorId = donorResult[0].id;

//         const token = jwt.sign({ id: donorId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({
//           message: 'Login successful',
//           token,
//           role: user.role,
//           id: donorId,
//           name: user.name,
//           user: { id: donorId, name: user.name, role: user.role }
//         });
//       });
//     }else if (user.role === 'orphan') {
//   db.query('SELECT id FROM orphans WHERE user_id = ?', [user.id], (err, result) => {
//     if (err || result.length === 0)
//       return res.status(500).json({ error: 'Failed to fetch orphan ID' });
//     const orphanId = result[0].id;
//     const token = jwt.sign({ id: orphanId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return res.status(200).json({
//       message: 'Login successful',
//       token,
//       role: user.role,
//       id: orphanId,
//       name: user.name,
//       user: { id: orphanId, name: user.name, role: user.role }
//     });
//   });
// } else {
//       // For admin or volunteer
//       // const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

//       const token = jwt.sign(
//   {
//     id: user.id,
//     username: user.username,
//     role: user.role 
//   },
//   process.env.JWT_SECRET,
//   { expiresIn: '1d' }
// );

//       res.status(200).json({
//         message: 'Login successful',
//         token,
//         role: user.role,
//         id: user.id,
//         name: user.name,
//         user: { id: user.id, name: user.name, role: user.role }
//       });
//     }
//   });
// };


 
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // تحديد نوع المستخدم وجلب الـ ID المناسب
    if (user.role === 'donor') {
      db.query('SELECT id FROM donors WHERE user_id = ?', [user.id], (err, donorResult) => {
        if (err || donorResult.length === 0)
          return res.status(500).json({ error: 'Failed to fetch donor ID' });

        const donorId = donorResult[0].id;
        const token = jwt.sign({ id: donorId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
          message: 'Login successful',
          token,
          role: user.role,
          id: donorId,
          name: user.name,
          user: { 
            id: donorId, 
            name: user.name, 
            role: user.role,
            email: user.email 
          }
        });
      });
    } else if (user.role === 'orphan') {
      db.query('SELECT id FROM orphans WHERE user_id = ?', [user.id], (err, result) => {
        if (err || result.length === 0)
          return res.status(500).json({ error: 'Failed to fetch orphan ID' });
        const orphanId = result[0].id;
        const token = jwt.sign({ id: orphanId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
          message: 'Login successful',
          token,
          role: user.role,
          id: orphanId,
          name: user.name,
          user: { 
            id: orphanId, 
            name: user.name, 
            role: user.role,
            email: user.email 
          }
        });
      });
    } else if (user.role === 'volunteer') {
      db.query('SELECT id FROM volunteers WHERE user_id = ?', [user.id], (err, result) => {
        if (err || result.length === 0)
          return res.status(500).json({ error: 'Failed to fetch volunteer ID' });
        const volunteerId = result[0].id;
        const token = jwt.sign({ id: volunteerId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
          message: 'Login successful',
          token,
          role: user.role,
          id: volunteerId,
          name: user.name,
          user: { 
            id: volunteerId, 
            name: user.name, 
            role: user.role,
            email: user.email 
          }
        });
      });
    } else {
      // For admin or other roles
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Login successful',
        token,
        role: user.role,
        id: user.id,
        name: user.name,
        user: { 
          id: user.id, 
          name: user.name, 
          role: user.role,
          email: user.email 
        }
      });
    }
  });
};