import Image from "next/image";
import {
  Blocks,
  Building2,
  CarFront,
  Dumbbell,
  Gamepad2,
  ShieldCheck,
  Trees,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { SectionTitle } from "@/components/common/SectionHeading";
import { amenitiesData } from "@/type/template.type";

const icons: Record<string, LucideIcon> = {
  swimming: Waves,
  dumbbell: Dumbbell,
  building: Building2,
  blocks: Blocks,
  trees: Trees,
  gamepad: Gamepad2,
  car: CarFront,
  "shield-check": ShieldCheck,
};

export default function AmenitiesSection() {
  const { id, subtitle, title, image, items } = amenitiesData;

  return (
    <section
      id={id}
      aria-labelledby="amenities-title"
      className="section-spacing border-t border-[#e8ded0] bg-[#faf7f1] text-[#102139]"
    >
      <div className="page-container grid items-center gap-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-12">
        <header className="lg:col-start-2 lg:row-start-1 lg:self-end">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.19em] text-[#805008] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {subtitle}
          </p>
          <SectionTitle id="amenities-title" className="mt-4 max-w-xl">
            {title}
          </SectionTitle>
        </header>

        <div className="image-zoom relative aspect-[16/9] overflow-hidden rounded bg-[#e8ded0] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-96 lg:self-stretch">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1440px) 530px, (min-width: 1024px) 40vw, 92vw"
            className="object-cover object-right"
          />
        </div>

        <ul className="grid gap-3 min-[360px]:grid-cols-2 lg:col-start-2 lg:row-start-2 lg:self-start">
          {items.map((item) => {
            const Icon = icons[item.icon] ?? Waves;

            return (
              <li
                key={item.id}
                className="group flex min-h-16 items-center gap-2.5 rounded border border-[#e8ded0] bg-[#fffdfa] p-2.5 hover:border-[#c39856] hover:bg-[#faf3e6] motion-safe:transition-[translate,box-shadow,border-color,background-color] motion-safe:duration-250 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md sm:gap-3 sm:p-3"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f2e8da] text-[#805008] group-hover:bg-[#805008] group-hover:text-white motion-safe:transition-[scale,background-color,color] motion-safe:duration-250 motion-safe:group-hover:scale-110 sm:size-10">
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold leading-snug sm:text-base">{item.title}</h3>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
