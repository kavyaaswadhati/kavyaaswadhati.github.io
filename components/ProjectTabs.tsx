'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AboutContent from '@/components/AboutContent';
import { type ProjectGroup, projectSections } from '@/data/projects';

const HTMLFlipBook = dynamic(() => import('react-pageflip'), {
  ssr: false,
});

type ProjectTabsProps = {
  sectionId?: (typeof projectSections)[number]['id'];
  groupSlug?: string;
  showTabs?: boolean;
};

type TabId = (typeof projectSections)[number]['id'] | 'about';

const tabs: Array<{ id: TabId; label: string }> = [
  ...projectSections.map((section) => ({ id: section.id, label: section.label })),
  { id: 'about', label: 'about' },
];

const getHashSlug = () => decodeURIComponent(window.location.hash.replace(/^#/, ''));

const setHashSlug = (slug: string | null, mode: 'push' | 'replace' = 'push') => {
  const nextHash = slug ? `#${encodeURIComponent(slug)}` : '';
  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;

  if (nextUrl === `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    return;
  }

  window.history[mode === 'replace' ? 'replaceState' : 'pushState'](null, '', nextUrl);
};

export default function ProjectTabs({ sectionId, groupSlug, showTabs = true }: ProjectTabsProps) {
  const [activeTabId, setActiveTabId] = useState<TabId>(sectionId ?? projectSections[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const activeSection = useMemo(
    () => projectSections.find((section) => section.id === activeTabId) ?? projectSections[0],
    [activeTabId],
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
  const galleryImages = useMemo(
    () =>
      activeGroups
        .filter((group) => group.layout !== 'flipbook')
        .flatMap((group) => group.images),
    [activeGroups],
  );
  const activeImage = activeImageIndex === null ? null : activeImages[activeImageIndex] ?? null;

  const openImageIndex = useCallback((index: number, mode: 'push' | 'replace' = 'push') => {
    setActiveImageIndex(index);
    setHashSlug(activeImages[index]?.slug ?? null, mode);
  }, [activeImages]);

  const close = useCallback(() => {
    setActiveImageIndex(null);
    setHashSlug(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveImageIndex((current) => {
      if (current === null) {
        return current;
      }

      const next = (current - 1 + activeImages.length) % activeImages.length;
      setHashSlug(activeImages[next]?.slug ?? null);
      return next;
    });
  }, [activeImages]);

  const showNext = useCallback(() => {
    setActiveImageIndex((current) => {
      if (current === null) {
        return current;
      }

      const next = (current + 1) % activeImages.length;
      setHashSlug(activeImages[next]?.slug ?? null);
      return next;
    });
  }, [activeImages]);

  useEffect(() => {
    const syncImageFromHash = () => {
      const hashSlug = getHashSlug();
      const galleryImage = galleryImages.find((image) => image.slug === hashSlug);

      if (!galleryImage) {
        setActiveImageIndex(null);
        return;
      }

      const index = activeImages.findIndex((image) => image.slug === galleryImage.slug);
      setActiveImageIndex(index === -1 ? null : index);
    };

    queueMicrotask(syncImageFromHash);
    window.addEventListener('hashchange', syncImageFromHash);

    return () => window.removeEventListener('hashchange', syncImageFromHash);
  }, [activeImages, galleryImages]);

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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeTabId}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              className="border-b-2 border-transparent px-3 py-2 text-lg font-bold text-[var(--link)] transition-colors aria-selected:border-[var(--accent)] aria-selected:text-[#004f91]"
              onClick={() => {
                setActiveTabId(tab.id);
                setActiveImageIndex(null);
                setHashSlug(null);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {activeTabId === 'about' ? (
        <section
          id="about-panel"
          role="tabpanel"
          aria-labelledby="about-tab"
          className="mx-auto max-w-[1200px] px-5 py-10"
        >
          <AboutContent />
        </section>
      ) : (
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
                openImageIndex={openImageIndex}
              />
            ))
          ) : (
            <p className="col-span-full py-16 text-center text-xl text-[#555]">zines coming soon</p>
          )}
        </section>
      )}

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
  openImageIndex,
}: {
  group: ProjectGroup;
  activeImages: ProjectGroup['images'];
  openImageIndex: (index: number) => void;
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
            onClick={() => openImageIndex(index)}
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
      turnToPage: (page: number) => void;
    };
  } | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const currentPage = group.images[pageIndex];
  const lastPageIndex = group.images.length - 1;
  const canGoPrevious = pageIndex > 0;
  const canGoNext = pageIndex < lastPageIndex;
  const currentViewLabel =
    pageIndex === 0
      ? 'Cover'
      : pageIndex === lastPageIndex
        ? 'Back cover'
        : `Pages ${pageIndex}-${Math.min(pageIndex + 1, lastPageIndex - 1)}`;

  const hashPageIndex = useCallback(
    () => group.images.findIndex((page) => page.slug === getHashSlug()),
    [group.images],
  );

  const syncPageFromHash = useCallback(() => {
    const nextPageIndex = hashPageIndex();

    if (nextPageIndex === -1) {
      return;
    }

    setPageIndex(nextPageIndex);
    bookRef.current?.pageFlip().turnToPage(nextPageIndex);
  }, [hashPageIndex]);

  const showPrevious = () => {
    bookRef.current?.pageFlip().flipPrev('bottom');
  };

  const showNext = () => {
    bookRef.current?.pageFlip().flipNext('bottom');
  };

  useEffect(() => {
    queueMicrotask(syncPageFromHash);
    window.addEventListener('hashchange', syncPageFromHash);

    return () => window.removeEventListener('hashchange', syncPageFromHash);
  }, [syncPageFromHash]);

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
            minWidth={130}
            maxWidth={480}
            minHeight={174}
            maxHeight={640}
            drawShadow
            flippingTime={850}
            usePortrait={false}
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
            onInit={syncPageFromHash}
            onFlip={(event: { data: number }) => {
              setPageIndex(event.data);
              setHashSlug(group.images[event.data]?.slug ?? null, 'replace');
            }}
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
                  sizes="(min-width: 1024px) 480px, 46vw"
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

      <div className="mt-4 flex items-center justify-center text-sm font-bold text-[#555]">
        <span>{currentViewLabel}</span>
      </div>
    </article>
  );
}
