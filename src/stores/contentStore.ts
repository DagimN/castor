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
  setTextStyles: (textStyles: TextStyles) => void;
}>()(
  persist(
    (set) => ({
      textStyles: defaultTextStyles,
      setTextStyles: (styles) => set({ textStyles: styles }),
    }),
    {
      name: "media-store",
    }
  )
);
