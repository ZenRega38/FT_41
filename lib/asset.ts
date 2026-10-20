// Site is served from the domain root (ftubt41.web.id), so no base path prefix is needed.
// Set NEXT_PUBLIC_BASE_PATH only if the site is ever hosted under a sub-path again.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const getAsset = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  if (basePath && path.startsWith(basePath + "/")) return path;
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;
};
