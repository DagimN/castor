import { useEffect, useState } from "react";

const Projector = () => {
  const [source, setSource] = useState<string>();

  useEffect(() => {
    const handleUpdate = (newSource: string) => {
      setSource(newSource);
    };

    window.electron.onMediaUpdate(handleUpdate);

    return () => {
      window.electron.removeMediaUpdateListener(handleUpdate);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.electron.closeProjectorWindow();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="flex justify-center">
      <img src={source} className="aspect-auto h-screen flex justify-center" />
    </main>
  );
};

export default Projector;
