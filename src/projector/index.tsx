import { useEffect, useRef, useState } from "react";

const Projector = () => {
  const [source, setSource] = useState<string>();
  const [verse, setVerse] = useState<string | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleUpdate = (newSource: string, newVerse?: string) => {
      setSource(newSource);
      setVerse(newVerse);
    };

    window.electron.onMediaUpdate(handleUpdate);

    return () => {
      window.electron.removeMediaUpdateListener(handleUpdate);
    };
  }, []);

  useEffect(() => {
    const handleControl = ({
      command,
      payload,
    }: {
      command: string;
      payload: number;
    }) => {
      const video = videoRef.current;
      if (!video) return;

      switch (command) {
        case "play":
          video.play();
          break;
        case "pause":
          video.pause();
          break;
        case "seek":
          video.currentTime = payload;
          break;
      }
    };

    window.electron.onVideoCommand(handleControl);

    return () => {
      window.electron.removeVideoCommandListener(handleControl);
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
    <main className="flex justify-center relative h-screen w-screen">
      {source?.includes("video") ? (
        <video
          ref={videoRef}
          src={source}
          className="aspect-auto h-screen flex justify-center absolute z-10"
          muted
          preload="auto"
        />
      ) : (
        <img
          src={source}
          className="aspect-auto h-screen flex justify-center absolute z-10"
        />
      )}
      <h1 className="text-white text-[56px] w-[70%] text-center font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        {verse}
      </h1>
    </main>
  );
};

export default Projector;
