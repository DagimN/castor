import { useEffect, useState } from "react";
import { useMediaStore } from "../../stores/mediaStore";
import { loadFile } from "../utils/file_functions";
import { FaPlay } from "react-icons/fa";

const PreviewPanel = () => {
  const [source, setSource] = useState<string>();
  const { selectedFile } = useMediaStore();

  useEffect(() => {
    if (selectedFile) {
      loadFile(selectedFile).then((base64) => {
        setSource(base64);
        window.electron.sendMediaToProjector(base64);
      });
    } else {
      setSource(undefined);
      window.electron.closeProjectorWindow();
    }
  }, [selectedFile]);

  const handlePlay = () => {
    window.electron.sendVideoCommand("play");
  };

  const handlePause = () => {
    window.electron.sendVideoCommand("pause");
  };

  const handleSeek = (time: number) => {
    window.electron.sendVideoCommand("seek", time);
  };

  return (
    <section className="h-[60%] border relative border-gray-700 rounded-md mb-4 flex place-content-center">
      {source ? (
        <div>
          {source.includes("video") ? (
            <video
              src={source}
              className="h-full w-full"
              controls
              onPlay={handlePlay}
              onPause={handlePause}
              onTimeUpdate={(e) => handleSeek(e.currentTarget.currentTime)}
            />
          ) : (
            <img src={source} className="aspect-auto h-full" />
          )}

          <button
            className="bg-teal-500 hover:bg-teal-600 text-white absolute top-0 right-5 my-4 px-4 py-2 rounded-full cursor-pointer"
            onClick={() => {
              if (window.electron) {
                window.electron.openProjectorWindow();
              }
            }}
          >
            <FaPlay />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No file selected
        </div>
      )}
    </section>
  );
};

export default PreviewPanel;
