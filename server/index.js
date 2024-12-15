import express from 'express';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { convertImage } from './imageConverter.js';
import { convertVideo } from './videoConverter.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Create uploads and converted directories
import { mkdirSync } from 'fs';
const uploadsDir = join(__dirname, 'uploads');
const convertedDir = join(__dirname, 'converted');
mkdirSync(uploadsDir, { recursive: true });
mkdirSync(convertedDir, { recursive: true });

app.use(express.static('dist'));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: uploadsDir
}));

app.post('/api/convert', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No file uploaded');
    }

    const { file } = req.files;
    const outputFormat = req.body.outputFormat;
    const isVideo = file.mimetype.startsWith('video/');
    
    const outputPath = join(convertedDir, `output.${outputFormat}`);
    
    if (isVideo) {
      await convertVideo(file.tempFilePath, outputPath);
    } else {
      await convertImage(file.tempFilePath, outputPath);
    }

    res.download(outputPath);
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).send('Error converting file');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});