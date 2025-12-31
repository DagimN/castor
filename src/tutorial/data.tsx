import { JSX } from "react";

export default {
  projector: [
    <p>
      The <strong>Projector</strong> feature allows you to seamlessly display
      your presentation content on an external screen or projector.
    </p>,
    <p>
      To start projecting, ensure your external display is connected and
      recognized by your computer. Then, navigate to the Projector section in
      Castor.
    </p>,
    <p>
      You can choose which file from your "Files" list to project. Once
      selected, Castor will display the content on the external screen while
      providing you with presenter tools on your main screen.
    </p>,
    <p>
      The presenter view includes controls for navigating through your slides,
      annotations, and a timer to help you keep track of your presentation
      duration.
    </p>,
  ],
  remote: [
    <p>
      With the <strong>Remote</strong> feature, you can control your
      presentation from another device
    </p>,
    <p>
      To set up remote control, ensure that both your main device and the remote
      device are connected to the same Wi-Fi network. Open the Remote section in
      Castor on your main device.
    </p>,
    <p>
      On your remote device, open a web browser and navigate to the URL provided
      in the Remote section of Castor. This will connect your remote control to
      the main device.
    </p>,
    <p>
      Once connected, you can use your remote device to navigate through slides,
      start/stop the presentation, and access other presenter tools.
    </p>,
  ],
} as {
  files: JSX.Element[];
  projector: JSX.Element[];
  remote: JSX.Element[];
};
