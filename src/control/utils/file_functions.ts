export const loadFile = async (filePath: string) => {
  if (window.electron) {
    const data = await window.electron.loadFile(filePath);
    const mimeType = "image/png";

    return `data:${mimeType};base64,${data}`;
  }
};
