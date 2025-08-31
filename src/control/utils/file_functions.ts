export const loadFile = async (filePath: string) => {
  if (window.electron) {
    const data = await window.electron.loadFile(filePath);
    const extension = filePath.split(".").pop()?.toLowerCase();

    return `data:${getMimeType(extension)};base64,${data}`;
  }
};

export const getMimeType = (extension: string | undefined) => {
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "webp":
      return "image/webp";
    case "av1":
      return "video/av1";
    case "mp4":
      return "video/mp4";
    case "mov":
      return "video/quicktime";
    case "avi":
      return "video/x-msvideo";
    case "mkv":
      return "video/x-matroska";
    default:
      return "application/octet-stream";
  }
};
