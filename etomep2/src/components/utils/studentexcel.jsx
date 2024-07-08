import * as XLSX from 'xlsx';

const studentexcel = () => {
  const data = [
    [
      
        "Student Name",
        "Admission Number",
        "Roll Number",
        "Number",
        "Email",
        "Gender",
        "Date of Birth",
        "Start Date",
        "Fathers Name",
        "Mothers Name",
        "Address",
        "Guardian"
      ],
    
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
  XLSX.utils.book_append_sheet(workbook, worksheet, "Student");

  XLSX.writeFile(workbook, 'student_template.xlsx');
};

export default studentexcel;
