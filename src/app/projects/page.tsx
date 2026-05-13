import Image from 'next/image';
import Link from 'next/link';

import { generatePageMetadata } from '@/lib/metadata-generators';
import { getDisplayName } from '@/lib/data-helpers';
import data from '@/lib/data';

const displayName = getDisplayName(data.contact);

export const metadata = generatePageMetadata(
  'Projects',
  `Creative and engineering projects by ${data.contact.name} — hands-on building and problem-solving beyond software.`,
  data.contact,
  {
    openGraph: {
      title: `${displayName}'s Projects — Engineering Beyond Software`,
      description: `Creative engineering projects showcasing hands-on building skills and craftsmanship by ${data.contact.name}.`,
      images: [
        {
          url: '/treehouse.jpg',
          width: 1200,
          height: 800,
          alt: '4-season treehouse built 12 feet above ground',
        },
      ],
    },
  },
  '/projects'
);

export default function Projects() {
  return (
    <>
      <section className="pt-20 md:pt-28 lg:pt-32">
        <div className="container-max">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Field notes</p>
            <h1 className="text-balance mb-6">
              Engineering{' '}
              <span className="italic text-ink/60">beyond software.</span>
            </h1>
            <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
              The same mindset I bring to digital platforms — thoughtful
              planning, quality construction, building things that last —
              applied to the work I do with my hands.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max space-y-24">
          {data.projects.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            >
              <figure
                className={`lg:col-span-7 ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-ink/10 bg-ink/5">
                  <Image
                    src="/treehouse.jpg"
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) calc(100vw - 3rem), 640px"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
              </figure>

              <div
                className={`lg:col-span-5 ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <p className="eyebrow mb-3">{project.period}</p>
                <h2 className="mb-5 text-balance">{project.title}</h2>
                <p className="text-lg text-ink/80 leading-relaxed mb-8 text-pretty">
                  {project.description}
                </p>

                <h3 className="font-serif text-base font-medium text-ink/70 uppercase tracking-widest mb-4">
                  Engineering Highlights
                </h3>
                <ul className="space-y-2.5 text-ink/75">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex gap-3 leading-relaxed">
                      <span
                        className="text-accent select-none pt-1"
                        aria-hidden="true"
                      >
                        —
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding border-t border-ink/10">
        <div className="container-max">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">A philosophy</p>
            <p className="font-serif text-2xl md:text-3xl leading-snug text-ink/80 text-balance mb-10">
              <span className="text-accent">“</span>Whether it&apos;s cloud
              architecture or backyard engineering, the mindset is the same.
              <span className="text-accent">”</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Discuss a project
              </Link>
              <Link href="/resume" className="btn-secondary">
                Professional experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
