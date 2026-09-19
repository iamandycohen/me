import { ArrowLink } from '@/components/ArrowLink';

export default function NotFound() {
  return (
    <section className="paper-noise px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">No record found</p>
        <h1 className="mt-5 font-serif text-6xl">This trail ends here.</h1>
        <p className="mx-auto mt-6 max-w-xl text-ink/65">
          The page may have moved, or the requested case or story is not part of
          the reviewed public collection.
        </p>
        <div className="mt-8">
          <ArrowLink href="/">Return to the beginning</ArrowLink>
        </div>
      </div>
    </section>
  );
}
