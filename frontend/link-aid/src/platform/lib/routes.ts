export const PLATFORM_BASE = "/plataforma";

export function platformPath(path = "/") {
  if (path === "/" || path === "") return PLATFORM_BASE;
  return `${PLATFORM_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripPlatformBase(pathname: string) {
  if (pathname === PLATFORM_BASE) return "/";
  if (pathname.startsWith(`${PLATFORM_BASE}/`)) {
    return pathname.slice(PLATFORM_BASE.length) || "/";
  }
  return pathname || "/";
}
