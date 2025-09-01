import { useEffect, useState } from "react";
import nasb from "../../../../assets/data/am_nasb.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMediaStore } from "../../../../stores/mediaStore";
import { getMimeType, loadFile } from "../../../utils/file_functions";

const VerseSelector = () => {
  const { files } = useMediaStore();
  const [source, setSource] = useState<string | undefined>();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [bookIndex, setBookIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [verseIndex, setVerseIndex] = useState(0);

  const bible = nasb as {
    name: string;
    abbrev: string;
    chapters: string[][];
  }[];

  useEffect(() => {
    window.electron.sendMediaToProjector(
      source,
      bible[bookIndex].chapters[chapterIndex][verseIndex]
    );
  }, [verseIndex]);

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
      <nav className="flex gap-4">
        <select
          name="book"
          className="min-w-[40%] text-teal-500"
          onChange={(e) => {
            setBookIndex(Number(e.target.value));
            setChapterIndex(0);
            setVerseIndex(0);
          }}
          value={bookIndex}
        >
          {bible.map((book, index) => (
            <option key={book.name} value={index} className="text-black">
              {book.name}
            </option>
          ))}
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
          name="chapter"
          className="text-teal-500"
          onChange={(e) => {
            window.electron.sendMediaToProjector(
              source,
              bible[bookIndex].chapters[chapterIndex][verseIndex]
            );
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
      <aside className="flex gap-4 justify-end my-5">
        <button
          className="bg-teal-500 p-3 rounded-full cursor-pointer"
          onClick={() => {
            if (verseIndex > 0) {
              setVerseIndex(verseIndex - 1);
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
              setVerseIndex(verseIndex + 1);
            }
          }}
        >
          <FaChevronRight />
        </button>
      </aside>
      <h1 className="mt-10 text-white text-center font-[noto]">
        "{bible[bookIndex].chapters[chapterIndex][verseIndex]}"
      </h1>
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
            window.electron.sendMediaToProjector(
              source,
              bible[bookIndex].chapters[chapterIndex][verseIndex]
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
