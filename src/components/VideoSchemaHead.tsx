import { buildVideoSchemas, type VideoMeta } from "@/lib/videoSchema";

interface VideoSchemaHeadProps {
  videos: VideoMeta[];
}

const VideoSchemaHead = ({ videos }: VideoSchemaHeadProps) => {
  const schemas = buildVideoSchemas(videos);

  if (!schemas.length) return null;

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default VideoSchemaHead;
