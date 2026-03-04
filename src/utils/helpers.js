/**
 * Utility functions for University ID System
 * File: utils/helpers.js
 * 
 * MULTIPLE BARCODE API OPTIONS
 */

/**
 * Filters students array based on search term
 */
export const filterStudents = (students, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return students;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return students.filter(student =>
    student.name.toLowerCase().includes(lowerSearchTerm) ||
    student.matricNumber.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * OPTION 1: TEC-IT Barcode API ⭐ RECOMMENDED
 * Very reliable, free, no rate limits
 * https://www.tec-it.com/en/software/restful-webservice-barcode-generator/default.aspx
 */
export const generateBarcodeWithDetails = (student) => {
  const barcodeData = `${student.matricNumber}`;
  
  return `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(barcodeData)}&code=Code128&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff`;
};

/**
 * OPTION 2: Bwip-js API (MetaFloor)
 * Open source, reliable, supports many formats
 * https://github.com/metafloor/bwip-js
 */
// export const generateBarcodeWithDetails = (student) => {
//   const barcodeData = `${student.matricNumber}|${student.name}|${student.department}|${student.year}`;
  
//   return `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(barcodeData)}&scale=3&includetext`;
// };

/**
 * OPTION 3: QuickChart.io
 * Modern, reliable, supports multiple formats
 * https://quickchart.io/documentation/barcode-api/
 */
// export const generateBarcodeWithDetails = (student) => {
//   const barcodeData = `${student.matricNumber}|${student.name}|${student.department}|${student.year}`;
  
//   return `https://quickchart.io/barcode?type=code128&text=${encodeURIComponent(barcodeData)}&width=400&height=100`;
// };

/**
 * OPTION 4: Barcode API (barcode-api.com)
 * Simple and straightforward
 */
// export const generateBarcodeWithDetails = (student) => {
//   const barcodeData = `${student.matricNumber}|${student.name}|${student.department}|${student.year}`;
  
//   return `https://barcode-api.com/api/barcode?code=${encodeURIComponent(barcodeData)}&type=code128&width=400&height=100`;
// };

/**
 * OPTION 5: Simplified version (Matric Number Only)
 * If full data is too long, use just the matric number
 */
// export const generateBarcodeWithDetails = (student) => {
//   // Clean the matric number (remove special characters)
//   const cleanMatric = student.matricNumber.replace(/[^A-Za-z0-9]/g, '');
  
//   return `https://barcode.tec-it.com/barcode.ashx?data=${cleanMatric}&code=Code128&dpi=96&imagetype=Gif`;
// };

/**
 * OPTION 6: QR Code as Alternative (Most Reliable)
 * If barcodes keep failing, QR codes work everywhere
 */
// export const generateBarcodeWithDetails = (student) => {
//   const barcodeData = `${student.matricNumber}|${student.name}|${student.department}|${student.year}`;
  
//   return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(barcodeData)}`;
// };