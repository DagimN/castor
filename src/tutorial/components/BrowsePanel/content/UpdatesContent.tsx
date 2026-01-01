const UpdatesContent = () => {
  return (
    <section className="text-gray-400 grid gap-6">
      <h1 className="text-2xl font-bold mb-2 text-teal-400">
        Updating the app
      </h1>

      <p className="text-gray-300">
        When an update is available the app will receive a notification,
        download the update in the background, and then prompt you to install
        it. Follow these simple steps to update safely and smoothly.
      </p>

      <ol className="list-decimal list-inside space-y-4 text-gray-300">
        <li>
          <strong>Receive update notification:</strong> A banner or dialog will
          appear when an update is detected. This gives you the option to review
          release notes before downloading.
          <div className="mt-2">
            <img
              src="tutorial/update-received.png"
              alt="Update received notification"
              className="rounded shadow relative left-1/2 -translate-x-1/2"
            />
          </div>
        </li>

        <li>
          <strong>Download in background:</strong> The update downloads while
          you continue working. A progress indicator shows download status so
          you know when it's ready.
          <div className="mt-2">
            <img
              src="tutorial/update-progress.png"
              alt="Update download progress"
              className="rounded shadow relative left-1/2 -translate-x-1/2"
            />
          </div>
        </li>

        <li>
          <strong>Install when ready:</strong> Once the download completes you
          will be prompted to install. You can choose to install immediately
          (the app will restart) or schedule for later.
          <div className="mt-2">
            <img
              src="tutorial/update-ready.png"
              alt="Update ready to install"
              className="rounded shadow relative left-1/2 -translate-x-1/2"
            />
          </div>
        </li>

        <li>
          <strong>Installing:</strong> When installing, you will see this window
          for installation progress. You will be prompted to restart the app
          once complete.
          <div className="mt-2">
            <img
              src="tutorial/installing-update.png"
              alt="Files panel overview"
              className="rounded shadow relative left-1/2 -translate-x-1/2"
            />
          </div>
        </li>
      </ol>

      <p className="text-sm text-gray-400 mt-2">
        Tip: Keep automatic updates enabled to receive security fixes and new
        features as soon as they're released.
      </p>
    </section>
  );
};

export default UpdatesContent;
