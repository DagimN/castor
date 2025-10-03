import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MediaFile = {
  path: string;
  source: string[];
};

export const useMediaStore = create<{
  files: MediaFile[];
  selectedFile?: string;
  selectedSource?: string[];
  setFiles: (files: MediaFile[]) => void;
  setSelectedFile: (
    file: string | undefined,
    source: string[] | undefined
  ) => void;
}>()(
  persist(
    (set) => ({
      files: [],
      selectedFile: undefined,
      selectedSource: undefined,
      setFiles: (files) => set({ files }),
      setSelectedFile: (file, source) =>
        set({ selectedFile: file, selectedSource: source }),
    }),
    {
      name: "media-store",
    }
  )
);
