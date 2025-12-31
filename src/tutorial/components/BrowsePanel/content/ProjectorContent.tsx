import { FaPlay } from "react-icons/fa";

const ProjectorContent = () => {
  return (
    <section className="text-gray-400 grid gap-4">
      <h1 className="text-2xl font-bold mb-4 text-teal-400">
        Projecting Media
      </h1>
      <p>
        The <strong>Projector</strong> feature allows you to seamlessly display
        your presentation content on an external screen or projector. It will
        allow you to display, as we will see how to project various types of
        media, including:
        <ul className="list-disc list-inside p-3">
          <li>Slideshows</li>
          <li>Videos</li>
          <li>Images</li>
        </ul>
      </p>

      <p>
        To start projecting, ensure your external display is connected and
        recognized by your computer. Ensure that the Project option on the
        computer is selected to the <strong>Extend</strong> display so that the
        media will be projected to the other display.
      </p>
      <img
        src="tutorial/project-option.png"
        alt=""
        className="relative left-1/2 -translate-x-1/2 h-[300px]"
      />

      <p>
        You can choose which file from your "Files" list to project. Once
        selected, Castor will display the content on the external screen while
        providing you with presenter tools on your main screen.
      </p>

      <h2 id="projecting-images" className="text-teal-400 mt-4">
        Projecting Images
      </h2>
      <img
        src="tutorial/projecting-images.png"
        alt=""
        className="relative left-1/2 -translate-x-1/2"
      />
      <p>
        By clicking on the <FaPlay className="inline mx-2" /> button on the top
        right corner, the selected image will be projected to the external
        device.
      </p>

      <h2 id="projecting-videos" className="text-teal-400 mt-4">
        Projecting Video
      </h2>
      <img
        src="tutorial/projecting-videos.png"
        alt=""
        className="relative left-1/2 -translate-x-1/2"
      />
      <p>
        <ol className="list-decimal list-inside p-3 gap-2 grid">
          <li>
            Video controls such as play, pause, and seek will be available on
            the main screen.
          </li>
          <li> Loop button to toggle looping of the video on the projector.</li>
        </ol>
        When projecting a video, you can control playback directly from the main
        screen. Use the play, pause, and seek controls to manage the video while
        it plays on the external display.
      </p>

      <h2 id="projecting-slides" className="text-teal-400 mt-4">
        Projecting Slideshows
      </h2>
      <img
        src="tutorial/projecting-slides.png"
        alt=""
        className="relative left-1/2 -translate-x-1/2"
      />
      <p>
        <ol className="list-decimal list-inside p-3 gap-2 grid">
          <li>Controls for navigating through slides back and forth</li>
          <li> Current page of the slide </li>
          <li>
            {" "}
            For taking control of the slide remotely. See more in{" "}
            <strong>Remote Controls</strong>{" "}
          </li>
        </ol>

        <div className="bg-yellow-500/50 text-white p-3 rounded-md mt-4">
          {" "}
          NOTE: When importing the slideshow file, you need to first convert it
          to a PDF file in order for it to be accessible in the app.
        </div>
      </p>
    </section>
  );
};

export default ProjectorContent;
