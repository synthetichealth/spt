const fs = require('fs');
const path = require('path');
const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');

let serverInfo;

function configureStorage() {
  const userDataPath = app.getPath('userData');
  fs.mkdirSync(userDataPath, { recursive: true });
  process.env.SPT_DB_PATH = path.join(userDataPath, 'spt.db');
}

async function ensureServer() {
  if (serverInfo) return serverInfo;

  configureStorage();

  const { startServer } = require('../server');
  serverInfo = await startServer({ port: 0, host: '127.0.0.1' });
  return serverInfo;
}

function openExternalUrl(url) {
  shell.openExternal(url);
}

function registerIpcHandlers() {
  ipcMain.handle('spt:select-directory', async (event) => {
    const browserWindow = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(browserWindow, {
      properties: ['openDirectory'],
    });

    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  });
}

async function createWindow() {
  const { url } = await ensureServer();
  const appUrl = `${url}/spt`;

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 720,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
    },
  });

  win.webContents.setWindowOpenHandler(({ url: targetUrl }) => {
    openExternalUrl(targetUrl);
    return { action: 'deny' };
  });

  win.webContents.on('will-navigate', (event, targetUrl) => {
    if (!targetUrl.startsWith(url)) {
      event.preventDefault();
      openExternalUrl(targetUrl);
    }
  });

  await win.loadURL(appUrl);
}

function handleStartupError(error) {
  console.error(error);
  app.quit();
}

app
  .whenReady()
  .then(() => {
    registerIpcHandlers();
    return createWindow();
  })
  .catch(handleStartupError);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow().catch(handleStartupError);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverInfo?.server?.listening) {
    serverInfo.server.close();
  }
});
