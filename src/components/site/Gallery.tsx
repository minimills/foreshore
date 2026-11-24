import { img } from "@/lib/format";

/* Screenshot grid. Each picture opens full size in a new tab. */
export default function Gallery({ images, heading }: { images: string[]; heading?: string }) {
  if (images.length === 0) return null;
  return (
    <section className="page-section">
      {heading && <h3>{heading}</h3>}
      <div className="gallery">
        {images.map((src) => (
          <a key={src} href={img(src)} target="_blank" rel="noopener" className="gallery-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(src)} alt="" loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}
