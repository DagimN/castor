const RemoteContent = () => {
  return (
    <section className="text-gray-400 grid gap-6">
      <h1 className="text-2xl font-bold mb-2 text-teal-400">Remote Controls</h1>

      <p className="text-gray-300">
        Use the remote controls to navigate slides and access presentation
        options from another device. Below are the common remote actions and how
        they affect your slideshow.
      </p>

      <ol className="list-decimal list-inside space-y-4 text-gray-300">
        <li>
          <strong>Connect your remote:</strong> Link the remote or mobile app to
          the presentation session via the pairing code or network access.
          <div className="mt-2">
            <img
              src="tutorial/remote-access.png"
              alt="Remote access / pairing"
              className="rounded shadow relative left-1/2 -translate-x-1/2"
            />
          </div>
        </li>

        <li>
          <strong>Navigate slides:</strong> Use next/previous controls to move
          through slides.
          <div className="mt-2">
            <img
              src="tutorial/remote-controls.jpg"
              alt="Projecting slides"
              className="rounded shadow h-[500px] relative left-1/2 -translate-x-1/2"
            />
          </div>
        </li>
      </ol>

      <p className="text-sm text-gray-400 mt-2">
        Tip: Test the remote connection before your presentation and keep a
        backup device handy in case of network issues. You can use USB remotes
        as well.
      </p>
    </section>
  );
};

export default RemoteContent;
