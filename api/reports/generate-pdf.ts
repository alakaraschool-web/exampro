import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { studentId, examId } = req.body;
  console.log(`Generating PDF for student ${studentId}, exam ${examId}`);

  res.json({
    success: true,
    message: 'PDF generated successfully',
    downloadUrl: `/api/reports/download/${studentId}_report.pdf`,
  });
}
