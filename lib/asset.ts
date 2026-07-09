export const getAsset = (path: string) => {
  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/FT_41" : "";
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  if (path.startsWith(basePath + "/")) return path;
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;
};
