import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { GoFileDirectoryFill } from "react-icons/go";
import { RiProjector2Fill } from "react-icons/ri";
import { MdOutlineSystemUpdateAlt, MdSettingsRemote } from "react-icons/md";
import { HiMiniDocumentText } from "react-icons/hi2";
import {
  NoContent,
  FilesContent,
  ProjectorContent,
  TextContent,
  UpdatesContent,
  RemoteContent,
} from "./content";

const BrowsePanel = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menu, setMenu] = useState<
    "files" | "projector" | "remote" | "content" | "updates" | undefined
  >();

  const handleScroll = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const data = {
    files: <FilesContent />,
    projector: <ProjectorContent />,
    content: <TextContent />,
    remote: <RemoteContent />,
    updates: <UpdatesContent />,
  };

  return (
    <section className="flex">
      <aside
        className={`fixed p-3 border-r border-gray-700 gap-3 h-screen ${isExpanded ? "w-66" : "w-10"} duration-600 ease-in-out`}
      >
        <IoMdMenu
          className="text-teal-400 cursor-pointer"
          size={20}
          onClick={() => setIsExpanded(!isExpanded)}
        />

        <ul className="text-sm text-white space-y-2 grid gap-5 mt-10">
          <li
            className={`flex items-center gap-2 ${menu === "files" ? "text-teal-400 font-bold" : "hover:text-gray-400 cursor-pointer"}`}
            onClick={() => setMenu("files")}
          >
            <GoFileDirectoryFill className="mr-3" size={20} />
            {isExpanded && <h1>Managing Files</h1>}
          </li>
          <li
            className={`${menu === "projector" ? "text-teal-400 font-bold" : "hover:text-gray-400 cursor-pointer"}`}
            onClick={() => setMenu("projector")}
          >
            <div className="flex items-center gap-2">
              <RiProjector2Fill className="mr-3" size={20} />
              {isExpanded && <h1>Projecting Media</h1>}
            </div>

            {isExpanded && menu === "projector" && (
              <div className="text-xs text-gray-400 grid gap-3 font-thin ml-12 mt-4">
                <h1
                  className="cursor-pointer"
                  onClick={(e) => handleScroll(e, "projecting-images")}
                >
                  Images
                </h1>
                <h1
                  className="cursor-pointer"
                  onClick={(e) => handleScroll(e, "projecting-videos")}
                >
                  Videos
                </h1>
                <h1
                  className="cursor-pointer"
                  onClick={(e) => handleScroll(e, "projecting-slides")}
                >
                  Slides
                </h1>
              </div>
            )}
          </li>
          <li
            className={`${menu === "content" ? "text-teal-400 font-bold" : "hover:text-gray-400 cursor-pointer"}`}
            onClick={() => setMenu("content")}
          >
            <div className="flex items-center gap-2">
              <HiMiniDocumentText className="mr-3" size={20} />
              {isExpanded && <h1>Content</h1>}
            </div>

            {isExpanded && menu === "content" && (
              <div className="text-xs text-gray-400 grid gap-3 font-thin ml-12 mt-4">
                <h1
                  className="cursor-pointer"
                  onClick={(e) => handleScroll(e, "verses")}
                >
                  Verses
                </h1>
                <h1
                  className="cursor-pointer"
                  onClick={(e) => handleScroll(e, "lyrics")}
                >
                  Lyrics
                </h1>
                <h1
                  className="cursor-pointer"
                  onClick={(e) => handleScroll(e, "text")}
                >
                  Text Input
                </h1>
              </div>
            )}
          </li>
          <li
            className={`flex items-center gap-2 ${menu === "remote" ? "text-teal-400 font-bold" : "hover:text-gray-400 cursor-pointer"}`}
            onClick={() => setMenu("remote")}
          >
            <MdSettingsRemote className="mr-3" size={20} />
            {isExpanded && <h1>Remote Controls</h1>}
          </li>
          <li
            className={`flex items-center gap-2 ${menu === "updates" ? "text-teal-400 font-bold" : "hover:text-gray-400 cursor-pointer"}`}
            onClick={() => setMenu("updates")}
          >
            <MdOutlineSystemUpdateAlt className="mr-3" size={20} />
            {isExpanded && <h1>Updates</h1>}
          </li>
        </ul>
      </aside>

      <main
        className={`p-6 ${isExpanded ? "ml-66" : "ml-10"} duration-600 ease-in-out`}
      >
        {!menu ? (
          <div className="h-full w-full grid justify-items-center mt-30 gap-4 p-3">
            <img src="logo.png" alt="" className="rounded-xl w-[30%]" />
            <p className="text-teal-400 text-center">
              Welcome to the Castor Tutorial! Please select an option to get
              started.
            </p>
          </div>
        ) : (
          <div>{data[menu]}</div>
        )}
      </main>
    </section>
  );
};

export default BrowsePanel;
