"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, Check } from "lucide-react";

import { SectionTitle, SectionDescription } from "@/components/common/SectionHeading";
import { floorPlanData } from "@/type/template.type";

export default function FloorPlanSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activePlan = floorPlanData.items[activeIndex];

  if (!activePlan) return null;

  return (
    <section
      id={floorPlanData.id}
      aria-labelledby="floor-plan-title"
      className="section-spacing bg-white "
    >
      <div className="page-container">
        <header className="mx-auto max-w-4xl text-center">
          <p className="flex items-center justify-center gap-4 text-sm font-bold tracking-[0.24em] text-[#94550b] sm:gap-6 sm:text-base">
            <span aria-hidden="true" className="h-px w-10 bg-[#c78927] sm:w-24" />
            {floorPlanData.eyebrow}
            <span aria-hidden="true" className="h-px w-10 bg-[#c78927] sm:w-24" />
          </p>
          <SectionTitle id="floor-plan-title" className="mt-5  sm:mt-7">
            {floorPlanData.title}
          </SectionTitle>
          <SectionDescription className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#102139] sm:mt-6 sm:text-xl">
            {floorPlanData.subtitle}
          </SectionDescription>
        </header>

        <div className="mx-auto mt-8 max-w-5xl sm:mt-10">
          <div
            role="group"
            aria-label="Select apartment configuration"
            className="flex flex-wrap rounded-2xl border border-[#e9ddcd] bg-[#f8f2ea] shadow-sm"
          >
            {floorPlanData.items.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="floor-plan-details"
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex min-h-16 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-2 py-4 text-sm font-extrabold sm:min-h-20 sm:gap-4 sm:px-4 sm:text-2xl ${
                    isActive
                      ? "z-10 bg-linear-to-b from-[#f8d26a] to-[#d7a032] text-[#261b0e] shadow-md"
                      : "text-[#102139] hover:bg-[#f3e6d2]"
                  }`}
                >
                  <Building2
                    aria-hidden="true"
                    className={`size-5 shrink-0 sm:size-8 ${isActive ? "" : "text-[#a66a10]"}`}
                  />
                  {item.tab}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-[#d7a032]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div id="floor-plan-details" className="mt-6 overflow-hidden rounded-2xl border border-[#e9ddcd] bg-white shadow-sm sm:mt-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePlan.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reduceMotion ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                className="grid min-w-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
              >
                <div className="p-6 sm:p-8 lg:p-10">
                  <h3 className="font-display text-3xl font-bold leading-tight text-[#102139] sm:text-4xl">
                    {activePlan.title}
                  </h3>
                  <p className="mt-3 inline-flex flex-wrap gap-x-2 rounded-lg bg-[#f8f2ea] px-3 py-2 text-sm font-semibold text-[#73460e]">
                    <span>{floorPlanData.areaLabel}</span>
                    <span>{activePlan.area}</span>
                  </p>

                  <ul className="mt-6 grid gap-3 border-t border-[#eee3d5] pt-5">
                    {activePlan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-base leading-snug text-[#102139]">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#fcf0d5] text-[#905907]">
                          <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid min-w-0 place-items-center border-t border-[#eee3d5] bg-[#f8f2ea] p-4 sm:p-6 md:border-t-0 md:border-l">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={activePlan.image}
                      alt={activePlan.alt}
                      fill
                      sizes="(max-width: 767px) 90vw, (max-width: 1200px) 55vw, 570px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
