import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for PDF Generation (Mock implementation)
  app.post("/api/reports/generate-pdf", (req, res) => {
    const { studentId, examId } = req.body;
    console.log(`Generating PDF for student ${studentId}, exam ${examId}`);
    
    // In a real app, you'd use a library like puppeteer or pdfkit here
    // For this demo, we'll just return a success message
    res.json({ 
      success: true, 
      message: "PDF generated successfully",
      downloadUrl: `/api/reports/download/${studentId}_report.pdf` 
    });
  });

  // API Route for Excel Export
  app.post("/api/reports/export-excel", (req, res) => {
    res.json({ 
      success: true, 
      message: "Excel export ready",
      downloadUrl: "/api/reports/download/merit_list.xlsx" 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
