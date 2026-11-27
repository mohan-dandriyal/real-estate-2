import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { SectionTitle } from "@/components/common/SectionHeading";
import { projectsData } from "@/type/template.type";

export default function ProjectsSection() {
  const { id, subtitle, title, items } = projectsData;

  return (
    <section
      id={id}
      aria-labelledby="properties-title"
      className="section-spacing border-t border-[#e8ded0] bg-[#f7f1e8] text-[#102139]"
    >
      <div className="page-container">
        <header className="mb-7 sm:mb-9">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.19em] text-[#805008] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {subtitle}
          </p>
          <SectionTitle id="properties-title" className="mt-4">
            {title}
          </SectionTitle>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {items.map((project) => (
            <li key={project.id}>
              <Link
                href={project.href}
                aria-label={`Enquire about ${project.title}`}
                className="group grid h-full overflow-hidden rounded border border-[#e8ded0] bg-[#fffdfa] transition-colors hover:border-[#a98356] focus-visible:outline-offset-[-3px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8ded0] lg:aspect-auto lg:min-h-52">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 1440px) 320px, (min-width: 1024px) 24vw, (min-width: 640px) 47vw, 93vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-between gap-4 p-4 sm:p-5">
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex items-start gap-1.5 text-sm text-[#50463d]">
                      <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#805008]" />
                      {project.location}
                    </p>
                  </div>

                  <span aria-hidden="true" className="inline-flex items-center gap-2 border-t border-[#e8ded0] pt-3 text-sm font-semibold text-[#805008] group-hover:underline">
                    Enquire
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
