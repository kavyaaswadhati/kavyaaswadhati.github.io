'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { artworks } from '@/data/artworks';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeArtwork = activeIndex === null ? null : artworks[activeIndex];

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + artworks.length) % artworks.length,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? current : (current + 1) % artworks.length));
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  return (
    <>
      <section
        aria-label="Artwork gallery"
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {artworks.map((artwork, index) => (
          <button
            type="button"
            key={artwork.slug}
            className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden border-0 bg-transparent p-0"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${artwork.alt}`}
          >
            <Image
              src={artwork.thumb}
              alt={artwork.alt}
              fill
              className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              sizes="(min-width: 1280px) 285px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
            />
          </button>
        ))}
      </section>

      {activeArtwork && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeArtwork.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 h-11 w-11 text-4xl leading-none text-white"
            onClick={close}
            aria-label="Close image"
          >
            ×
          </button>

          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 h-14 w-12 -translate-y-1/2 text-5xl leading-none text-white sm:left-5"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <figure
            className="relative h-[82vh] w-[86vw] max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeArtwork.large}
              alt={activeArtwork.alt}
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
            <figcaption className="sr-only">{activeArtwork.alt}</figcaption>
          </figure>

          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 h-14 w-12 -translate-y-1/2 text-5xl leading-none text-white sm:right-5"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
