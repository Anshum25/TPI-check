import { extractYouTubeVideoId, getYouTubeThumbnailUrl, getYouTubeWatchUrl } from "@/lib/youtube";

export interface VideoMeta {
  url: string;
  title: string;
  description: string;
  uploadDate: string; // ISO string
}

const PUBLISHER = {
  "@type": "Organization",
  name: "Turning Point Institute",
  logo: {
    "@type": "ImageObject",
    url: "https://turningpointinstitute.in/logo.png",
  },
};

export function buildVideoObjectSchema(video: VideoMeta) {
  const videoId = extractYouTubeVideoId(video.url);
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const contentUrl = getYouTubeWatchUrl(video.url) ?? `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl =
    getYouTubeThumbnailUrl(video.url) ?? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl,
    uploadDate: video.uploadDate,
    embedUrl,
    contentUrl,
    publisher: PUBLISHER,
  };
}

export function buildVideoSchemas(videos: VideoMeta[]) {
  const seen = new Set<string>();
  const result: any[] = [];

  for (const video of videos) {
    const id = extractYouTubeVideoId(video.url);
    if (!id || seen.has(id)) continue;

    const schema = buildVideoObjectSchema(video);
    if (schema) {
      seen.add(id);
      result.push(schema);
    }
  }

  return result;
}
