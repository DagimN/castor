export {};

declare global {
  interface Window {
    electron: {
      openFileDialog: () => Promise<string[]>;
      loadFile: (filePath: string) => Promise<string[]>;
      openProjectorWindow: () => void;
      closeProjectorWindow: () => void;
      sendMediaToProjector: (
        base64,
        verse?: string,
        styles?: string
      ) => Promise<string>;
      sendLyricToProjector: (base64, lyric?: string, styles?: string) => Promise<string>;
      onMediaUpdate: (
        callback: (newSource: string, verse?: string, styles?: string) => void
      ) => void;
      onLyricUpdate: (callback: (newSource: string, lyric?: string, styles?: string) => void) => void;
      onSlideUpdate: (callback: (nav: string) => void) => void;
      removeMediaUpdateListener: (
        callback: (newSource: string) => void
      ) => void;
      removeLyricUpdateListener: (
        callback: (newSource: string) => void
      ) => void;
      removeSlideUpdateListener: (
        callback: (nav: string) => void
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
      getLocalIP: () => Promise<string>;
      setRemoteImages: (images: string[]) => void;
    };
  }
}
