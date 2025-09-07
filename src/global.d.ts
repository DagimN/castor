export {};

declare global {
  interface Window {
    electron: {
      openFileDialog: () => Promise<string[]>;
      loadFile: (filePath: string) => Promise<string>;
      openProjectorWindow: () => void;
      closeProjectorWindow: () => void;
      sendMediaToProjector: (base64, verse?: string) => Promise<string>;
      sendLyricToProjector: (base64, lyric?: string) => Promise<string>;
      onMediaUpdate: (callback: (newSource: string) => void) => void;
      onLyricUpdate: (callback: (newSource: string) => void) => void;
      removeMediaUpdateListener: (
        callback: (newSource: string) => void
      ) => void;
      removeLyricUpdateListener: (
        callback: (newSource: string) => void
      ) => void;
      sendVideoCommand: (command: string, payload?: any) => void;
      onVideoCommand: (
        callback: (args: { command: string; payload: number }) => void
      ) => void;
      removeVideoCommandListener: (
        callback: (args: { command: string; payload: number }) => void
      ) => void;
      fetchImageMetadata: (filePath: string) => any;
      fetchVideoMetadata: (filePath: string) => Promise<any>;
      fetchWebsite: (url: string, selector?: string) => Promise<any>;
    };
  }
}
