import { useState, useRef, useEffect } from "react";
import { nasv, am54 } from "../../../../assets/data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMediaStore } from "../../../../stores";
import { getMimeType } from "../../../utils/file_functions";
import { useContentStore } from "../../../../stores";
import TextStyleControl from "./TextStyleControl";

const VerseSelector = () => {
  const { files } = useMediaStore();
  const { textStyles } = useContentStore();
  const [source, setSource] = useState<string | undefined>();
  const [translation, setTranslation] = useState<"NASV" | "AM54">("NASV");
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [bookIndex, setBookIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [verseIndex, setVerseIndex] = useState(0);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const verseNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (verseNavRef.current) {
      const selectedButton = verseNavRef.current.querySelector(
        `#verse-button-${verseIndex}`
      );
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [verseIndex, chapterIndex]); // Rerun when chapter changes too

  const handleVerseHover = (index: number) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setHoveredVerse(index);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setHoveredVerse(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const translations = {
    NASV: nasv,
    AM54: am54,
  };

  const bible = translations[translation] as {
    name: string;
    abbrev: string;
    chapters: string[][];
  }[];

  return (
    <section className="px-8 overflow-auto h-[90%]">
      <select
        name="translation"
        id=""
        className="w-full text-teal-500"
        onChange={(e) => setTranslation(e.target.value as "NASV" | "AM54")}
      >
        <option value={"NASV"}> NASV </option>
        <option value={"AM54"}> AM54 </option>
      </select>
      <nav className="flex gap-4">
        <select
          name="book"
          className="min-w-[40%] w-full text-teal-500"
          onChange={(e) => {
            setBookIndex(Number(e.target.value));
            setChapterIndex(0);
            setVerseIndex(0);
          }}
          value={bookIndex}
        >
          {bible.map((book, index) =>
            book.name ? (
              <option key={book.name} value={index} className="text-black">
                {book.name}
              </option>
            ) : (
              <hr />
            )
          )}
        </select>
        <select
          name="chapter"
          className="text-teal-500"
          onChange={(e) => {
            setChapterIndex(Number(e.target.value));
            setVerseIndex(0);
          }}
          value={chapterIndex}
        >
          {bible[bookIndex].chapters.map((_, index) => (
            <option
              key={`chapter-${index}`}
              value={index}
              className="text-black"
            >
              {index + 1}
            </option>
          ))}
        </select>
        <select
          name="verse"
          className="text-teal-500"
          onChange={(e) => {
            setVerseIndex(Number(e.target.value));
          }}
          value={verseIndex}
        >
          {bible[bookIndex].chapters[chapterIndex].map((_, index) => (
            <option key={`verse-${index}`} value={index} className="text-black">
              {index + 1}
            </option>
          ))}
        </select>
      </nav>
      <nav ref={verseNavRef} className="flex gap-4 overflow-x-auto w-full p-2">
        {bible[bookIndex].chapters[chapterIndex].map((verse, index) => (
          <div
            key={`verse-container-${index}`}
            onMouseEnter={() => handleVerseHover(index)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              id={`verse-button-${index}`}
              onClick={() => {
                setVerseIndex(index);
                window.electron.sendMediaToProjector(
                  source,
                  `"${bible[bookIndex].chapters[chapterIndex][index]}" ${bible[bookIndex].abbrev} ${chapterIndex + 1}:${index + 1}`,
                  `text-[${textStyles.fontSize}px] ${textStyles.textAlign} font-bold`,
                  textStyles.color
                );
              }}
              className={`px-3 py-1 text-sm ${index === verseIndex ? "bg-teal-400" : "border border-teal-400 text-teal-400"} rounded-lg cursor-pointer`}
            >
              {index + 1}
            </button>
            {hoveredVerse === index && (
              <div className="fixed mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50 top-10 right-10">
                {verse}
              </div>
            )}
          </div>
        ))}
      </nav>
      <aside className="flex gap-4 justify-end my-5">
        <button
          className="bg-teal-500 p-3 rounded-full cursor-pointer"
          onClick={() => {
            if (verseIndex > 0) {
              const updatedIndex = verseIndex - 1;
              setVerseIndex(updatedIndex);
              window.electron.sendMediaToProjector(
                source,
                `"${bible[bookIndex].chapters[chapterIndex][updatedIndex]}" ${bible[bookIndex].abbrev} ${chapterIndex + 1}:${updatedIndex + 1}`,
                `text-[${textStyles.fontSize}px] ${textStyles.textAlign} font-bold`,
                textStyles.color
              );
            }
          }}
        >
          <FaChevronLeft />
        </button>
        <button
          className="bg-teal-500 p-3 rounded-full cursor-pointer"
          onClick={() => {
            if (
              verseIndex <
              bible[bookIndex].chapters[chapterIndex].length - 1
            ) {
              const updatedIndex = verseIndex + 1;
              setVerseIndex(updatedIndex);
              window.electron.sendMediaToProjector(
                source,
                `"${bible[bookIndex].chapters[chapterIndex][updatedIndex]}" ${bible[bookIndex].abbrev} ${chapterIndex + 1}:${updatedIndex + 1}`,
                `text-[${textStyles.fontSize}px] ${textStyles.textAlign} font-bold`,
                textStyles.color
              );
            }
          }}
        >
          <FaChevronRight />
        </button>
      </aside>
      <h1 className="mt-10 text-white text-center font-[noto]">
        "{bible[bookIndex].chapters[chapterIndex][verseIndex]}"
      </h1>
      <TextStyleControl />
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
            window.electron.sendMediaToProjector(
              source,
              `"${bible[bookIndex].chapters[chapterIndex][verseIndex]}" ${bible[bookIndex].abbrev} ${chapterIndex + 1}:${verseIndex + 1}`,
              `text-[${textStyles.fontSize}px] ${textStyles.textAlign} font-bold`,
              textStyles.color
            );
          }, 300);
        }}
      >
        Display
      </button>
    </section>
  );
};

export default VerseSelector;
