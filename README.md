# Audio + Image/Video Compression System

A web-based multimedia compression system designed to reduce the size of **audio, image, and video files** while maintaining a practical balance between file size and media quality.

The project combines a **Node.js + Express backend** with a **Python-based compression module** and a simple web interface for uploading media, processing files, and accessing the compressed output.

---

## 📌 Project Overview

Large multimedia files require significant storage space and consume more bandwidth during upload, download, and sharing.

This project provides a simple platform where users can:

* Upload multimedia files through a web interface
* Process media using compression algorithms
* Reduce the resulting file size
* Store compressed files separately from uploaded files
* Access the generated compressed output
* Perform the complete workflow through a browser-based interface

The system is designed as a lightweight multimedia compression application that demonstrates the integration of **web development, backend processing, file handling, and Python-based media processing**.

---

## ✨ Features

### 🎵 Audio Compression

* Upload audio files through the web interface
* Process audio using the compression module
* Generate a compressed audio file
* Reduce storage requirements while maintaining usable audio quality

### 🖼️ Image Compression

* Upload image files
* Process images using the Python compression module
* Generate optimized/compressed images
* Reduce image file size for easier storage and sharing

### 🎬 Video Compression

* Upload video files
* Process video through the backend and compression pipeline
* Generate a reduced-size video output
* Maintain a practical balance between compression and quality

### 🌐 Web-Based Interface

* Simple browser-based interface
* File upload functionality
* User-friendly workflow
* Displays the compression process/results

### ⚙️ Backend Processing

* Node.js backend using Express
* Multipart file upload handling using Multer
* File-system management using Node.js `fs` and `path`
* Separate directories for uploaded and processed files
* Python integration for compression processing

### 📦 Output Management

* Original uploaded files are stored separately
* Compressed files are generated in the output directory
* Helps maintain a clean processing workflow

---

## 🛠️ Technologies Used

| Technology           | Purpose                                 |
| -------------------- | --------------------------------------- |
| **HTML5**            | Web page structure                      |
| **CSS3**             | User interface styling                  |
| **JavaScript**       | Frontend interaction                    |
| **Node.js**          | Backend runtime                         |
| **Express.js**       | Web server and API handling             |
| **Multer**           | File upload and multipart form handling |
| **Python**           | Media compression processing            |
| **File System (fs)** | File management                         |
| **Path Module**      | File/directory path handling            |
| **npm**              | Node.js dependency management           |

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    │  Upload Media File   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Web Frontend       │
                    │ HTML / CSS / JS      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js Server     │
                    │      Express.js      │
                    └──────────┬───────────┘
                               │
                       File Upload
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Multer Handler     │
                    │  Upload Management   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Python Compression   │
                    │      Module          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Compressed Output    │
                    │       /output        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Result to User     │
                    └──────────────────────┘
```

---

## 📂 Project Structure

```text
MMC_A2/
│
├── README.md
│
├── server.js
├── package.json
├── package-lock.json
│
├── compressor.py
├── requirements.txt
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── uploads/
│   └── Uploaded media files
│
└── output/
    └── Compressed media files
```

### File Description

**`server.js`**
Main Node.js server responsible for running the web application, handling requests, managing uploads, and connecting the web interface with the compression process.

**`compressor.py`**
Python-based compression module responsible for media processing.

**`public/index.html`**
Defines the structure of the web interface.

**`public/script.js`**
Handles frontend interactions and communication with the backend.

**`public/style.css`**
Contains styling for the web interface.

**`uploads/`**
Temporary/storage location for uploaded media files.

**`output/`**
Stores generated compressed media files.

**`package.json`**
Contains Node.js project metadata and dependencies.

**`requirements.txt`**
Contains Python dependencies required by the compression module.

---

# 🚀 Installation & Setup

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd MMC_A2
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your GitHub repository URL.

---

## 2. Verify Node.js Installation

Open a terminal and run:

```bash
node --version
npm --version
```

If Node.js is not installed, install the current LTS version from the official Node.js website.

---

## 3. Install Node.js Dependencies

Inside the project directory, run:

```bash
npm install
```

This installs the dependencies specified in `package.json`.

---

## 4. Verify Python Installation

Run:

```bash
python --version
```

or, depending on your system:

```bash
python3 --version
```

---

## 5. Install Python Dependencies

Run:

```bash
pip install -r requirements.txt
```

If your system uses `pip3`:

```bash
pip3 install -r requirements.txt
```

---

## 6. Start the Server

Run:

```bash
node server.js
```

The application should start on the configured local port.

For the current project configuration:

```text
http://localhost:3000
```

Open the address in a web browser.

---

# 💻 How to Use

### Step 1 — Open the Web Application

Navigate to:

```text
http://localhost:3000
```

### Step 2 — Select a Media File

Choose the audio, image, or video file that you want to compress.

### Step 3 — Upload the File

Submit the file through the web interface.

The Node.js backend receives and stores the uploaded file.

### Step 4 — Compression

The backend invokes the appropriate compression-processing workflow.

The Python compression module processes the media file.

### Step 5 — Generate Output

The compressed file is generated and stored inside:

```text
output/
```

### Step 6 — Access the Compressed File

The resulting compressed media can then be accessed through the application.

---

# 📸 Screenshots

Add screenshots of the working application below.

### Home Page

```text
![Home Page](screenshots/home-page.png)
```

### File Upload

```text
![File Upload](screenshots/file-upload.png)
```

### Compression Result

```text
![Compression Result](screenshots/compression-result.png)
```

### Project Output

```text
![Compressed Output](screenshots/compressed-output.png)
```

> **Note:** Create a `screenshots/` folder in the repository and place the corresponding images inside it before enabling these links.

Recommended structure:

```text
screenshots/
├── home-page.png
├── file-upload.png
├── compression-result.png
└── compressed-output.png
```

---

# 📊 Compression Workflow

The overall processing pipeline is:

```text
Media File
    │
    ▼
