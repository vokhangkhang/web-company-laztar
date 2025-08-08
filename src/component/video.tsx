import { VideoProps } from "@/src/interface/indext";

function convertToEmbedUrl(url: string): string {
  const watchRegex = /youtube\.com\/watch\?v=([^&]+)/;
  const match = url.match(watchRegex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function Video({ url }: VideoProps) {
  const embedUrl = convertToEmbedUrl(url);

  return (
    <div style={{ width: '100%', aspectRatio: '16/9' }}>
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title="YouTube video"
        style={{ border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}