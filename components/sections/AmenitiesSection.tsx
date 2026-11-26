"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  Waves,
  Dumbbell,
  Building2,
  Blocks,
  Trees,
  Gamepad2,
  CarFront,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { SectionTitle } from "@/components/common/SectionHeading";
import { amenitiesData } from "@/type/template.type";

const amenities = amenitiesData;

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// ICON MAPPING
// ========================================

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

// ========================================
// ANIMATION VARIANTS
// ========================================

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

export default function AmenitiesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={amenities.id}
      className="
        relative isolate overflow-hidden
        bg-[#f7f4ef]
        section-spacing
      "
    >

      {/* ========================================
          MAIN CONTAINER
      ======================================== */}

      <div
        className="
          relative z-10 page-container
        "
      >
        {/* SECTION HEADING */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 25 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            ease: EASE,
          }}
          className="mx-auto mb-8 text-center md:mb-10"
        >
          {/* SUBTITLE */}

          <div
            className="
              mb-3 flex items-center
              justify-center gap-3
              sm:gap-4
            "
          >
            <span
              className="
                h-px w-8 bg-[#e69203]
                sm:w-14
              "
            />

            <span
              className="
                text-[10px] font-bold uppercase
                tracking-[0.25em]
                text-[#102139]
                sm:text-xs
              "
            >
              {amenities.subtitle}
            </span>

            <span
              className="
                h-px w-8 bg-[#e69203]
                sm:w-14
              "
            />
          </div>

          {/* TITLE */}

          <SectionTitle
            className="text-[#102139]"
          >
            {amenities.title}
          </SectionTitle>
        </motion.div>

        {/* ========================================
            AMENITIES CARDS
        ======================================== */}

        <motion.div
          variants={
            reduceMotion ? undefined : containerVariants
          }
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            mx-auto grid max-w-[1200px]
            grid-cols-2 gap-4
            md:gap-6
            lg:grid-cols-4
          "
        >
          {amenities.items.map((item) => {
            const Icon = icons[item.icon] ?? Waves;

            return (
              <motion.div
                key={item.id}
                variants={
                  reduceMotion ? undefined : cardVariants
                }
                whileHover={
                  reduceMotion ? undefined : { y: -6 }
                }
                className="
                  group relative isolate
                  flex h-full min-h-[125px]
                  flex-col items-center
                  justify-center gap-3
                  overflow-hidden
                  rounded-2xl
                  border border-[#102139]/5
                  bg-white/90
                  px-3 py-6
                  text-center
                  shadow-[0_5px_12px_rgba(0,0,0,0.08)]
                  transition-[background-color,border-color,box-shadow]
                  duration-500
                  hover:border-[#e69203]/40
                  hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                  md:min-h-[150px]
                  md:px-5 md:py-7
                "
              >
                {/* GOLDEN HOVER BACKGROUND */}

                <span
                  aria-hidden="true"
                  className="
                    absolute inset-0 -z-10
                    origin-bottom scale-y-0
                    bg-[#e69203]
                    transition-transform duration-500
                    ease-out
                    group-hover:scale-y-100
                    motion-reduce:transition-none
                  "
                />

                {/* AMENITY ICON */}

                <Icon
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="
                    h-9 w-9
                    text-[#102139]
                    transition-all duration-500
                    group-hover:scale-110
                    group-hover:text-white
                    motion-reduce:transform-none
                    md:h-12 md:w-12
                  "
                />

                {/* AMENITY TITLE */}

                <h3
                  className="
                    text-sm font-bold
                    leading-snug text-[#102139]
                    transition-colors duration-500
                    group-hover:text-white
                    md:text-base
                  "
                >
                  {item.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
