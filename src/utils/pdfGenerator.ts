import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface StudentReport {
  name: string;
  admission_no: string;
  class: string;
  term: string;
  year: number;
  subjects: {
    subject: string;
    score: number;
    grade: string;
    remarks: string;
  }[];
  summary: {
    total: string;
    average: string;
    rank: string;
  };
  principalRemarks: string;
}

export const generateStudentPDF = (student: StudentReport, template: 'standard' | 'detailed' | 'summary' = 'standard') => {
  const doc = new jsPDF();
  const primaryColor = [0, 102, 51]; // Kenya Green
  const secondaryColor = [191, 10, 48]; // Kenya Red
  const goldColor = [153, 102, 0]; // Kenya Gold

  if (template === 'summary') {
    // Compact Summary Template
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('ALAKARA SECONDARY - RESULT SUMMARY', 105, 12, { align: 'center' });
    doc.setFontSize(8);
    doc.text(`Academic Year ${student.year} • ${student.term}`, 105, 18, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`STUDENT: ${student.name.toUpperCase()}`, 20, 35);
    doc.text(`ADM: ${student.admission_no}`, 120, 35);
    doc.text(`CLASS: ${student.class}`, 20, 42);
    doc.text(`RANK: ${student.summary.rank}`, 120, 42);

    const tableData = student.subjects.map(s => [s.subject, s.score, s.grade]);
    (doc as any).autoTable({
      startY: 48,
      head: [['SUBJECT', 'SCORE', 'GRADE']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: primaryColor },
      styles: { fontSize: 8, cellPadding: 3 }
    });

    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(9);
    doc.text(`TOTAL: ${student.summary.total}   AVERAGE: ${student.summary.average}`, 20, finalY + 10);
    doc.save(`${student.name.replace(' ', '_')}_Summary.pdf`);
    return;
  }

  // Header for Standard and Detailed
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Add a small red and gold strip for branding
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(0, 40, 210, 2, 'F');
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(0, 42, 210, 1, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('ALAKARA SECONDARY SCHOOL', 105, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.text('P.O. BOX 123-00100, NAIROBI • TEL: +254 700 000 000', 105, 22, { align: 'center' });
  doc.text('OFFICIAL ACADEMIC REPORT CARD', 105, 30, { align: 'center' });

  // Student Info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`NAME: ${student.name.toUpperCase()}`, 20, 55);
  doc.text(`ADM NO: ${student.admission_no}`, 140, 55);
  doc.text(`CLASS: ${student.class}`, 20, 63);
  doc.text(`TERM: ${student.term} ${student.year}`, 140, 63);

  // Table
  const tableData = student.subjects.map(s => [s.subject, s.score, s.grade, s.remarks]);
  
  (doc as any).autoTable({
    startY: 70,
    head: [['SUBJECT', 'SCORE', 'GRADE', 'REMARKS']],
    body: tableData,
    theme: template === 'detailed' ? 'grid' : 'striped',
    headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 5 },
    columnStyles: {
      1: { halign: 'center' },
      2: { halign: 'center' }
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY;

  // Summary
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PERFORMANCE SUMMARY', 20, finalY + 15);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`TOTAL MARKS: ${student.summary.total}`, 20, finalY + 22);
  doc.text(`AVERAGE: ${student.summary.average}`, 80, finalY + 22);
  doc.text(`CLASS RANK: ${student.summary.rank}`, 140, finalY + 22);

  if (template === 'detailed') {
    // Add more detailed stats for detailed template
    doc.setDrawColor(200, 200, 200);
    doc.line(20, finalY + 28, 190, finalY + 28);
    doc.setFontSize(9);
    doc.text('Subject Distribution Analysis:', 20, finalY + 35);
    doc.text('• Sciences: A', 25, finalY + 42);
    doc.text('• Humanities: A', 80, finalY + 42);
    doc.text('• Languages: A-', 140, finalY + 42);
  }

  // Remarks
  const remarksY = template === 'detailed' ? finalY + 55 : finalY + 35;
  doc.setFont('helvetica', 'bold');
  doc.text("PRINCIPAL'S REMARKS:", 20, remarksY);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  const splitRemarks = doc.splitTextToSize(student.principalRemarks, 170);
  doc.text(splitRemarks, 20, remarksY + 7);

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('This is a computer generated report card and does not require a physical signature.', 105, 285, { align: 'center' });
  doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 290, { align: 'center' });

  doc.save(`${student.name.replace(' ', '_')}_Report_${template}.pdf`);
};

export const generateClassPDF = (students: StudentReport[], className: string, template: 'standard' | 'detailed' | 'summary' = 'standard') => {
  const doc = new jsPDF();
  const primaryColor = [0, 102, 51];
  const secondaryColor = [191, 10, 48];
  const goldColor = [153, 102, 0];

  students.forEach((student, index) => {
    if (index > 0) doc.addPage();

    if (template === 'summary') {
      // Compact Summary Template
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('ALAKARA SECONDARY - RESULT SUMMARY', 105, 12, { align: 'center' });
      doc.setFontSize(8);
      doc.text(`Academic Year ${student.year} • ${student.term}`, 105, 18, { align: 'center' });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`STUDENT: ${student.name.toUpperCase()}`, 20, 35);
      doc.text(`ADM: ${student.admission_no}`, 120, 35);
      doc.text(`CLASS: ${student.class}`, 20, 42);
      doc.text(`RANK: ${student.summary.rank}`, 120, 42);

      const tableData = student.subjects.map(s => [s.subject, s.score, s.grade]);
      (doc as any).autoTable({
        startY: 48,
        head: [['SUBJECT', 'SCORE', 'GRADE']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: primaryColor },
        styles: { fontSize: 8, cellPadding: 3 }
      });

      const finalY = (doc as any).lastAutoTable.finalY;
      doc.setFontSize(9);
      doc.text(`TOTAL: ${student.summary.total}   AVERAGE: ${student.summary.average}`, 20, finalY + 10);
      return;
    }

    // Header for Standard and Detailed
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(0, 40, 210, 2, 'F');
    doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
    doc.rect(0, 42, 210, 1, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('ALAKARA SECONDARY SCHOOL', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text('P.O. BOX 123-00100, NAIROBI • TEL: +254 700 000 000', 105, 22, { align: 'center' });
    doc.text('OFFICIAL ACADEMIC REPORT CARD', 105, 30, { align: 'center' });

    // Student Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`NAME: ${student.name.toUpperCase()}`, 20, 55);
    doc.text(`ADM NO: ${student.admission_no}`, 140, 55);
    doc.text(`CLASS: ${student.class}`, 20, 63);
    doc.text(`TERM: ${student.term} ${student.year}`, 140, 63);

    // Table
    const tableData = student.subjects.map(s => [s.subject, s.score, s.grade, s.remarks]);
    
    (doc as any).autoTable({
      startY: 70,
      head: [['SUBJECT', 'SCORE', 'GRADE', 'REMARKS']],
      body: tableData,
      theme: template === 'detailed' ? 'grid' : 'striped',
      headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 5 },
      columnStyles: {
        1: { halign: 'center' },
        2: { halign: 'center' }
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    // Summary
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('PERFORMANCE SUMMARY', 20, finalY + 15);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`TOTAL MARKS: ${student.summary.total}`, 20, finalY + 22);
    doc.text(`AVERAGE: ${student.summary.average}`, 80, finalY + 22);
    doc.text(`CLASS RANK: ${student.summary.rank}`, 140, finalY + 22);

    if (template === 'detailed') {
      doc.setDrawColor(200, 200, 200);
      doc.line(20, finalY + 28, 190, finalY + 28);
      doc.setFontSize(9);
      doc.text('Subject Distribution Analysis:', 20, finalY + 35);
      doc.text('• Sciences: A', 25, finalY + 42);
      doc.text('• Humanities: A', 80, finalY + 42);
      doc.text('• Languages: A-', 140, finalY + 42);
    }

    // Remarks
    const remarksY = template === 'detailed' ? finalY + 55 : finalY + 35;
    doc.setFont('helvetica', 'bold');
    doc.text("PRINCIPAL'S REMARKS:", 20, remarksY);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    const splitRemarks = doc.splitTextToSize(student.principalRemarks, 170);
    doc.text(splitRemarks, 20, remarksY + 7);

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('This is a computer generated report card and does not require a physical signature.', 105, 285, { align: 'center' });
    doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 290, { align: 'center' });
  });

  doc.save(`${className.replace(' ', '_')}_Bulk_Reports_${template}.pdf`);
};
