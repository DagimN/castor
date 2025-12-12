import { useState } from "react";
import { useMediaStore } from "../../../../stores";
import { getMimeType } from "../../../../control/utils/file_functions";
import { useContentStore } from "../../../../stores";
import TextStyleControl from "./TextStyleControl";

const TextInputTab = () => {
  const { files } = useMediaStore();
  const { textStyles } = useContentStore();
  const [source, setSource] = useState<string | undefined>();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [text, setText] = useState<string | undefined>();

  return (
    <section className="px-8 overflow-auto h-[90%]">
      <TextStyleControl />
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
        onChange={(e) => {
          setBackgroundImage(e.target.value);
          setSource(
            files.find((file) => file.path === e.target.value)?.source[0]
          );
        }}
        className="w-full text-teal-500"
      >
        <option value={undefined} className="text-black">
          Select
        </option>
        {files
          .filter((file) =>
            getMimeType(file.path.split(".").pop()?.toLowerCase()).includes(
              "image"
            )
          )
          .map((file) => (
            <option value={file.path} key={file.path} className="text-black">
              {file.path}
            </option>
          ))}
      </select>
      <img src={source} className="aspect-auto my-10" />
      <button
        className="bg-teal-500 hover:bg-teal-600 text-white my-4 px-4 py-2 rounded-full cursor-pointer"
        onClick={() => {
          window.electron.openProjectorWindow();
          setTimeout(() => {
            window.electron.sendLyricToProjector(
              source,
              (text ?? "").trim().replaceAll("\n", "<br />"),
              `text-${textStyles.color} text-[${textStyles.fontSize}px] ${textStyles.textAlign} font-bold`
            );
          }, 300);
        }}
      >
        Display
      </button>
    </section>
  );
};

export default TextInputTab;
