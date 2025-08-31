import { useEffect, useState } from "react";
import { loadFile } from "../../../utils/file_functions";
import { useMediaStore } from "../../../../stores/mediaStore";
import { IoClose } from "react-icons/io5";

const FileTile = ({ filePath }: { filePath: string }) => {
  const { selectedFile, setSelectedFile, setFiles, files } = useMediaStore();
  const [source, setSource] = useState<string | undefined>();

  useEffect(() => {
    loadFile(filePath).then((base64) => {
      setSource(base64 || undefined);
    });
  }, [filePath]);

  return (
    <li className="relative w-auto shrink-0 group p-2">
      {source?.includes("video") ? (
        <video
          src={source}
          className={`h-[150px] aspect-auto cursor-pointer rounded-lg ${selectedFile === filePath ? "ring-4 ring-teal-500" : ""}`}
          onClick={() => setSelectedFile(filePath)}
        />
      ) : (
        <img
          src={source}
          alt="file"
          className={`h-[150px] aspect-auto cursor-pointer rounded-lg ${selectedFile === filePath ? "ring-4 ring-teal-500" : ""}`}
          onClick={() => setSelectedFile(filePath)}
        />
      )}

      <button
        className="absolute top-0 right-0 bg-teal-500 rounded-full group-hover:visible invisible cursor-pointer"
        onClick={() => {
          const updatedFiles = files.filter((file) => file !== filePath);
          setFiles(updatedFiles);

          if (updatedFiles.length === 0) {
            setSelectedFile(undefined);
          } else {
            if (selectedFile === filePath) {
              setSelectedFile(updatedFiles[0]);
            }
          }
        }}
      >
        <IoClose />
      </button>
    </li>
  );
};

export default FileTile;
