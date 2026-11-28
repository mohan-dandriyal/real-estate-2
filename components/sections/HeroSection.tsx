"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { heroData } from "@/type/template.type";

export default function HeroSection() {
    const { slides, settings } = heroData;
    const [index, setIndex] = useState(0);
    const reduceMotion = useReducedMotion();
    const slide = slides[index];
    const canAutoplay = settings.autoplay && !reduceMotion && slides.length > 1;

    useEffect(() => {
        if (!canAutoplay) return;

        const timer = window.setTimeout(() => {
            setIndex((index + 1) % slides.length);
        }, settings.interval);

        return () => window.clearTimeout(timer);
    }, [canAutoplay, index, settings.interval, slides.length]);

    if (!slide) return null;

    return (
        <section
            id="home"
            aria-labelledby="hero-title"
            className="relative isolate flex h-[min(30rem,calc(100svh-76px))] flex-col overflow-hidden bg-[#faf7f1] text-[#102139] md:h-[min(38rem,calc(100svh-76px))]"
        >
            <div className="relative order-2 h-[44%] shrink-0 overflow-hidden md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[76%]">
                <AnimatePresence initial={false}>
                    {slide && (
                        <motion.div
                            key={slide.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : settings.duration }}
                        >
                            <Image
                                src={slide.image}
                                alt={slide.alt}
                                fill
                                fetchPriority={index === 0 ? "high" : "auto"}
                                sizes="(min-width: 768px) 76vw, 100vw"
                                className="object-cover"
                                style={{ objectPosition: slide.position }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#faf7f1] to-transparent to-22% md:bg-linear-to-r md:via-[#faf7f1]/90 md:via-16% md:to-58%" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#faf7f1] to-transparent to-20% md:to-30%" />
            </div>

            <div className="page-container relative flex min-h-0 grow flex-col overflow-y-auto py-4 md:py-6">
                <AnimatePresence initial={false}>
                    <div key={slide.id} className="my-auto max-w-xl wrap-anywhere md:max-w-[52%]">
                        <motion.h1
                            id="hero-title"
                            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
                            className="font-display font-semibold leading-[0.94] tracking-[-0.04em]"
                        >
                            <span className="block text-[clamp(1.85rem,3.7vw,3.75rem)]">{slide.title}</span>
                            <span className="mt-1 block text-[clamp(3.25rem,7.15vw,7rem)]">{slide.highlight}</span>
                        </motion.h1>

                        <motion.p
                            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.12, ease: "easeOut" }}
                            className="mt-5 max-w-sm text-sm leading-relaxed text-[#50463d] sm:text-base"
                        >
                            {slide.description}
                        </motion.p>
                    </div>
                </AnimatePresence>
            </div>

            {slides.length > 1 && (
                <div className="page-container relative z-10 order-3 flex shrink-0 justify-center pb-2 md:justify-end md:pb-4">
                    <div role="group" aria-label="Hero images" className="flex items-center gap-1 rounded-full bg-[#faf7f1]/90 px-2">
                        {slides.map((item, slideIndex) => (
                            <button
                                key={item.id}
                                type="button"
                                aria-label={`Show image ${slideIndex + 1}: ${item.alt}`}
                                aria-current={index === slideIndex}
                                onClick={() => setIndex(slideIndex)}
                                className="group grid size-9 place-items-center"
                            >
                                <span aria-hidden="true" className="h-1 w-6 rounded-full bg-[#bbae9f] transition-colors group-hover:bg-[#805008] group-aria-current:bg-[#805008] motion-safe:transition-[background-color,scale] motion-safe:group-hover:scale-125 motion-safe:group-focus-visible:scale-125" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
