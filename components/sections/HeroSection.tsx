"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import Image from "next/image";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react";

import { SectionTitle, SectionDescription } from "@/components/common/SectionHeading";
import { heroData } from "@/type/template.type";

const hero = heroData;

const EASE = [0.22, 1, 0.36, 1] as const;

const contentVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.35,
            staggerChildren: 0.16,
        },
    },
};

const revealVariants: Variants = {
    hidden: {
        y: "110%",
        opacity: 0,
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: {
            duration: 1.15,
            ease: EASE,
        },
    },
};

const fadeVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: EASE,
        },
    },
};

export default function HeroSection() {
    const [index, setIndex] = useState(0);
    const [cycle, setCycle] = useState(0);

    const reduceMotion = useReducedMotion();

    const { slides, settings } = hero;
    const total = slides.length;
    const currentSlide = slides[index];

    const autoplay =
        settings.autoplay && !reduceMotion;

    // ========================================
    // SLIDE NAVIGATION
    // ========================================

    const changeSlide = useCallback(
        (direction: number) => {
            setIndex((prev) => {
                return (prev + direction + total) % total;
            });

            setCycle((prev) => prev + 1);
        },
        [total]
    );

    const goToSlide = (slideIndex: number) => {
        setIndex(slideIndex);
        setCycle((prev) => prev + 1);
    };

    // ========================================
    // AUTO PLAY
    // ========================================

    useEffect(() => {
        if (!autoplay || total <= 1) return;

        const timer = window.setTimeout(() => {
            changeSlide(1);
        }, settings.interval);

        return () => window.clearTimeout(timer);
    }, [autoplay, cycle, total, changeSlide, settings.interval]);

    
    return (
        <section
            id="home"
            aria-label="Featured residences"
            aria-roledescription="carousel"
            onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                    changeSlide(-1);
                }

                if (event.key === "ArrowRight") {
                    changeSlide(1);
                }
            }}
            className="
        relative isolate flex sm:min-h-[100svh] min-h-[70vh]
        w-full items-center overflow-hidden
        bg-[#101c29] text-white
      "
        >
            {/* BACKGROUND SLIDER */}

            <AnimatePresence initial={false}>
                <motion.div
                    key={currentSlide.id}
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{
                        duration: reduceMotion
                            ? 0
                            : settings.duration,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                >
                    <motion.div
                        initial={{
                            scale: reduceMotion ? 1 : 1.08,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            duration: reduceMotion
                                ? 0
                                : settings.interval / 1000 +
                                settings.duration,
                            ease: "linear",
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={currentSlide.image}
                            alt={currentSlide.alt}
                            fill
                            priority={index === 0}
                            sizes="100vw"
                            className="object-cover"
                            style={{
                                objectPosition:
                                    currentSlide.position,
                            }}
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* TEXT CONTRAST */}

            <div
                className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r
          from-[#07141d]/75
          via-[#07141d]/50
          to-[#07141d]/50
        "
            />


            <div
                className="
          page-container relative z-10
          pt-32 pb-40
          lg:pt-24 lg:pb-24
        "
            >
                <motion.div
                    variants={contentVariants}
                    initial={reduceMotion ? false : "hidden"}
                    animate="visible"
                    className="max-w-[1050px]"
                >
                    {/* EYEBROW */}

                    <motion.div
                        variants={fadeVariants}
                        className="
              mb-6 flex items-center gap-3
              text-xs font-semibold uppercase
              tracking-[0.25em] text-white/75
              sm:text-sm
            "
                    >
                        <span
                            className="
                h-1.5 w-1.5 shrink-0
                rounded-full bg-[#e59202]
              "
                        />

                        {hero.eyebrow}
                    </motion.div>

                    {/* HEADING */}

                    <SectionTitle as="h1"
                        className="
                            font-semibold
                            text-[clamp(2.875rem,5vw,5rem)]
                            leading-[0.94]
                            tracking-[-0.045em] text-white
                            "
                    >
                        <span className="block overflow-hidden pb-2">
                            <motion.span
                                variants={revealVariants}
                                className="block"
                            >
                                {hero.title}
                            </motion.span>
                        </span>

                        <span className="block overflow-hidden pb-7">
                            <motion.span
                                variants={revealVariants}
                                className="
                  block italic text-[#e9a313]
                "
                            >
                                {hero.highlight}
                            </motion.span>
                        </span>
                    </SectionTitle>

                    {/* DESCRIPTION */}

                    <motion.div
                        variants={fadeVariants}
                        className="
              mt-1 max-w-lg text-base
              leading-relaxed text-white
              lg:text-lg
            "
                    >
                        {hero.description.map((item, i) => (
                            <SectionDescription key={i}>{item}</SectionDescription>
                        ))}
                    </motion.div>

                </motion.div>
            </div>

            {/* SCROLL TO DISCOVER */}


            {/* SLIDER CONTROLS */}
            <div
                className="page-container absolute inset-x-0 bottom-8 lg:bottom-10"
            >

                <div className="flex items-center justify-between w-full gap-4">

                    <div />

                    {/* PROGRESS INDICATORS */}
                    <div className="flex items-center gap-2">
                        {slides.map((slide, i) => (
                            <button
                                key={slide.id}
                                type="button"
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={index === i}
                                onClick={() => goToSlide(i)}
                                className="
                                    relative flex 
                                    w-8 items-center sm:w-10 "
                            >
                                <span
                                    className="
                                        relative block h-[4px] rounded-full
                                        w-full overflow-hidden
                                        bg-white/30
                  "
                                >
                                    {index === i && (
                                        <motion.span
                                            key={cycle}
                                            initial={{
                                                scaleX: autoplay ? 0 : 1,
                                            }}
                                            animate={{
                                                scaleX: 1,
                                            }}
                                            transition={{
                                                duration: autoplay
                                                    ? settings.interval / 1000
                                                    : 0,
                                                ease: "linear",
                                            }}
                                            className="
                        absolute inset-0
                        origin-left bg-[#e9a313]
                      "
                                        />
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <button
                            type="button"
                            aria-label="Previous slide"
                            onClick={() => changeSlide(-1)}
                            className="
                                    text-white/70 transition-colors
                                    hover:text-[#e9a313] border h-10 w-10 flex justify-center items-center cursor-pointer group
            "
                        >
                            <ArrowLeft size={21} />
                        </button>

                        <button
                            type="button"
                            aria-label="Next slide"
                            onClick={() => changeSlide(1)}
                            className="
                                    text-white/70 transition-colors border h-10 w-10 flex justify-center items-center cursor-pointer group
                                    hover:text-[#e9a313]
            "
                        >
                            <ArrowRight size={21} />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
