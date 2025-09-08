import { useEffect, useRef, useState } from "react";

const Projector = () => {
  const [source, setSource] = useState<string>();
  const [verse, setVerse] = useState<string | undefined>();
  const [lyric, setLyric] = useState<string | undefined>();
  const [isLooped, setIsLooped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleUpdate = (newSource: string, newVerse?: string) => {
      setSource(newSource);
      setVerse(newVerse);
      setLyric(undefined);
    };

    window.electron.onMediaUpdate(handleUpdate);

    return () => {
      window.electron.removeMediaUpdateListener(handleUpdate);
    };
  }, []);

  useEffect(() => {
    const handleUpdate = (newSource: string, newLyric?: string) => {
      setSource(newSource);
      setLyric(newLyric);
      setVerse(undefined);
    };

    window.electron.onLyricUpdate(handleUpdate);

    return () => {
      window.electron.removeLyricUpdateListener(handleUpdate);
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
        case "loop":
          console.log(payload, command)
          setIsLooped(payload === 1);
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
    <main className="flex justify-center items-center justify-items-center place-content-center relative h-screen w-screen">
      {source?.includes("video") ? (
        <video
          ref={videoRef}
          src={source}
          className="aspect-auto h-screen flex justify-center absolute z-10"
          muted
          preload="auto"
          loop={isLooped}
          autoPlay
        />
      ) : (
        <img
          src={source}
          className="aspect-auto h-screen flex justify-center absolute z-10"
        />
      )}
      <h1 className="text-white text-[56px] w-[70%] absolute flex text-center font-bold z-20">
        {verse}
      </h1>

      <pre
        className="text-white text-[44px] text-start font-bold absolute z-20"
        dangerouslySetInnerHTML={{
          __html: lyric?.replace(/\s+/g, " ") ?? "",
        }}
      />
    </main>
  );
};

export default Projector;
