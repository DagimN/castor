import { useEffect, useRef, useState } from "react";

const Projector = () => {
  const [source, setSource] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <main className="flex justify-center">
      {source?.includes("video") ? (
        <video
          ref={videoRef}
          src={source}
          className="aspect-auto h-screen flex justify-center"
          muted
          preload="auto"
        />
      ) : (
        <img
          src={source}
          className="aspect-auto h-screen flex justify-center"
        />
      )}
    </main>
  );
};

export default Projector;
