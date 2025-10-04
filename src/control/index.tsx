import { useEffect, useState } from "react";
import { FileViewer, PreviewPanel, PropertiesPanel } from "../control/panels";

const ControlPanel = () => {
  const [qr, setQr] = useState<string | undefined>();
  const [localUrl, setLocalUrl] = useState<string | undefined>();

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

  return (
    <main className="flex gap-4 h-screen p-3">
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
