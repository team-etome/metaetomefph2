import * as XLSX from 'xlsx';

const generateExcelFile = () => {
  const data = [
    ["First Name", "Last Name", "Email", "Phone Number", "Password", "Gender", "Employee ID"],
    // You can add more rows if needed, or leave it with only headers
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Set the width of each column
  worksheet['!cols'] = [
    { wch: 20 }, 
    { wch: 20 },
    { wch: 30 },
    { wch: 15 },
    { wch: 20 }, 
    { wch: 10 }, 
    { wch: 20 }  
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Teachers");

  XLSX.writeFile(workbook, 'teachers_template.xlsx');
};

export default generateExcelFile;
