import { useState } from "react";
import { useMediaStore } from "../../../../stores/mediaStore";
import {
  getMimeType,
} from "../../../../control/utils/file_functions";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const LyricsTab = () => {
  const { files } = useMediaStore();
  const [lyricsUrl, setLyricsUrl] = useState<string | undefined>();
  const [lyrics, setLyrics] = useState<string[]>([]);
  const [source, setSource] = useState<string | undefined>();
  const [isFetching, setIsFetching] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [text, setText] = useState<string | undefined>();

  const fetchLyrics = async () => {
    if (!lyricsUrl) return;

    setIsFetching(true);
    const firstData = await window.electron.fetchWebsite(lyricsUrl, "div.poem");
    setIsFetching(false);

    if (firstData.length > 0) {
      const lyrics = firstData[0]
        .split("<br>\n<br>")
        .map((lyric: string) =>
          lyric
            .replaceAll(
              '<span class="mw-poem-indented" style="display: inline-block; margin-left: 2em;">',
              ""
            )
            .replaceAll("</span>", "")
        );
      setLyrics(lyrics);
      return;
    }

    const secondData = await window.electron.fetchWebsite(
      lyricsUrl,
      "div.mw-parser-output"
    );
    setIsFetching(false);

    if (secondData.length > 0) {
      const lyrics = secondData[0].split("<p><br>\n</p>");
      setLyrics(lyrics);
    }
  };

  return (
    <section className="px-8 overflow-auto h-[90%]">
      <div className="my-3 relative">
        <input
          type="text"
          name="lyrics-url"
          placeholder="Enter Lyrics URL"
          onChange={(e) => setLyricsUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchLyrics();
            }
          }}
          className="bg-transparent border border-teal-500 text-white w-full p-3 pr-16 rounded-xl"
        />
        <button
          disabled={isFetching}
          onClick={fetchLyrics}
          className="absolute right-2 bg-teal-500 hover:bg-teal-600 active:bg-teal-400 w-10 h-10 rounded-full cursor-pointer mt-1"
        >
          {isFetching ? <ClipLoader size={12} /> : <FaSearch className="m-3" />}
        </button>
      </div>
      <textarea
        name=""
        id=""
        rows={5}
        placeholder="Enter Text"
        className="bg-transparent border border-teal-500 text-white w-full p-3 rounded-xl"
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="rounded-lg bg-teal-500 px-3 py-1 float-right mt-1"
        onClick={() => {
          if (text) {
            setLyrics((prev) => [...prev, text]);
          }
        }}
      >
        Add
      </button>
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
            window.electron.sendLyricToProjector(source, lyrics[0]);
          }, 300);
        }}
      >
        Display
      </button>

      {lyrics.map((lyric) => (
        <div className="group relative">
          <pre
            className="p-2 my-2 rounded text-white text-start group-hover:bg-teal-500/50 cursor-pointer relative z-0 w-full"
            onClick={() => {
              window.electron.openProjectorWindow();
              setTimeout(() => {
                window.electron.sendLyricToProjector(source, lyric);
              }, 300);
            }}
            dangerouslySetInnerHTML={{
              __html: lyric.replace(/\s+/g, " ") ?? "",
            }}
          />
          <button
            className="absolute top-0 right-0 bg-white z-20 rounded-full group-hover:block hidden cursor-pointer"
            onClick={() => setLyrics((prev) => prev.filter((l) => l !== lyric))}
          >
            <IoClose />
          </button>
        </div>
      ))}
    </section>
  );
};

export default LyricsTab;
