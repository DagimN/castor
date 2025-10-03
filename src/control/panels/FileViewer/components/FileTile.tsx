import { useMediaStore } from "../../../../stores/mediaStore";
import { IoClose } from "react-icons/io5";

const FileTile = ({
  filePath,
  source,
}: {
  filePath: string;
  source: string[];
}) => {
  const { selectedFile, setSelectedFile, setFiles, files } = useMediaStore();

  return (
    <li className="relative w-auto shrink-0 group p-2">
      {source[0].includes("video") ? (
        <video
          src={source[0]}
          className={`h-[150px] aspect-auto cursor-pointer rounded-lg ${selectedFile === filePath ? "ring-4 ring-teal-500" : ""}`}
          onClick={() => setSelectedFile(filePath, source)}
        />
      ) : (
        <div
          className={`relative cursor-pointer rounded-lg ${selectedFile === filePath ? "ring-4 ring-teal-500" : ""}`}
        >
          <img
            src={source[0]}
            alt="file"
            className="h-[150px] aspect-auto"
            onClick={() => setSelectedFile(filePath, source)}
          />
          {source.length > 1 && (
            <span className="bg-black/25 rounded-full px-4 text-white absolute z-20 right-1 bottom-1 text-sm">
              {source.length}
            </span>
          )}
        </div>
      )}

      <button
        className="absolute top-0 right-0 bg-teal-500 rounded-full group-hover:visible invisible cursor-pointer"
        onClick={() => {
          const updatedFiles = files.filter((file) => file.path !== filePath);
          setFiles(updatedFiles);

          if (updatedFiles.length === 0) {
            setSelectedFile(undefined, undefined);
          } else {
            if (selectedFile === filePath) {
              setSelectedFile(updatedFiles[0].path, updatedFiles[0].source);
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
