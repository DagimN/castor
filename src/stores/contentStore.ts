import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TextStyles = {
  color: string;
  fontSize: number;
  textAlign: string;
  fontWeight: string;
};

export const defaultTextStyles: TextStyles = {
  color: "white",
  fontSize: 56,
  textAlign: "text-center",
  fontWeight: "bold",
};

export const useContentStore = create<{
  textStyles: TextStyles;
  lyrics: string[][];
  setTextStyles: (textStyles: TextStyles) => void;
  setLyrics: (lyrics: string[][]) => void;
}>()(
  persist(
    (set) => ({
      textStyles: defaultTextStyles,
      lyrics: [[]],
      setTextStyles: (styles) => set({ textStyles: styles }),
      setLyrics: (lyrics) => set({ lyrics }),
    }),
    {
      name: "media-store",
    }
  )
);
