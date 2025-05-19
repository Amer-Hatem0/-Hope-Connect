 
const db = require("../config/db.config");

exports.donateBook = (req, res) => {
  const { orphan_id, book } = req.body;
  const donor_id = req.user?.id;

  if (!orphan_id || !book?.title || !donor_id) {
    return res.status(400).json({ error: "Missing orphan, donor, or book information" });
  }

  const insertBookSql = `
    INSERT INTO book_donations (orphan_id, donor_id, title, author, year, cover_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertBookSql,
    [orphan_id, donor_id, book.title, book.author, book.year, book.cover_url], // ✅ تصحيح هنا
    (err, bookResult) => {
      if (err) {
        console.error("Error saving book donation:", err);
        return res.status(500).json({ error: "Failed to save book donation" });
      }

      const insertDonationSql = `
        INSERT INTO donations (donor_id, orphan_id, amount, category_id)
        VALUES (?, ?, ?, ?)
      `;
      const amount = 0;
      const category_id = 8; // كتاب

      db.query(
        insertDonationSql,
        [donor_id, orphan_id, amount, category_id],
        (err2, donationResult) => {
          if (err2) {
            console.error("Error saving donation record:", err2);
            return res.status(500).json({ error: "Book saved, but donation not tracked." });
          }

          res.status(201).json({ message: "Book donated successfully" });
        }
      );
    }
  );
};



exports.getByOrphan = (req, res) => {
  const orphanId = req.params.id;

  const sql = `SELECT * FROM book_donations WHERE orphan_id = ?`;

  db.query(sql, [orphanId], (err, results) => {
    if (err) {
      console.error("Error fetching book donations:", err);
      return res.status(500).json({ error: "Failed to fetch book donations" });
    }

    res.status(200).json(results);
  });
};

 
 
exports.getByDonor = (req, res) => {
  const { donorId } = req.params;

  const sql = `
    SELECT b.*, o.name AS orphan_name
    FROM book_donations b
    LEFT JOIN orphans o ON b.orphan_id = o.id
    WHERE b.donor_id = ?
  `;

  db.query(sql, [donorId], (err, results) => {
    if (err) {
      console.error("Error fetching book donations by donor:", err);
      return res.status(500).json({ error: "Failed to retrieve book donations" });
    }
    res.status(200).json(results);
  });
};


 