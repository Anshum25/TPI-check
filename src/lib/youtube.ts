export function extractYouTubeVideoId(rawUrl?: string | null): string | null {
  if (!rawUrl) return null;

  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();

    // Short URL: https://youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      const id = url.pathname.replace(/^\/+/, "").split("/")[0];
      return id || null;
    }

    // Standard YouTube hosts
    if (
      host === "www.youtube.com" ||
      host === "youtube.com" ||
      host.endsWith(".youtube.com")
    ) {
      // https://www.youtube.com/watch?v=VIDEO_ID
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id || null;
      }

      // https://www.youtube.com/embed/VIDEO_ID
      if (url.pathname.startsWith("/embed/")) {
        const id = url.pathname.split("/")[2];
        return id || null;
      }

      // Shorts, etc.: https://www.youtube.com/shorts/VIDEO_ID
      if (url.pathname.startsWith("/shorts/")) {
        const id = url.pathname.split("/")[2];
        return id || null;
      }
    }
  } catch {
    // Fallback for malformed URLs – last-resort regex
    const match = trimmed.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&#?/]+)/i,
    );
    return match?.[1] ?? null;
  }

  return null;
}

export function getYouTubeEmbedUrl(rawUrl?: string | null): string {
  if (!rawUrl) return "";
  const id = extractYouTubeVideoId(rawUrl);
  if (!id) return "";
  return `https://www.youtube.com/embed/${id}`;
}

export function getYouTubeWatchUrl(rawUrl?: string | null): string | null {
  const id = extractYouTubeVideoId(rawUrl ?? "");
  if (!id) return null;
  return `https://www.youtube.com/watch?v=${id}`;
}

export function getYouTubeThumbnailUrl(rawUrl?: string | null): string | null {
  const id = extractYouTubeVideoId(rawUrl ?? "");
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
