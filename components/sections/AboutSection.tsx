import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { SectionDescription, SectionTitle } from "@/components/common/SectionHeading";
import { aboutData } from "@/type/template.type";

export default function AboutSection() {
  const { id, subtitle, title, highlight, description, button, image, background } = aboutData;

  return (
    <section
      id={id}
      aria-labelledby="about-title"
      className="section-spacing border-t border-[#e8ded0] bg-[#f7f1e8] text-[#102139]"
    >
      <div className="page-container grid items-center gap-9 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.19em] text-[#805008] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {subtitle}
          </p>

          <SectionTitle id="about-title" className="mt-4">
            {title} <span className="block text-[#805008]">{highlight}</span>
          </SectionTitle>

          <SectionDescription className="mt-4 max-w-md text-base leading-relaxed text-[#50463d]">
            {description}
          </SectionDescription>

          <a
            href={button.href}
            className="brand-button mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded border border-[#805008] px-4 py-2.5 text-sm font-semibold text-[#805008] transition-colors hover:bg-[#805008] hover:text-white"
          >
            {button.label}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-end gap-3 sm:gap-5">
          <div className="about-photo image-zoom relative mb-5 aspect-[5/6] overflow-hidden rounded bg-[#e8ded0] sm:mb-8">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1440px) 440px, (min-width: 768px) 33vw, 58vw"
              className="object-cover object-right"
            />
          </div>
          <div className="about-photo image-zoom relative aspect-[4/5] overflow-hidden rounded bg-[#e8ded0]">
            <Image
              src={background.src}
              alt={background.alt}
              fill
              sizes="(min-width: 1440px) 300px, (min-width: 768px) 22vw, 38vw"
              className="object-cover object-[80%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
