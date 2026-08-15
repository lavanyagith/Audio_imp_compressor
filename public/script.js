document.addEventListener('DOMContentLoaded', () => {
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeBtn = document.getElementById('removeBtn');
const compressBtn = document.getElementById('compressBtn');
const btnText = compressBtn.querySelector('.btn-text');
const btnLoader = compressBtn.querySelector('.btn-loader');
const progressMessage = document.getElementById('progressMessage');
const result = document.getElementById('result');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

let currentFile = null;

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// File input
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// Remove file
removeBtn.addEventListener('click', resetFile);

// Compress click
compressBtn.addEventListener('click', async () => {
    if (!currentFile) return;
    await compressFile();
});

function handleFile(file) {
    const allowedExts = [
        '.jpg','.jpeg','.png','.bmp','.tiff','.webp',
        '.mp3','.wav','.ogg','.flac','.m4a','.aac'
    ];

    const fileExt = '.' + file.name.split('.').pop().toLowerCase();

    if (!allowedExts.includes(fileExt)) {
        showError('Unsupported file type. Please upload an image or audio file.');
        return;
    }

    currentFile = file;

    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);

    fileInfo.style.display = 'block';
    uploadArea.style.display = 'none';
    compressBtn.disabled = false;

    hideError();
    hideResult();
}

function resetFile() {
    currentFile = null;
    fileInput.value = '';

    fileInfo.style.display = 'none';
    uploadArea.style.display = 'block';
    compressBtn.disabled = true;

    hideError();
    hideResult();
}

async function compressFile() {
    setLoading(true);
    hideError();
    hideResult();

    const formData = new FormData();
    formData.append('file', currentFile);

    try {
        console.log('Sending compression request...');
        const response = await fetch('/compress-with-preview', {
            method: 'POST',
            body: formData
        });

        console.log('Response received:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            throw new Error(errorText || 'Compression failed');
        }

        const blob = await response.blob();
        console.log('Blob received:', blob.type, blob.size);
        const blobUrl = URL.createObjectURL(blob);
        console.log('Blob URL created:', blobUrl);

        const originalSize = parseInt(response.headers.get('X-Original-Size') || currentFile.size);
        const compressedSize = parseInt(response.headers.get('X-Compressed-Size') || blob.size);
        const fileType = response.headers.get('X-File-Type');
        console.log('File info:', { originalSize, compressedSize, fileType });

        showResult({
            blobUrl,
            blob,
            originalSize,
            compressedSize,
            fileType
        });

    } catch (err) {
        console.error('Compression error:', err);
        showError(err.message || 'Something went wrong. Please try again.');
    } finally {
        setLoading(false);
    }
}

function setLoading(loading) {
    if (loading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        compressBtn.disabled = true;
        progressMessage.style.display = 'block';
    } else {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        compressBtn.disabled = false;
        progressMessage.style.display = 'none';
    }
}

function showResult(data) {
    console.log('showResult called with:', data);
    document.getElementById('originalSize').textContent = formatFileSize(data.originalSize);
    document.getElementById('compressedSize').textContent = formatFileSize(data.compressedSize);

    const savings = document.getElementById('savings');
    const ratio = data.originalSize > 0 ? ((data.originalSize - data.compressedSize) / data.originalSize * 100).toFixed(1) : 0;

    if (ratio > 0) {
        savings.textContent = `Saved ${ratio}% of original size`;
        savings.style.color = '#4caf50';
        savings.style.background = 'rgba(76, 175, 80, 0.15)';
    } else if (ratio < 0) {
        savings.textContent = `Size increased by ${Math.abs(ratio)}%`;
        savings.style.color = '#ff9800';
        savings.style.background = 'rgba(255, 152, 0, 0.15)';
    } else {
        savings.textContent = 'No size change';
        savings.style.color = '#a0a0a0';
        savings.style.background = 'rgba(160, 160, 160, 0.15)';
    }
    savings.style.display = 'block';

    const previewContainer = document.getElementById('previewContainer');
    console.log('Preview container found:', previewContainer);
    previewContainer.innerHTML = '';

    console.log('Creating preview for type:', data.fileType);
    if (data.fileType === 'image') {
        console.log('Creating image element');
        const img = document.createElement('img');
        img.src = data.blobUrl;
        img.alt = 'Compressed Image';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '250px';
        img.style.borderRadius = '8px';
        img.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        img.onload = () => console.log('Image loaded successfully');
        img.onerror = (e) => console.error('Image failed to load:', e);
        previewContainer.appendChild(img);
    } else if (data.fileType === 'audio') {
        console.log('Creating audio element');
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = data.blobUrl;
        audio.style.width = '100%';
        audio.style.borderRadius = '8px';
        previewContainer.appendChild(audio);
    } else {
        console.warn('Unknown file type:', data.fileType);
    }

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.onclick = (e) => {
        e.preventDefault();
        const a = document.createElement('a');
        a.href = data.blobUrl;
        a.download = 'compressed_' + currentFile.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    console.log('Showing result section');
    result.style.display = 'block';
}

function hideResult() {
    result.style.display = 'none';
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) previewContainer.innerHTML = '';
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + units[i];
}
});
