const express = require('express');
const bodyParser = require('body-parser');
const bwipjs = require('bwip-js');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.post('/generateBarcode', (req, res) => {
  const { youtubeUrl } = req.body;

  // Generate QR code with YouTube video URL encoded
  const barcodeOptions = {
    bcid: 'qrcode', // QR code type
    text: youtubeUrl, // Text to encode
    scale: 3, // Scaling factor
    height: 24, // Height, in millimeters
    includetext: true, // Include the text below the barcode
    textxalign: 'center', // Text horizontal alignment
  };

  bwipjs.toBuffer(barcodeOptions, (err, pngBuffer) => {
    if (err) {
      console.error('Error generating barcode:', err);
      return res.status(500).json({ error: 'Failed to generate barcode' });
    }

    // Send the generated barcode image back to the frontend
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(pngBuffer);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
