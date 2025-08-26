import Image from "next/image";

import { generatePageMetadata } from "@/lib/metadata-generators";
import { getDisplayName } from "@/lib/data-helpers";
import data from "../../../content/data.json";

const displayName = getDisplayName(data.contact);

export const metadata = generatePageMetadata(
  "Projects",
  `Creative and engineering projects by ${data.contact.name} - showcasing hands-on building and problem-solving skills beyond software.`,
  data.contact,
  {
    other: {
      "ai:project-types": "engineering,construction,craftsmanship",
      "ai:skills-demonstrated":
        "hands-on building,engineering design,craftsmanship",
      "professional:creative-work": "true",
    },
    openGraph: {
      title: `${displayName}'s Projects - Engineering Beyond Software`,
      description: `Creative engineering projects showcasing hands-on building skills and craftsmanship by ${data.contact.name}.`,
      images: [
        {
          url: "/treehouse.png",
          width: 1200,
          height: 800,
          alt: "4-season treehouse built 12 feet above ground",
        },
      ],
    },
  }
);

export default function Projects() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Engineering Beyond Software
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Creative projects that showcase the same engineering mindset and
              attention to detail I bring to digital platforms and enterprise
              architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto space-y-12">
            {data.projects.map((project, index) => (
              <div key={index} className="card overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Project Image */}
                  <div className="relative">
                    <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src="/treehouse.png"
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold text-gray-900">
                          {project.title}
                        </h2>
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          {project.period}
                        </span>
                      </div>

                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Engineering Highlights */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Engineering Highlights
                      </h3>
                      <div className="grid gap-3">
                        {project.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Specs */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Technical Specifications
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">
                            Platform Size:
                          </span>
                          <span className="text-gray-600 ml-2">
                            8&apos; × 8&apos;
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            Height:
                          </span>
                          <span className="text-gray-600 ml-2">
                            12 feet above ground
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            Season Rating:
                          </span>
                          <span className="text-gray-600 ml-2">
                            4-season weatherproofing
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">
                            Construction:
                          </span>
                          <span className="text-gray-600 ml-2">
                            Custom built from concept
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Personal Note */}
                    <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
                      <div className="flex items-start gap-3">
                        <svg
                          className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-primary-800 font-medium mb-2">
                            Engineering Philosophy
                          </p>
                          <p className="text-primary-700 text-sm leading-relaxed">
                            Built in response to a heartfelt request from my
                            children, this project demonstrates the same
                            principles I apply to enterprise software:
                            thoughtful planning, quality construction,
                            user-centered design, and building things that last.
                            Whether it&apos;s cloud architecture or backyard
                            engineering, the mindset remains the same.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building Things That Matter
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              From enterprise platforms serving millions to treehouses
              delighting children, I believe in applying engineering excellence
              to everything I build.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Discuss Your Project
              </a>
              <a href="/resume" className="btn-secondary">
                View Professional Experience
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
