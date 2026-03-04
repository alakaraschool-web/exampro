import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.json({
    success: true,
    message: 'Excel export ready',
    downloadUrl: '/api/reports/download/merit_list.xlsx',
  });
}
