import { useMediaStore } from "../../../../stores/mediaStore";
import { getMimeType } from "../../../utils/file_functions";
import { useEffect, useState } from "react";

const GeneralTab = () => {
  const [metaData, setMetaData] = useState<any>();
  const { selectedFile } = useMediaStore();

  useEffect(() => {
    if (!selectedFile) {
      setMetaData(undefined);
      return;
    }
    const mimeType = getMimeType(selectedFile.split(".").pop()?.toLowerCase());
    console.log(mimeType);
    console.log(mimeType?.includes("image"));

    if (mimeType?.includes("image")) {
      window.electron.fetchImageMetadata(selectedFile).then((data: any) => {
        setMetaData(data);
      });
    }

    if (mimeType?.includes("video")) {
      window.electron
        .fetchVideoMetadata(selectedFile)
        .then((data: any) => {
          setMetaData(data);
        })
        .catch((err) => {
          // handle error if needed
          console.error("Error fetching video metadata:", err);
        });
    }
  }, [selectedFile]);

  return (
    <section className="overflow-y-auto h-[90%]">
      {metaData && Object.keys(metaData).length > 0 ? (
        Object.keys(metaData).map((key) => (
          <div key={key} className="flex justify-between px-8 gap-10 text-white">
            <span className="font-bold">{key}</span>
            <span className="text-right">{String(metaData[key])}</span>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No metadata available</p>
      )}
    </section>
  );
};

export default GeneralTab;
