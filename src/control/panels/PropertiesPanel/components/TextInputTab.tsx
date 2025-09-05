import { useEffect, useState } from "react";
import { useMediaStore } from "../../../../stores/mediaStore";
import {
  getMimeType,
  loadFile,
} from "../../../../control/utils/file_functions";

const TextInputTab = () => {
  const { files } = useMediaStore();
  const [source, setSource] = useState<string | undefined>();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [text, setText] = useState<string | undefined>();

  useEffect(() => {
    if (backgroundImage) {
      loadFile(backgroundImage).then((base64) => {
        setSource(base64);
      });
    } else {
      setSource(undefined);
    }
  }, [backgroundImage]);

  return (
    <section className="px-8 overflow-auto h-[90%]">
      <textarea
        name=""
        id=""
        rows={5}
        placeholder="Enter Text"
        className="bg-transparent border border-teal-500 text-white w-full p-3 rounded-xl"
        onChange={(e) => setText(e.target.value)}
      />
      <h1 className="mt-20 text-teal-500 font-bold">
        Select Background Image:
      </h1>
      <select
        name="background"
        value={backgroundImage}
        onChange={(e) => setBackgroundImage(e.target.value)}
        className="w-full text-teal-500"
      >
        <option value={undefined} className="text-black">
          Select
        </option>
        {files
          .filter((file) =>
            getMimeType(file.split(".").pop()?.toLowerCase()).includes("image")
          )
          .map((file) => (
            <option value={file} key={file} className="text-black">
              {file}
            </option>
          ))}
      </select>
      <img src={source} className="aspect-auto my-10" />
      <button
        className="bg-teal-500 hover:bg-teal-600 text-white my-4 px-4 py-2 rounded-full cursor-pointer"
        onClick={() => {
          window.electron.openProjectorWindow();
          setTimeout(() => {
            window.electron.sendMediaToProjector(source, text);
          }, 300);
        }}
      >
        Display
      </button>
    </section>
  );
};

export default TextInputTab;
