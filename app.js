const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Enable CORS
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Set up a simple HTML form for video upload
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle video upload
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    
    return res.status(400).send('No file uploaded.');
  }

  const videoUrl = `/uploads/${req.file.filename}`;
  console.log('Video URL:', videoUrl);
  res.send(`Video uploaded successfully! <br> <a href="${videoUrl}">View Video</a>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
