import Image from "next/image";
import { ArrowRight, Bath, BedDouble, Check, CookingPot, Fence, Shirt, Sofa, WashingMachine } from "lucide-react";

import { SectionTitle, SectionDescription } from "@/components/common/SectionHeading";
import { floorPlanData } from "@/type/template.type";

const featureIcons = [
  { pattern: /bedroom/i, Icon: BedDouble },
  { pattern: /bathroom/i, Icon: Bath },
  { pattern: /living|dining/i, Icon: Sofa },
  { pattern: /kitchen/i, Icon: CookingPot },
  { pattern: /balcon/i, Icon: Fence },
  { pattern: /utility/i, Icon: WashingMachine },
  { pattern: /wardrobe/i, Icon: Shirt },
];

export default function FloorPlanSection() {
  if (floorPlanData.items.length === 0) return null;

  return (
    <section
      id={floorPlanData.id}
      aria-labelledby="floor-plan-title"
      className="section-spacing border-t border-[#e8ded0] bg-[#faf7f1] text-[#102139]"
    >
      <div className="page-container">
        <header className="max-w-4xl">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.19em] text-[#805008] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {floorPlanData.eyebrow}
          </p>
          <SectionTitle id="floor-plan-title" className="mt-4">
            {floorPlanData.title}
          </SectionTitle>
          <SectionDescription className="mt-4 max-w-2xl text-base leading-relaxed text-[#50463d]">
            {floorPlanData.subtitle}
          </SectionDescription>
        </header>

        <ul className="mx-auto mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {floorPlanData.items.map((item) => (
            <li key={item.id} className="rounded border border-[#e8ded0] bg-[#fffdfa] p-4 lg:p-6">
              <div className="image-zoom relative aspect-[16/10] w-full overflow-hidden rounded bg-[#f7f1e8]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 540px) 90vw, (max-width: 767px) 480px, (max-width: 1200px) 30vw, 330px"
                  className="object-contain"
                />
              </div>

              <div className="mt-4">
                <h3 className="font-display text-2xl font-bold leading-tight text-[#102139] lg:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 inline-flex flex-wrap gap-x-1 rounded-full bg-[#f2e8da] px-3 py-1 text-sm text-[#805008]">
                  <span>{floorPlanData.areaLabel}</span>
                  <span className="font-bold text-[#102139]">{item.area}</span>
                </p>
              </div>

              <ul className="mt-3 grid gap-4 border-t border-[#e8ded0] pt-3 lg:px-4">
                {item.features.map((feature) => {
                  const Icon = featureIcons.find(({ pattern }) => pattern.test(feature))?.Icon ?? Check;

                  return (
                    <li key={feature} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-[#102139]">
                      <Icon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#805008]" />
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
