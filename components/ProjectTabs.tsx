'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { projectSections } from '@/data/projects';

export default function ProjectTabs() {
  const [activeSectionId, setActiveSectionId] = useState(projectSections[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const activeSection = useMemo(
    () => projectSections.find((section) => section.id === activeSectionId) ?? projectSections[0],
    [activeSectionId],
  );
  const activeImages = useMemo(
    () => activeSection.groups.flatMap((group) => group.images),
    [activeSection],
  );
  const activeImage = activeImageIndex === null ? null : activeImages[activeImageIndex] ?? null;

  const close = useCallback(() => setActiveImageIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveImageIndex((current) =>
      current === null
        ? current
        : (current - 1 + activeImages.length) % activeImages.length,
    );
  }, [activeImages.length]);

  const showNext = useCallback(() => {
    setActiveImageIndex((current) =>
      current === null ? current : (current + 1) % activeImages.length,
    );
  }, [activeImages.length]);

  useEffect(() => {
    if (activeImageIndex === null) {
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
  }, [activeImageIndex, close, showNext, showPrevious]);

  return (
    <>
      <div className="mx-auto mt-5 flex max-w-[1200px] justify-center gap-2 px-5" role="tablist">
        {projectSections.map((section) => (
          <button
            key={section.id}
            type="button"
            role="tab"
            aria-selected={section.id === activeSectionId}
            aria-controls={`${section.id}-panel`}
            id={`${section.id}-tab`}
            className="border-b-2 border-transparent px-3 py-2 text-lg font-bold text-[var(--link)] transition-colors aria-selected:border-[var(--accent)] aria-selected:text-[#004f91]"
            onClick={() => {
              setActiveSectionId(section.id);
              setActiveImageIndex(null);
            }}
          >
            {section.label}
          </button>
        ))}
      </div>

      <section
        id={`${activeSection.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeSection.id}-tab`}
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {activeImages.length > 0 ? (
          activeSection.groups.map((group) => (
            <div key={group.title ?? activeSection.id} className="contents">
              {group.title && (
                <h2 className="col-span-full mt-4 font-[Avara] text-2xl font-normal text-[var(--accent)]">
                  {group.title}
                </h2>
              )}
              {group.images.map((image) => {
                const index = activeImages.findIndex((item) => item.slug === image.slug);

                return (
                  <button
                    type="button"
                    key={image.slug}
                    className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden border-0 bg-transparent p-0"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Open ${image.alt}`}
                  >
                    <Image
                      src={image.thumb}
                      alt={image.alt}
                      fill
                      className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                      sizes="(min-width: 1280px) 285px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                    />
                  </button>
                );
              })}
            </div>
          ))
        ) : (
          <p className="col-span-full py-16 text-center text-xl text-[#555]">zines coming soon</p>
        )}
      </section>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 h-11 w-11 text-4xl leading-none text-white"
            onClick={close}
            aria-label="Close image"
          >
            x
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
            {'<'}
          </button>

          <figure
            className="relative h-[82vh] w-[86vw] max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.large}
              alt={activeImage.alt}
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
            <figcaption className="sr-only">{activeImage.alt}</figcaption>
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
            {'>'}
          </button>
        </div>
      )}
    </>
  );
}
