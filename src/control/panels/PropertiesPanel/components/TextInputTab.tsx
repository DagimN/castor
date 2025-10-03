import { useState } from "react";
import { useMediaStore } from "../../../../stores/mediaStore";
import {
  getMimeType,
} from "../../../../control/utils/file_functions";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";

const TextInputTab = () => {
  const { files } = useMediaStore();
  const [source, setSource] = useState<string | undefined>();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [text, setText] = useState<string | undefined>();
  const [textStyles, setTextStyles] = useState<{
    color: string;
    fontSize: number;
    textAlign: string;
    fontWeight: string;
  }>({
    color: "white",
    fontSize: 56,
    textAlign: "center",
    fontWeight: "bold",
  });

  return (
    <section className="px-8 overflow-auto h-[90%]">
      <nav className="flex gap-4 justify-center items-center my-4">
        <select
          name="fontSize"
          id=""
          className="text-teal-500"
          value={textStyles.fontSize}
          onChange={(e) =>
            setTextStyles({
              ...textStyles,
              fontSize: Number.parseInt(e.target.value),
            })
          }
        >
          {[
            8, 10, 12, 14, 16, 20, 24, 28, 30, 32, 36, 48, 50, 56, 60, 64, 72,
            96,
          ].map((fontSize) => (
            <option key={fontSize} value={fontSize} className="text-black">
              {fontSize}
            </option>
          ))}
        </select>

        <div className="flex gap-4">
          <FaAlignLeft
            onClick={() => setTextStyles({ ...textStyles, textAlign: "left" })}
            className={`cursor-pointer ${textStyles.textAlign === "left" && "text-teal-500"}`}
          />
          <FaAlignCenter
            onClick={() =>
              setTextStyles({ ...textStyles, textAlign: "center" })
            }
            className={`cursor-pointer ${textStyles.textAlign === "center" && "text-teal-500"}`}
          />
          <FaAlignRight
            onClick={() => setTextStyles({ ...textStyles, textAlign: "right" })}
            className={`cursor-pointer ${textStyles.textAlign === "right" && "text-teal-500"}`}
          />
        </div>
      </nav>
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
            getMimeType(file.path.split(".").pop()?.toLowerCase()).includes("image")
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
            window.electron.sendMediaToProjector(
              source,
              text,
              `text-${textStyles.color} text-[${textStyles.fontSize}px] text-${textStyles.textAlign} font-bold`
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
