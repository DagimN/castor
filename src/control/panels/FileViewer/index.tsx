import { loadFile } from "../../utils/file_functions";
import { useMediaStore } from "../../../stores";
import FileTile from "./components/FileTile";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { MediaFile } from "../../../stores/mediaStore";

const FileViewer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setFiles, files } = useMediaStore();

  return (
    <section className="min-h-[38%] border border-gray-700 rounded-md">
      <button
        className="rounded-xl bg-teal-700 px-4 py-2 m-4 hover:bg-teal-600 text-white font-bold cursor-pointer"
        onClick={async () => {
          setIsLoading(true);
          const loadedAssets = await window.electron.openFileDialog();
          const newFiles: MediaFile[] = [];

          for (const filePath of loadedAssets) {
            const source = await loadFile(filePath);
            newFiles.push({ path: filePath, source });
          }

          if (newFiles && newFiles.length > 0) {
            setFiles([...newFiles, ...files]);
          }
          setIsLoading(false);
        }}
      >
        {isLoading ? <ClipLoader size={12} /> : "Add Files"}
      </button>
      <ul className="flex gap-4 p-4 overflow-x-auto">
        {files.map((file, index) => (
          <FileTile
            key={`file-${index}`}
            filePath={file.path}
            source={file.source}
          />
        ))}
      </ul>
    </section>
  );
};

export default FileViewer;
