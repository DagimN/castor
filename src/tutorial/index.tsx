import { useState } from "react";
import packageJson from "../../package.json";
import BrowsePanel from "./components/BrowsePanel";
import TutorialFlow from "./components/TutorialFlow";

const TutorialWindow = () => {
  const version = (packageJson as any)?.version ?? "";
  const [activePanel, setActivePanel] = useState<
    "browse" | "tutorial" | undefined
  >("browse");

  return (
    <main className="relative h-screen w-screen">
      <div className="top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded fixed">
        v{version}
      </div>

      {activePanel === undefined && (
        <div className="grid justify-items-center place-content-center gap-4 p-3 h-full">
          <img src="logo.png" alt="" className="rounded-xl w-[30%]" />
          <p className="text-teal-400 text-center">
            Welcome to the Castor Tutorial! Please select an option to get
            started.
          </p>

          <div className="flex gap-3 sm:gap-10 h-10 text-sm">
            <button
              className="font-bold text-teal-400 cursor-pointer hover:bg-gray-800 px-4 rounded-xl"
              onClick={() => {
                setActivePanel("browse");
              }}
            >
              Browse Content
            </button>
            <button
              className="font-bold bg-teal-400 rounded-xl px-4 cursor-pointer hover:bg-teal-500"
              onClick={() => {
                setActivePanel("tutorial");
              }}
            >
              Start Tutorial
            </button>
          </div>
        </div>
      )}

      {activePanel === "browse" && <BrowsePanel />}
      {activePanel === "tutorial" && <TutorialFlow />}
    </main>
  );
};

export default TutorialWindow;
