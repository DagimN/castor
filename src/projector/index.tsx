import { useEffect, useRef, useState } from "react";

const Projector = () => {
  const [source, setSource] = useState<string>();
  const [verse, setVerse] = useState<string | undefined>();
  const [lyric, setLyric] = useState<string | undefined>();
  const [isLooped, setIsLooped] = useState(false);
  const [textStyles, setTextStyles] = useState<string | undefined>(
    "text-white text-[56px] text-center font-bold"
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUpdate = (
    newSource: string,
    newVerse?: string,
    styles?: string
  ) => {
    setSource(newSource);
    setVerse(newVerse);
    setLyric(undefined);

    if (styles) {
      setTextStyles(styles);
    }
  };

  useEffect(() => {
    window.electron.onMediaUpdate(handleUpdate);

    return () => {
      window.electron.removeMediaUpdateListener(handleUpdate);
    };
  }, [textStyles]);

  useEffect(() => {
    const handleUpdate = (
      newSource: string,
      newLyric?: string,
      styles?: string
    ) => {
      setSource(newSource);
      setLyric(newLyric);
      setVerse(undefined);

      if (styles) {
        setTextStyles(styles);
      }
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
      {verse && (
        <h1 className={`absolute z-20 w-[70%] ${textStyles}`}>{verse}</h1>
      )}

      {lyric && (
        <pre
          className={`absolute z-20 w-[70%] ${textStyles}`}
          dangerouslySetInnerHTML={{
            __html: lyric?.replace(/\s+/g, " ") ?? "",
          }}
        />
      )}
    </main>
  );
};

export default Projector;
