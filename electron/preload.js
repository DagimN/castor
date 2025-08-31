const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openFileDialog: () => ipcRenderer.invoke("open-file-dialog"),
  loadFile: (filePath) => ipcRenderer.invoke("load-file", filePath),
  openProjectorWindow: () => ipcRenderer.send("open-projector-window"),
  closeProjectorWindow: () => ipcRenderer.send("close-projector-window"),
  sendMediaToProjector: (base64) => {
    ipcRenderer.send("media-update", base64);
  },
  onMediaUpdate: (callback) =>
    ipcRenderer.on("media-update", (_, newSource) => {
      callback(newSource);
    }),
  removeMediaUpdateListener: (callback) => {
    ipcRenderer.removeListener("media-update", callback);
  },
});
