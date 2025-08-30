import { FileViewer, PreviewPanel, PropertiesPanel } from "./components";

const App = () => {
  return (
    <main className="flex gap-4 h-screen w-screen p-3">
      <div className="w-full">
        <PreviewPanel />
        <FileViewer />
      </div>
      <PropertiesPanel />
    </main>
  );
};

export default App;
