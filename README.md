# File Converter

A full-stack web application that allows users to convert image and video files between different formats. Built with React, Express, Sharp (for image processing), and FFmpeg (for video processing).

![File Converter Screenshot](https://images.unsplash.com/photo-1618609378039-b572f64c5b42?auto=format&fit=crop&q=80&w=800&h=400)

## Features

- 🖼️ Image conversion (JPG, PNG, WebP)
- 🎥 Video conversion (MP4, AVI, MOV)
- 📱 Responsive design
- 🖱️ Drag and drop file upload
- 📊 Progress indication
- ⬇️ Automatic file download after conversion

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [FFmpeg](https://ffmpeg.org/) for video conversion

### Installing FFmpeg

#### On Raspberry Pi / Debian / Ubuntu:
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

#### On macOS:
```bash
brew install ffmpeg
```

#### On Windows:
1. Download FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html)
2. Add FFmpeg to your system's PATH

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd file-converter
```

2. Install dependencies:
```bash
npm install
```

3. Build the frontend:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Development

To run the application in development mode with hot reloading:

```bash
npm run dev
```

This will start both the frontend development server and the backend server concurrently.

## Project Structure

```
/
├── src/                    # Frontend React code
│   ├── components/         # React components
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main React component
│   └── main.tsx           # React entry point
├── server/                 # Backend Express code
│   ├── index.js           # Main server file
│   ├── imageConverter.js  # Image conversion logic
│   └── videoConverter.js  # Video conversion logic
└── dist/                  # Built frontend files
```

## API Endpoints

### POST /api/convert
Converts an uploaded file to the specified format.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - file: File to convert
  - outputFormat: Desired output format (e.g., 'png', 'mp4')

**Response:**
- 200: Returns the converted file for download
- 400: No file uploaded
- 500: Conversion error

## Supported Formats

### Images
- JPG/JPEG
- PNG
- WebP

### Videos
- MP4
- AVI
- MOV

## Running on a Raspberry Pi

1. Follow the installation steps above
2. To make the server accessible on your local network:
   ```bash
   # Find your Raspberry Pi's IP address
   hostname -I
   ```
3. Access the converter from other devices using:
   ```
   http://<raspberry-pi-ip>:3000
   ```

## Environment Variables

No environment variables are required for basic setup. The server runs on port 3000 by default.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Sharp](https://sharp.pixelplumbing.com/) for image processing
- [FFmpeg](https://ffmpeg.org/) for video processing
- [React](https://reactjs.org/) for the frontend framework
- [Express](https://expressjs.com/) for the backend server
- [Tailwind CSS](https://tailwindcss.com/) for styling