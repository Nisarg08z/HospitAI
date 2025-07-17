import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generatePatientPDF = (patientData, fileName = "patient-info.pdf") => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filePath = path.join("public", "pdfs", fileName);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(20).text("Patient Information", { align: "center" }).moveDown();

    Object.entries(patientData).forEach(([key, value]) => {
      doc.fontSize(14).text(`${key.toUpperCase()}: ${value}`);
    });

    doc.end();

    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", reject);
  });
};
