import { useMemo } from "react";

type GallerySectionProps = {
  images: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
};

export default function GallerySection({
  images,
  selectedIndex,
  onSelect,
  onClose,
}: GallerySectionProps) {
  const imageCount = useMemo(() => images.length, [images.length]);

  return (
    <section className="fade-in mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">ギャラリー</h2>
        <span className="text-xs text-ink/50">{imageCount}枚</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            className="h-32 w-32 flex-none overflow-hidden rounded-2xl border border-black/5 bg-ink/5"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      {selectedIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white">
            <div
              className="h-72 bg-ink/10"
              style={{
                backgroundImage: `url(${images[selectedIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="flex items-center justify-between p-4 text-sm">
              <span className="text-ink/60">
                {selectedIndex + 1} / {imageCount}
              </span>
              <button
                type="button"
                className="rounded-full border border-ink/20 px-4 py-2 text-sm text-ink"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
