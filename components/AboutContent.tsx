export default function AboutContent() {
  return (
    <div className="mx-auto max-w-3xl px-5 text-center">
      <h1 className="font-[Avara] text-3xl font-normal text-[var(--accent)]">about me</h1>
      <p className="mt-5 text-xl leading-relaxed text-[#555]">
        my name is kavya ~ i&apos;m a non-binary artist living in sf. i love to draw, volunteer at
        the marine mammal center, and swim! you can find me on the apps here:
      </p>
      <nav aria-label="Social links" className="mt-4 flex justify-center gap-5 text-xl font-bold">
        <a
          className="text-[var(--link)] no-underline hover:text-[#004f91]"
          href="https://www.instagram.com/thakku.bakka/?hl=en"
        >
          ig
        </a>
        <a
          className="text-[var(--link)] no-underline hover:text-[#004f91]"
          href="https://twitter.com/thakku_bakka?s=11&t=wHSfLlEbLPLwsmYtD1G5pQ"
        >
          twitter
        </a>
      </nav>
    </div>
  );
}
