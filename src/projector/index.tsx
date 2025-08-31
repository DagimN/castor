import { useEffect } from "react";

const Projector = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.electron.closeProjectorWindow();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <main className="flex flex-col h-full p-4">Projector Window</main>;
};

export default Projector;
