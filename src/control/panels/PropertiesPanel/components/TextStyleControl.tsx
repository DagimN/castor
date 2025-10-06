import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";
import { useContentStore } from "../../../../stores/contentStore";

const TextStyleControl = () => {
  const { textStyles, setTextStyles } = useContentStore();

  return (
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
          8, 10, 12, 14, 16, 20, 24, 28, 30, 32, 36, 48, 50, 56, 60, 64, 72, 96,
        ].map((fontSize) => (
          <option key={fontSize} value={fontSize} className="text-black">
            {fontSize}
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <FaAlignLeft
          onClick={() =>
            setTextStyles({ ...textStyles, textAlign: "text-left" })
          }
          className={`cursor-pointer ${textStyles.textAlign === "text-left" ? "text-teal-500" : "text-gray-600"}`}
        />
        <FaAlignCenter
          onClick={() =>
            setTextStyles({ ...textStyles, textAlign: "text-center" })
          }
          className={`cursor-pointer ${textStyles.textAlign === "text-center" ? "text-teal-500" : "text-gray-600"}`}
        />
        <FaAlignRight
          onClick={() =>
            setTextStyles({ ...textStyles, textAlign: "text-right" })
          }
          className={`cursor-pointer ${textStyles.textAlign === "text-right" ? "text-teal-500" : "text-gray-600"}`}
        />
      </div>
    </nav>
  );
};

export default TextStyleControl;
