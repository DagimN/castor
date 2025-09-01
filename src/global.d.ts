export {};

declare global {
  interface Window {
    electron: {
      openFileDialog: () => Promise<string[]>;
      loadFile: (filePath: string) => Promise<string>;
      openProjectorWindow: () => void;
      closeProjectorWindow: () => void;
      sendMediaToProjector: (base64, verse?: string) => Promise<string>;
      onMediaUpdate: (callback: (newSource: string) => void) => void;
      removeMediaUpdateListener: (
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
      fetchVideoMetadata: (
        filePath: string
      ) => Promise<any>;
    };
  }
}
