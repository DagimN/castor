import { useState } from "react";
import { GeneralTab, VerseSelector } from "./components";

const PropertiesPanel = () => {
  const [propertyTab, setPropertyTab] = useState<"general" | "verseSelector">(
    "general"
  );

  const renderTab = () => {
    switch (propertyTab) {
      case "general":
        return <GeneralTab />;
      case "verseSelector":
        return <VerseSelector />;
      default:
        return <></>;
    }
  };

  return (
    <aside className="w-[30%] border border-gray-700 rounded-md">
      <nav className="flex gap-4 p-4 text-teal-500">
        <h1
          className={`cursor-pointer px-4 grid items-center ${propertyTab === "general" && "bg-teal-500 text-black rounded-full"}`}
          onClick={() => setPropertyTab("general")}
        >
          General
        </h1>
        <h1
          className={`cursor-pointer px-4 text-center grid items-center ${propertyTab === "verseSelector" && "bg-teal-500 text-black rounded-full"}`}
          onClick={() => setPropertyTab("verseSelector")}
        >
          Verse Selector
        </h1>
      </nav>
      {renderTab()}
    </aside>
  );
};

export default PropertiesPanel;
