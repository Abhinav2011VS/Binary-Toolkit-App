const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('binaryData', (event, binaryData) => {
  const filePath = dialog.showSaveDialogSync({
    title: 'Save Binary File',
    defaultPath: path.join(app.getPath('desktop'), 'binaryFile.bin')
  });

  if (filePath) {
    fs.writeFile(filePath, Buffer.from(binaryData), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Binary file saved successfully.');
    });
  }
});

ipcMain.on('originalData', (event, binaryData) => {
  const filePath = dialog.showSaveDialogSync({
    title: 'Save Original File',
    defaultPath: path.join(app.getPath('desktop'), 'originalFile')
  });

  if (filePath) {
    fs.writeFile(filePath, Buffer.from(binaryData), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Original file saved successfully.');
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
