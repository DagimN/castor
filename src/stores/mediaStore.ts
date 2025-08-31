import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMediaStore = create<{
  files: string[];
  selectedFile?: string;
  setFiles: (files: string[]) => void;
  setSelectedFile: (file: string | undefined) => void;
}>()(
  persist(
    (set) => ({
      files: [],
      selectedFile: undefined,
      setFiles: (files) => set({ files }),
      setSelectedFile: (file) => set({ selectedFile: file }),
    }),
    {
      name: "media-store",
    }
  )
);
