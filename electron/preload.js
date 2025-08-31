const { contextBridge, ipcRenderer } = require("electron");
const { on } = require("events");

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
});
