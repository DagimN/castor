export {};

declare global {
  interface Window {
    electron: {
      openFileDialog: () => Promise<string[]>;
      loadFile: (filePath: string) => Promise<string>;
      openProjectorWindow: () => void;
      closeProjectorWindow: () => void;
    };
  }
}