Upload through Web Interface
    │
    ▼
Node.js / Express Server
    │
    ▼
Multer File Handling
    │
    ▼
Uploaded File
    │
    ▼
Python Compression Module
    │
    ▼
Compressed Media
    │
    ▼
Output Directory
    │
    ▼
Compressed File Available to User
```

---

# 🔐 File Handling

The application separates input and output files into different directories.

```text
uploads/
    ↓
Original uploaded files

output/
    ↓
Compressed/generated files
```

This separation makes the processing pipeline easier to manage and prevents generated files from being mixed with the original uploads.

For production deployment, additional security measures such as file-type validation, file-size limits, temporary-file cleanup, and secure filename handling should be implemented.

---

# ⚡ Advantages

* Simple web-based interface
* Supports multiple multimedia categories
* Combines Node.js and Python processing
* Easy local deployment
* Separate upload and output management
* Modular architecture
* Can be extended with additional compression techniques
* Suitable for demonstrating multimedia processing and full-stack integration

---

# 🔮 Future Scope

The project can be further enhanced with several advanced features.

### 1. Advanced Compression Controls

Allow users to select:

* Compression level
* Target file size
* Quality level
* Resolution
* Bitrate
* Format

### 2. Compression Statistics

Display useful information such as:

```text
Original Size
Compressed Size
Space Saved
Compression Percentage
Processing Time
```

Example:

```text
Original Size      : 25 MB
Compressed Size    : 10 MB
Space Saved        : 15 MB
Reduction          : 60%
```

### 3. Batch Compression

Allow users to upload multiple files and process them automatically.

### 4. Drag-and-Drop Upload

Improve the user experience by supporting drag-and-drop file uploads.

### 5. Format Conversion

Add support for converting media between different supported formats.

### 6. Cloud Deployment

Deploy the application using cloud platforms and provide remote access to the compression service.

### 7. Database Integration

Store:

* Upload history
* Compression statistics
* File metadata
* Processing status
* User information

### 8. User Authentication

Add secure login and user-specific file management.

### 9. Compression Comparison

Provide a side-by-side comparison between the original and compressed media.

### 10. AI-Based Compression

A future version could use machine-learning techniques to dynamically determine suitable compression parameters based on:

* Media characteristics
* Desired quality
* Target file size
* Content complexity

---

# 🧪 Testing

The system should be tested using different types and sizes of multimedia files.

### Test Parameters

* Small media files
* Large media files
* Different image resolutions
* Different audio characteristics
* Different video resolutions
* Invalid file types
* Unsupported files
* Large upload sizes

Important metrics include:

* Compression ratio
* Output file size
* Processing time
* Output quality
* System stability

---

# 🛡️ Recommended Git Configuration

Do **not** upload generated dependencies and runtime files to GitHub.

Create a `.gitignore` file containing:

```gitignore
node_modules/
uploads/
output/
__pycache__/
*.pyc
.env
```

This keeps the repository clean and prevents unnecessary/generated files from being committed.

---

# 👨‍💻 Development

The project follows a modular structure:

```text
Frontend
   ↓
Node.js / Express Backend
   ↓
File Upload Management
   ↓
Python Compression Module
   ↓
Compressed Output
```

This architecture makes it easier to replace or improve individual components without redesigning the complete application.

---

# 📚 Learning Outcomes

This project demonstrates practical implementation of:

* Full-stack web application development
* Node.js backend development
* Express.js
* File upload handling
* Python integration
* Multimedia processing
* File-system management
* Frontend-backend communication
* Compression concepts
* Project organization
* Git and GitHub version control

---

# 🤝 Contributing

Contributions and improvements are welcome.

To contribute:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd MMC_A2
npm install
```

Create a new branch:

```bash
git checkout -b feature/your-feature
```

Make your changes, test the application, and submit a pull request.

---

# 📄 License

This project is developed for **academic and educational purposes**.

If this project is later released publicly, an appropriate open-source license such as MIT can be added.

---

# ⭐ Project Summary

**Audio + Image/Video Compression System** is a multimedia processing web application that integrates a **Node.js/Express backend, browser-based frontend, and Python compression module** to provide a simple workflow for uploading and compressing media files.

The project demonstrates how web technologies and media-processing tools can be integrated into a single application for practical multimedia optimization.

---

## 👤 Author

**Your Name**

Electronics & Communication Engineering

GitHub:lavanyagith



⭐ If you find this project useful, consider giving the repository a star!
