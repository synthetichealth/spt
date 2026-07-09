const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sptDesktop', {
  selectDirectory: () => ipcRenderer.invoke('spt:select-directory'),
});
