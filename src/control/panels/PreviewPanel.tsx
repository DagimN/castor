import { useCallback, useEffect, useState } from "react";
import { useMediaStore } from "../../stores";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import { TiArrowLoop } from "react-icons/ti";
import { MdSettingsRemote } from "react-icons/md";
import QRCode from "qrcode";
import { IoClose } from "react-icons/io5";

const PreviewPanel = ({
  qr,
  localUrl,
  setQr,
  setLocalUrl,
}: {
  qr: string | undefined;
  localUrl: string | undefined;
  setQr: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLocalUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [isLooped, setIsLooped] = useState(false);
  const { selectedSource } = useMediaStore();
  const [sourceIndex, setSourceIndex] = useState(0);

  const handleUpdate = useCallback(
    (nav: string) => {
      if ((selectedSource ?? []).length > 1) {
        if (nav === "next") {
          handleNextSlide();
        }

        if (nav === "previous") {
          handlePreviousSlide();
        }
      }
    },
    [sourceIndex, selectedSource]
  );

  useEffect(() => {
    setSourceIndex(0);

    if (selectedSource) {
      window.electron.sendMediaToProjector(selectedSource[sourceIndex]);
    } else {
      window.electron.closeProjectorWindow();
    }
  }, [selectedSource]);

  useEffect(() => {
    window.electron.onSlideUpdate(handleUpdate);

    return () => {
      window.electron.removeSlideUpdateListener(handleUpdate);
    };
  }, [handleUpdate]);

  useEffect(() => {
    const handleIndexUpdate = (index: number) => {
      setSourceIndex(index);
    }

    window.electron.onSourceIndexUpdate(handleIndexUpdate);

    return () => {
      window.electron.removeSourceIndexUpdateListener(handleIndexUpdate);
    };
  }, [])

  const handlePlay = () => {
    window.electron.sendVideoCommand("play");
  };

  const handlePause = () => {
    window.electron.sendVideoCommand("pause");
  };

  const handleSeek = (time: number) => {
    window.electron.sendVideoCommand("seek", time);
  };

  const handleNextSlide = () => {
    if (sourceIndex < (selectedSource ?? []).length - 1) {
      const updatedIndex = sourceIndex + 1;
      setSourceIndex(updatedIndex);

      window.electron.sendMediaToProjector(
        (selectedSource ?? [])[updatedIndex]
      );
    }
  };

  const handlePreviousSlide = () => {
    if (sourceIndex > 0) {
      const updatedIndex = sourceIndex - 1;
      setSourceIndex(updatedIndex);

      window.electron.sendMediaToProjector(
        (selectedSource ?? [])[updatedIndex]
      );
    }
  };

  return (
    <section className="h-[60%] border relative border-gray-700 rounded-md mb-4 flex place-content-center">
      {selectedSource ? (
        <div>
          {selectedSource[0].includes("video") ? (
            <video
              src={selectedSource[0]}
              className="h-full w-full"
              controls
              loop={isLooped}
              autoPlay
              onPlay={handlePlay}
              onPause={handlePause}
              onTimeUpdate={(e) => handleSeek(e.currentTarget.currentTime)}
            />
          ) : (
            <div className="h-full relative flex justify-center">
              <img
                src={qr ?? selectedSource[sourceIndex]}
                className="aspect-auto h-full"
              />
              {localUrl && (
                <h1 className="absolute bottom-2 text-center">{localUrl}</h1>
              )}
            </div>
          )}

          <div className="absolute top-0 right-5 my-4 grid gap-4 justify-items-end">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full cursor-pointer w-min"
              onClick={() => {
                if (window.electron) {
                  window.electron.openProjectorWindow();
                  setTimeout(() => {
                    window.electron.sendMediaToProjector(
                      selectedSource[sourceIndex]
                    );
                    window.electron.sendVideoCommand("loop", isLooped ? 1 : 0);
                  }, 1000);
                }
              }}
            >
              <FaPlay />
            </button>
            {selectedSource.length > 1 && (
              <aside className="grid gap-4 justify-items-end text-white">
                <div className="flex gap-2">
                  <button
                    className="bg-teal-500 p-3 rounded-full cursor-pointer"
                    onClick={handlePreviousSlide}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="bg-teal-500 p-3 rounded-full cursor-pointer"
                    onClick={handleNextSlide}
                  >
                    <FaChevronRight />
                  </button>
                </div>

                <span className="bg-black/25 rounded-full px-4 py-1 text-white text-sm w-min">
                  {sourceIndex + 1}/{selectedSource.length}
                </span>
                <button
                  className="bg-teal-500 p-3 rounded-full cursor-pointer"
                  onClick={async () => {
                    if (!qr) {
                      const localIp = await window.electron.getLocalIP();
                      const url = `http://${localIp}:3000/remote`;
                      const qrImage = await QRCode.toDataURL(url);

                      setLocalUrl(url);
                      setQr(qrImage);

                      window.electron.openProjectorWindow();
                      window.electron.setRemoteImages(selectedSource);
                    } else {
                      setLocalUrl(undefined);
                      setQr(undefined);
                    }
                  }}
                >
                  {qr ? <IoClose /> : <MdSettingsRemote />}
                </button>
              </aside>
            )}

            {selectedSource[0].includes("video") && (
              <button
                className={`${isLooped ? "bg-teal-500" : ""} border border-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full cursor-pointer`}
                onClick={() => {
                  if (window.electron) {
                    window.electron.sendVideoCommand("loop", !isLooped ? 1 : 0);
                    setIsLooped(!isLooped);
                  }
                }}
              >
                <TiArrowLoop />
              </button>
            )}
          </div>
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
