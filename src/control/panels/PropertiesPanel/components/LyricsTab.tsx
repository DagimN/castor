import { useState } from "react";
import { useMediaStore } from "../../../../stores";
import { FaPlay, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { useContentStore } from "../../../../stores";
import TextStyleControl from "./TextStyleControl";
import { IoIosAdd } from "react-icons/io";
import { RxReset } from "react-icons/rx";

const LyricsTab = () => {
  const { files } = useMediaStore();
  const { textStyles, lyrics, setLyrics } = useContentStore();
  const [lyricsUrl, setLyricsUrl] = useState<string | undefined>();
  const [lyricsIndex, setLyricsIndex] = useState<number>(0);
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
      <div>
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
            {isFetching ? (
              <ClipLoader size={12} />
            ) : (
              <FaSearch className="m-3" />
            )}
          </button>
        </div>
        <TextStyleControl />
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
              const isEmpty = lyrics.length === 0;
              const lyric = isEmpty ? [] : lyrics[lyricsIndex];

              const bars = text.trim().split("-");

              for (const bar of bars) {
                lyric.push(bar.trim().replaceAll("\n", "<br />"));
              }

              if (isEmpty) {
                lyrics.push(lyric);
                setLyrics(lyrics);
              } else {
                lyrics[lyricsIndex] = lyric;
                setLyrics(lyrics);
              }
            }
          }}
        >
          Add
        </button>
        <nav className="flex gap-4 p-4 text-teal-500 my-10 overflow-x-auto">
          {lyrics.map((_, index) => (
            <div className="relative group">
              <h1
                className={`cursor-pointer px-4 grid items-center ${lyricsIndex === index && "bg-teal-500 text-black rounded-full"}`}
                onClick={() => setLyricsIndex(index)}
              >
                {index + 1}
              </h1>
              <button
                className="absolute top-0 right-0 bg-white z-20 rounded-full group-hover:block hidden cursor-pointer"
                onClick={() => {
                  setLyrics(lyrics.filter((_, i) => i !== index));
                  setLyricsIndex(0);
                }}
              >
                <IoClose />
              </button>
            </div>
          ))}
          <h1
            className={`cursor-pointer px-4 grid items-center bg-teal-500 text-black rounded-full`}
            onClick={() => {
              lyrics.push([]);
              setLyrics(lyrics);
              setLyricsIndex(lyrics.length - 1);
            }}
          >
            <IoIosAdd />
          </h1>
        </nav>
        <h1 className="text-teal-500 font-bold">Select Background Image:</h1>
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
          {files.map((file) => (
            <option value={file.path} key={file.path} className="text-black">
              {file.path}
            </option>
          ))}
        </select>
        {source?.includes("video") ? (
          <video
            src={source}
            className="aspect-auto my-10"
            muted
            preload="auto"
          />
        ) : (
          <img src={source} className="aspect-auto my-10" />
        )}

        {lyrics.length > 0 &&
          (lyrics[lyricsIndex] ?? []).length > 0 &&
          lyrics[lyricsIndex].map((lyric) => (
            <div className="group relative">
              <pre
                className="p-2 my-2 rounded text-white text-start group-hover:bg-teal-500/50 cursor-pointer relative z-0 w-full"
                onClick={() => {
                  window.electron.openProjectorWindow();
                  setTimeout(() => {
                    window.electron.sendLyricToProjector(
                      source,
                      lyric,
                      `text-[${textStyles.fontSize}px] ${textStyles.textAlign} font-bold`,
                      textStyles.color
                    );

                    if (source?.includes("video")) {
                      window.electron.sendVideoCommand("loop", 1);
                    }
                  }, 300);
                }}
                dangerouslySetInnerHTML={{
                  __html: lyric.replace(/\s+/g, " ") ?? "",
                }}
              />
              <button
                className="absolute top-0 right-0 bg-white z-20 rounded-full group-hover:block hidden cursor-pointer"
                onClick={() => {
                  const prev = lyrics[lyricsIndex];
                  prev.splice(prev.indexOf(lyric), 1);
                  if (prev.length === 0) {
                    lyrics.splice(lyrics.indexOf(prev), 1);
                  } else {
                    lyrics[lyricsIndex] = prev;
                  }
                  setLyrics(lyrics);
                }}
              >
                <IoClose />
              </button>
            </div>
          ))}
      </div>

      <div className="absolute bottom-5 right-14 grid gap-1">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            window.electron.sendLyricToProjector(
              source,
              "",
              `text-[${textStyles.fontSize}px] ${textStyles.textAlign} font-bold`,
              textStyles.color
            );
          }}
        >
          <RxReset />
        </button>

        <button
          className="bg-teal-500 hover:bg-teal-600 text-white my-4 px-4 py-2 rounded-full cursor-pointer"
          onClick={() => {
            if (lyrics.length > 0) {
              window.electron.openProjectorWindow();
              setTimeout(() => {
                window.electron.sendLyricToProjector(
                  source,
                  lyrics[lyricsIndex][0],
                  `text-[${textStyles.fontSize}px] ${textStyles.textAlign} font-bold`,
                  textStyles.color
                );
                window.electron.sendVideoCommand("loop", 1);
              }, 300);
            }
          }}
        >
          <FaPlay />
        </button>
      </div>
    </section>
  );
};

export default LyricsTab;
