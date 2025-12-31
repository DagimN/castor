const FilesContent = () => {
  return (
    <section className="text-gray-400 grid gap-4">
      <h1 className="text-2xl font-bold mb-4 text-teal-400">Managing Files</h1>
      <img src="tutorial/file-panel.jpg" alt="" className="w-[90%]" />
      <p>
        The <strong>Files</strong> section is where you manage all your
        presentation materials. You can easily add, organize, and preview your
        documents, images, and other media.
      </p>

      <h2 className="text-teal-400 mt-4">Adding Files</h2>
      <p>
        To add a file, simply click the "Add File" button and select the desired
        document from your computer. Castor supports a wide range of file types
        including:
        <ul className="list-disc list-inside p-3">
          <li>Images</li>
          <li>Videos</li>
          <li>PDFs</li>
        </ul>
        <br />
        Once added, your files will appear in a list and will be available
        throughout the app (i.e. Selecting background images for the{" "}
        <strong>Lyrics</strong>, and <strong>Verses</strong>).
      </p>

      <h2 className="text-teal-400 mt-4">Removing Files</h2>
      <p>You can also remove them by clicking the delete icon.</p>
      <img
        src="tutorial/remove-media-icon.png"
        alt=""
        className="relative left-1/2 -translate-x-1/2"
      />

      <h2 className="text-teal-400 mt-4">Preview</h2>
      <p>
        Clicking on a file in the list will open a preview, allowing you to
        quickly review its content before presenting.
      </p>
    </section>
  );
};

export default FilesContent;
