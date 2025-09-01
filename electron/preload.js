const { contextBridge, ipcRenderer } = require("electron");
const { on } = require("events");

contextBridge.exposeInMainWorld("electron", {
  openFileDialog: () => ipcRenderer.invoke("open-file-dialog"),
  loadFile: (filePath) => ipcRenderer.invoke("load-file", filePath),
  openProjectorWindow: () => ipcRenderer.send("open-projector-window"),
  closeProjectorWindow: () => ipcRenderer.send("close-projector-window"),
  sendMediaToProjector: (base64, verse) => {
    ipcRenderer.send("media-update", base64, verse);
  },
  onMediaUpdate: (callback) =>
    ipcRenderer.on("media-update", (_, newSource, verse) => {
      callback(newSource, verse);
    }),
  onVideoCommand: (callback) =>
    ipcRenderer.on("video-control", (_, { command, payload }) => {
      callback({ command, payload });
    }),
  removeMediaUpdateListener: (callback) => {
    ipcRenderer.removeListener("media-update", callback);
  },
  removeVideoCommandListener: (callback) => {
    ipcRenderer.removeListener("video-control", callback);
  },
  sendVideoCommand: (command, payload) => {
    ipcRenderer.send("video-control", { command, payload });
  },
  fetchImageMetadata: (filePath) =>
    ipcRenderer.invoke("fetch-image-metadata", filePath),
  fetchVideoMetadata: (filePath, callback) =>
    ipcRenderer.invoke("fetch-video-metadata", filePath),
});
