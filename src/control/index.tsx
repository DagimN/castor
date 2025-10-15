import { useEffect, useState } from "react";
import { FileViewer, PreviewPanel, PropertiesPanel } from "../control/panels";
import { RingLoader } from "react-spinners";

const ControlPanel = () => {
  const [qr, setQr] = useState<string | undefined>();
  const [localUrl, setLocalUrl] = useState<string | undefined>();
  const [downloadProgress, setDownloadProgress] = useState<
    number | undefined
  >();

  const handleUpdate = (progress: number) => {
    setDownloadProgress(progress);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.electron.closeProjectorWindow();
        setQr(undefined);
        setLocalUrl(undefined);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    window.electron.onDownloadProgress(handleUpdate);

    return () => {
      window.electron.removeDownloadProgressListener(handleUpdate);
    };
  }, []);

  return (
    <main className="flex gap-4 h-screen p-3">
      {downloadProgress && downloadProgress < 100 && (
        <div className="fixed top-0 left-20 bg-white/70 z-30 rounded-b-3xl flex items-center p-3 gap-4">
          <RingLoader size={30} color="oklch(60% 0.118 184.704)" />
          <h1>{downloadProgress} % </h1>
        </div>
      )}
      <div className="w-[70%]">
        <PreviewPanel
          qr={qr}
          localUrl={localUrl}
          setQr={setQr}
          setLocalUrl={setLocalUrl}
        />
        <FileViewer />
      </div>
      <PropertiesPanel />
    </main>
  );
};

export default ControlPanel;
