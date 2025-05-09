const db = require('../config/db.config');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

// 🔹 توليد تقرير PDF للتبرعات
exports.getDonationReportPdf = (req, res) => {
  db.query('SELECT * FROM donations', (err, donations) => {
    if (err) return res.status(500).json({ error: err });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=donation_report.pdf');

    doc.pipe(res);
    doc.fontSize(18).text('Donation Report', { align: 'center' });
    doc.moveDown();

    donations.forEach(donation => {
      doc
        .fontSize(12)
        .text(`ID: ${donation.id} | Amount: $${donation.amount} | Category: ${donation.category} | Date: ${donation.donation_date}`);
    });

    doc.end();
  });
};

// 🔹 توليد تقرير Excel للأيتام
exports.getOrphanReportExcel = (req, res) => {
  db.query('SELECT * FROM orphans', async (err, orphans) => {
    if (err) return res.status(500).json({ error: err });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orphans');

    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Name', key: 'name' },
      { header: 'Age', key: 'age' },
      { header: 'Education Status', key: 'education_status' },
      { header: 'Health Condition', key: 'health_condition' },
      { header: 'Well-being', key: 'well_being_status' },
      { header: 'Current Status', key: 'current_status' },
      { header: 'Date of Birth', key: 'date_of_birth' }
    ];

    worksheet.addRows(orphans);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=orphans_report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  });
};
