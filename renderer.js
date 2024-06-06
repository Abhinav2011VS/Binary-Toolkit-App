const { ipcRenderer } = require('electron');

// File to Binary Conversion
function convertToBinary() {
    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryData = event.target.result;
        ipcRenderer.send('binaryData', binaryData);
    };

    reader.readAsArrayBuffer(file);
}

// Binary to File Conversion
function convertToOriginal() {
    const binaryFileInput = document.getElementById('binaryFileInput');

    const file = binaryFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryData = event.target.result;
        ipcRenderer.send('originalData', binaryData);
    };

    reader.readAsArrayBuffer(file);
}
