const TextContent = () => {
  return (
    <section className="text-gray-400 grid gap-4">
      <h1 className="text-2xl font-bold mb-4 text-teal-400">
        Handling Content
      </h1>

      <p>
        The Properties panel lets you manage and edit text content for your
        presentation items, including verses, lyrics and notes. It provides
        various tools to customize the appearance and structure of your text.
      </p>

      <img
        src="tutorial/textstyle-controller.png"
        alt=""
        className="relative left-1/2 -translate-x-1/2"
      />
      <p>
        The text style controller allows you to modify the font, size, color,
        alignment for your text content. Any changes are applied to all the text
        that you want displayed.
      </p>

      <h2 id="verses" className="text-teal-400 mt-4">
        Verse Selector
      </h2>
      <img
        src="tutorial/verse-panel.png"
        alt=""
        className="relative left-1/2 -translate-x-1/2 h-[500px]"
      />
      <p>
        Choose which verses to include in presentation order. Supports single
        picks, ranges (e.g., 1-3) and custom sequences. Useful for arranging
        only the parts you need during a service.
      </p>

      <p>
        You need to select a background file from the "Files" section to be used
        as the background for the verses. After selecting, press the{" "}
        <strong>Display</strong> button to project the verses.
      </p>

      <h2 id="lyrics" className="text-teal-400 mt-4">
        Lyrics
      </h2>
      <p>
        Similar to verses, you can input song lyrics for presentation. You can
        also select a background file from the "Files" section to be used as the
        background for the lyrics.
      </p>
      <p>
        You can enter manual lyrics or import from the{" "}
        <a
          href="https://wikimezmur.org/am/Gospel_Singers"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          wikimezmur.org
        </a>{" "}
        website.
        <br />
        When importing from the website, copy the link for the lyrics page. For
        example,{" "}
        <a
          href="https://wikimezmur.org/am/Hana_Tekle/Meswaet/Bemaleda"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          https://wikimezmur.org/am/Hana_Tekle/Meswaet/Bemaleda
        </a>{" "}
        and paste it into the import field in Castor.
        <br />
        <br />
        When manually entering lyrics, use (-) to indicate line breaks for
        inserting a new line. For example:
        <br />
        <br />
        <span className="rounded-lg bg-gray-800 p-3 block w-fit">
          በምስጋና የተፈራህ ገናና አምላክ ነህ
          <br />
          ለዑል አምላክ ብንዘምርህ ብንሰግድልህ አይበቃህም
          <br />
          አእላፋት ያንተ ፍጥረት ላንተ ያዜማሉ
          <br />
          ቀን ከለሊት ያንተን ስራ በምስጋና ያውጃሉ
          <br />
          -
          <br />
          ስምህ ሀያል የአማልክቱም አምላክ ገዢ ነህ
          <br />
          ታላቅ ጌታ የሆነልህ ሰማይ ምድሩ ምስጋናህ
          <br />
          መላዕክቱ ላንተ ሞገስ ላንተ ግርማ ይዘምራሉ
          <br />
          ባይገልፅህም በአዲስ ቅኔ ምስጋናህን ያውዳሉ
        </span>
        <br />
        <br />
        <img
          src="tutorial/lyrics-pages.png"
          alt=""
          className="relative left-1/2 -translate-x-1/2 h-[300px]"
        />
        You also have the option to add multiple lyrics by separating them by
        pages.
      </p>

      <img
        src="tutorial/lyrics-controls.png"
        alt=""
        className="relative left-1/2 -translate-x-1/2 h-[500px]"
      />
      <p>
        The lyrics panel has two controls which are the reset and display.{" "}
        <br /> <strong>Reset</strong> for clearing the text from being
        projected. <br /> <strong>Display</strong> for displaying the first
        lyrics text .{" "}
      </p>

      <h2 id="text" className="text-teal-400 mt-4">
        Text Input
      </h2>
      <p>
        Edit raw text for displaying short notes and or anything that is
        required for the scenario. After selecting, press the{" "}
        <strong>Display</strong> button to project the text.
      </p>
    </section>
  );
};

export default TextContent;
