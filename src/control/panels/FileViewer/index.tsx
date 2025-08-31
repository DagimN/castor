import { useMediaStore } from "../../../stores/mediaStore";
import FileTile from "./components/FileTile";

const FileViewer = () => {
  const { setFiles, files } = useMediaStore();

  return (
    <section className="min-h-[38%] border border-gray-700 rounded-md">
      <button
        className="rounded-xl bg-teal-700 px-4 py-2 m-4 hover:bg-teal-600 text-white font-bold cursor-pointer"
        onClick={async () => {
          if (window.electron) {
            const newFiles = await window.electron.openFileDialog();
            if (newFiles && newFiles.length > 0) {
              setFiles([...newFiles, ...files]);
            }
          } else {
            console.error("Electron API is missing");
          }
        }}
      >
        Add Files
      </button>
      <ul className="flex gap-4 p-4 overflow-x-auto">
        {files.map((file, index) => (
          <FileTile key={`file-${index}`} filePath={file} />
        ))}
      </ul>
    </section>
  );
};

export default FileViewer;
