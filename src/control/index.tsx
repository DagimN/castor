import { useEffect } from "react";
import { FileViewer, PreviewPanel, PropertiesPanel } from "../control/panels";

const ControlPanel = () => {
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
    <main className="flex gap-4 h-screen p-3">
      <div className="w-[70%]">
        <PreviewPanel />
        <FileViewer />
      </div>
      <PropertiesPanel />
    </main>
  );
};

export default ControlPanel;
