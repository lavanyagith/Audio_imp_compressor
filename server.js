const express = require('express');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Ensure directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}_${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }
});

// Serve static files
app.use(express.static('public'));

// Compress with preview endpoint
app.post('/compress-with-preview', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const originalName = req.file.originalname;
    const fileExt = path.extname(originalName).toLowerCase();

    // Detect file type
    const imageExts = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'];
    const audioExts = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac'];

    let fileType;
    let mimeType;
    if (imageExts.includes(fileExt)) {
        fileType = 'image';
        mimeType = fileExt === '.png' ? 'image/png' :
                   fileExt === '.webp' ? 'image/webp' :
                   fileExt === '.bmp' ? 'image/bmp' :
                   fileExt === '.tiff' || fileExt === '.tif' ? 'image/tiff' :
                   'image/jpeg';
    } else if (audioExts.includes(fileExt)) {
        fileType = 'audio';
        mimeType = fileExt === '.mp3' ? 'audio/mpeg' :
                   fileExt === '.wav' ? 'audio/wav' :
                   fileExt === '.ogg' ? 'audio/ogg' :
                   fileExt === '.flac' ? 'audio/flac' :
                   fileExt === '.m4a' ? 'audio/mp4' :
                   fileExt === '.aac' ? 'audio/aac' :
                   'audio/mpeg';
    } else {
        fs.unlinkSync(inputPath);
        return res.status(400).json({ error: 'Unsupported file type' });
    }

    const timestamp = Date.now();
    const outputFileName = `compressed_${timestamp}_${originalName}`;
    const outputPath = path.join(outputDir, outputFileName);

    // Call Python script
    const pythonProcess = spawn('python', [
        'compressor.py',
        inputPath,
        outputPath,
        fileType
    ]);

    let errorOutput = '';

    pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
        // Clean up uploaded file
        try {
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        } catch (err) {
            console.error('Error deleting input file:', err);
        }

        if (code !== 0 || !fs.existsSync(outputPath)) {
            console.error('Python error:', errorOutput);
            return res.status(500).json({ error: 'Compression failed' });
        }

        // Get file sizes
        const originalSize = req.file.size;
        let compressedSize = 0;
        try {
            compressedSize = fs.statSync(outputPath).size;
        } catch (err) {
            console.error('Error getting compressed file size:', err);
        }

        // Set headers for file info
        res.setHeader('X-Original-Size', originalSize);
        res.setHeader('X-Compressed-Size', compressedSize);
        res.setHeader('X-File-Type', fileType);
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${outputFileName}"`);

        // Stream the file
        const fileStream = fs.createReadStream(outputPath);
        fileStream.pipe(res);

        // Clean up after response
        res.on('finish', () => {
            setTimeout(() => {
                try {
                    if (fs.existsSync(outputPath)) {
                        fs.unlinkSync(outputPath);
                        console.log('Cleaned up:', outputFileName);
                    }
                } catch (err) {
                    console.error('Error deleting output file:', err);
                }
            }, 30000);
        });

        res.on('error', (err) => {
            console.error('Response error:', err);
            fileStream.destroy();
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
