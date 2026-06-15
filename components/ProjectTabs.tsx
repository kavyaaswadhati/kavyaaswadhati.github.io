'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type ProjectGroup, projectSections } from '@/data/projects';

const HTMLFlipBook = dynamic(() => import('react-pageflip'), {
  ssr: false,
});

type ProjectTabsProps = {
  sectionId?: (typeof projectSections)[number]['id'];
  groupSlug?: string;
  showTabs?: boolean;
};

export default function ProjectTabs({ sectionId, groupSlug, showTabs = true }: ProjectTabsProps) {
  const [activeSectionId, setActiveSectionId] = useState(sectionId ?? projectSections[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const activeSection = useMemo(
    () => projectSections.find((section) => section.id === activeSectionId) ?? projectSections[0],
    [activeSectionId],
  );
  const activeGroups = useMemo(
    () =>
      groupSlug
        ? activeSection.groups.filter((group) => group.slug === groupSlug)
        : activeSection.groups,
    [activeSection.groups, groupSlug],
  );
  const activeImages = useMemo(
    () => activeGroups.flatMap((group) => group.images),
    [activeGroups],
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
      {showTabs && (
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
      )}

      <section
        id={`${activeSection.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeSection.id}-tab`}
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {activeImages.length > 0 ? (
          activeGroups.map((group) => (
            <ProjectGroupView
              key={group.title ?? activeSection.id}
              group={group}
              activeImages={activeImages}
              setActiveImageIndex={setActiveImageIndex}
            />
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

function ProjectGroupView({
  group,
  activeImages,
  setActiveImageIndex,
}: {
  group: ProjectGroup;
  activeImages: ProjectGroup['images'];
  setActiveImageIndex: (index: number) => void;
}) {
  if (group.layout === 'flipbook') {
    return <ZineFlipbook group={group} />;
  }

  return (
    <div className="contents">
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
  );
}

function ZineFlipbook({ group }: { group: ProjectGroup }) {
  const bookRef = useRef<{
    pageFlip: () => {
      flipNext: (corner?: 'top' | 'bottom') => void;
      flipPrev: (corner?: 'top' | 'bottom') => void;
    };
  } | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const currentPage = group.images[pageIndex];
  const canGoPrevious = pageIndex > 0;
  const canGoNext = pageIndex < group.images.length - 1;

  const showPrevious = () => {
    bookRef.current?.pageFlip().flipPrev('bottom');
  };

  const showNext = () => {
    bookRef.current?.pageFlip().flipNext('bottom');
  };

  if (!currentPage) {
    return null;
  }

  return (
    <article className="col-span-full mx-auto w-full max-w-5xl">
      {group.title && (
        <h2 className="font-[Avara] text-2xl font-normal text-[var(--accent)]">{group.title}</h2>
      )}

      {group.description && <p className="mt-2 max-w-2xl text-lg text-[#555]">{group.description}</p>}

      {group.links && group.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-4 text-lg font-bold">
          {group.links.map((link) => (
            <a
              key={link.href}
              className="text-[var(--link)] no-underline hover:text-[#004f91]"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <button
          type="button"
          className="h-11 rounded border border-[#cfd8cf] px-4 text-lg font-bold text-[var(--link)] disabled:cursor-not-allowed disabled:opacity-35"
          onClick={showPrevious}
          disabled={!canGoPrevious}
          aria-label="Previous zine page"
        >
          prev
        </button>

        <div className="mx-auto flex w-full max-w-5xl justify-center overflow-hidden">
          <HTMLFlipBook
            ref={bookRef}
            width={420}
            height={560}
            size="stretch"
            minWidth={260}
            maxWidth={480}
            minHeight={340}
            maxHeight={640}
            drawShadow
            flippingTime={850}
            usePortrait
            startZIndex={0}
            autoSize
            maxShadowOpacity={0.35}
            showCover
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
            onFlip={(event: { data: number }) => setPageIndex(event.data)}
            className="shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            style={{}}
            startPage={0}
          >
            {group.images.map((page, index) => (
              <div
                key={page.slug}
                className="relative h-full w-full overflow-hidden bg-white"
                data-density={index === 0 || index === group.images.length - 1 ? 'hard' : 'soft'}
              >
                <Image
                  src={page.large}
                  alt={page.alt}
                  fill
                  priority={index === 0}
                  className="object-contain"
                  sizes="(min-width: 1024px) 480px, 92vw"
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        <button
          type="button"
          className="h-11 rounded border border-[#cfd8cf] px-4 text-lg font-bold text-[var(--link)] disabled:cursor-not-allowed disabled:opacity-35"
          onClick={showNext}
          disabled={!canGoNext}
          aria-label="Next zine page"
        >
          next
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 text-sm font-bold text-[#555]">
        <span>
          {pageIndex + 1} / {group.images.length}
        </span>
        <span>{currentPage.alt}</span>
      </div>
    </article>
  );
}
