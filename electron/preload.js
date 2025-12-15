const { contextBridge, ipcRenderer } = require("electron");
const { on } = require("events");

contextBridge.exposeInMainWorld("electron", {
  openFileDialog: () => ipcRenderer.invoke("open-file-dialog"),
  loadFile: (filePath) => ipcRenderer.invoke("load-file", filePath),
  openProjectorWindow: () => ipcRenderer.send("open-projector-window"),
  closeProjectorWindow: () => ipcRenderer.send("close-projector-window"),
  sendMediaToProjector: (base64, verse, styles, color) => {
    ipcRenderer.send("media-update", base64, verse, styles, color);
  },
  sendLyricToProjector: (base64, lyric, styles, color) => {
    ipcRenderer.send("lyric-update", base64, lyric, styles, color);
  },
  onMediaUpdate: (callback) =>
    ipcRenderer.on("media-update", (_, newSource, verse, styles, color) => {
      callback(newSource, verse, styles, color);
    }),
  onLyricUpdate: (callback) =>
    ipcRenderer.on("lyric-update", (_, newSource, lyric, styles, color) => {
      callback(newSource, lyric, styles, color);
    }),
  onSlideUpdate: (callback) => {
    ipcRenderer.removeAllListeners("slide-update");
    ipcRenderer.on("slide-update", (_, nav) => {
      callback(nav);
    });
  },
  onSourceIndexUpdate: (callback) =>
    ipcRenderer.on("source-index-update", (_, index) => callback(index)),
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
  removeSlideUpdateListener: (callback) => {
    ipcRenderer.removeListener("slide-update", callback);
  },
  removeSourceIndexUpdateListener: (callback) => {
    ipcRenderer.removeListener("source-index-update", callback);
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
  getLocalIP: () => ipcRenderer.invoke("get-local-ip"),
  setRemoteImages: (images) => ipcRenderer.invoke("set-remote-images", images),
  onDownloadProgress: (callback) =>
    ipcRenderer.on("download_progress", (_, progress) => callback(progress)),
});
