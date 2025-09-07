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
  sendLyricToProjector: (base64, lyric) => {
    ipcRenderer.send("lyric-update", base64, lyric);
  },
  onMediaUpdate: (callback) =>
    ipcRenderer.on("media-update", (_, newSource, verse) => {
      callback(newSource, verse);
    }),
  onLyricUpdate: (callback) =>
    ipcRenderer.on("lyric-update", (_, newSource, lyric) => {
      callback(newSource, lyric);
    }),
  onVideoCommand: (callback) =>
    ipcRenderer.on("video-control", (_, { command, payload }) => {
      callback({ command, payload });
    }),
  removeMediaUpdateListener: (callback) => {
    ipcRenderer.removeListener("media-update", callback);
  },
  removeLyricUpdateListener: (callback) => {
    ipcRenderer.removeListener("lyric-update", callback);
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
  fetchWebsite: (url, selector) =>
    ipcRenderer.invoke("fetch-website", url, selector),
});
