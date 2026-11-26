"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { ArrowRight } from "lucide-react";
import { SectionTitle, SectionDescription } from "@/components/common/SectionHeading";
import { aboutData } from "@/type/template.type";

const about = aboutData;

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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

export default function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={about.id}
      className="relative overflow-hidden bg-[#fafafa] section-spacing"
    >
      <div
        className="
          page-container grid
          grid-cols-1 items-center
          gap-7
          md:grid-cols-[1.1fr_1fr] md:gap-8 lg:gap-16
        "
      >
        {/* ========================================
            LEFT IMAGE SECTION
        ======================================== */}

        <div
          className="
            relative isolate w-full
            aspect-[1.9] sm:aspect-[2.3]
            lg:aspect-auto lg:h-[600px]
          "
        >
          {/* TOP LEFT DECORATIVE BORDER */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: -20, y: -20 }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: EASE,
            }}
            className="
              pointer-events-none absolute
              left-0 top-0
              h-[35%] w-[25%]
              rounded-tl-[30px]
              border-l-2 border-t-2
              border-[#e69203]
            "
          />

          {/* BOTTOM LEFT GOLDEN SHAPE */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 0.7 }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              delay: reduceMotion ? 0 : 0.3,
              ease: EASE,
            }}
            className="
              absolute bottom-0 left-0
              h-[32%] w-[20%]
              rounded-[24px]
              bg-[#f2b63d]
            "
          />

          {/* DOTTED BACKGROUND PATTERN */}

          <motion.div
            aria-hidden="true"
            initial={false}
            whileInView={{ scale: reduceMotion ? 1 : [1, 1.12, 1] }}
            transition={{
              duration: reduceMotion ? 0 : 4,
              ease: "easeInOut",
              repeat: reduceMotion ? 0 : Infinity,
            }}
            className="
              pointer-events-none absolute
              right-[3%] top-[5%]
              h-[35%] w-[25%]
            "
            style={{
              backgroundImage:
                "radial-gradient(circle, #10213935 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* MAIN INTERIOR IMAGE */}

          <div
            className="
              group absolute
              left-[3%] top-[4%]
              h-[92%] w-[70%]
              overflow-hidden
              rounded-[20px]
              border-4 border-white
              shadow-[0_12px_35px_rgba(0,0,0,0.12)]
              sm:rounded-[28px]
            "
          >
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(max-width: 767px) 70vw, 36vw"
              className="
                object-cover object-center
                transition-transform duration-1000
                group-hover:scale-105
                motion-reduce:transform-none
              "
            />
          </div>

          {/* SECONDARY IMAGE DECORATIVE BORDER */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 20, y: 20 }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.5,
              ease: EASE,
            }}
            className="
              pointer-events-none absolute
              bottom-0 right-0
              h-[48%] w-[40%]
              rounded-br-[28px]
              border-b-2 border-r-2
              border-[#e69203]
            "
          />

          {/* OVERLAPPING PROPERTY IMAGE */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 40,
                    y: 30,
                    scale: 0.95,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.1,
              delay: reduceMotion ? 0 : 0.35,
              ease: EASE,
            }}
            className="
              group absolute z-10
              bottom-[3%] right-[1%]
              h-[65%] w-[45%]
              overflow-hidden
              rounded-[20px]
              border-4 border-white
              bg-white
              shadow-[0_12px_30px_rgba(0,0,0,0.18)]
              sm:rounded-[28px]
              sm:border-[6px]
            "
          >
            <Image
              src={about.background.src}
              alt={about.background.alt}
              fill
              sizes="(max-width: 767px) 45vw, 24vw"
              className="
                object-cover object-center
                transition-transform duration-1000
                group-hover:scale-110
                motion-reduce:transform-none
              "
            />
          </motion.div>
        </div>

        {/* ========================================
            RIGHT CONTENT SECTION
        ======================================== */}

        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="relative z-10"
        >
          {/* SUBTITLE */}

          <motion.div
            variants={reduceMotion ? undefined : contentVariants}
            className="
              mb-2 flex items-center gap-3
              text-xs font-bold uppercase
              tracking-[0.25em]
              text-[#102139]
              md:text-sm
            "
          >
            <span className="h-[2px] w-9 bg-[#e69203]" />

            {about.subtitle}
          </motion.div>

          {/* MAIN HEADING */}

          <SectionTitle
            className="text-[#102139]"
          >
            <span className="block pb-1">{about.title}</span>{" "}
            <span className="block pb-1 font-semibold italic text-[#e69203]">
              {about.highlight}
            </span>
          </SectionTitle>

          {/* DESCRIPTION */}

          <SectionDescription
            variants={reduceMotion ? undefined : contentVariants}
            className="
              mt-2 max-w-[560px]
              text-base leading-relaxed
              text-[#475569]
            "
          >
            {about.description}
          </SectionDescription>

          {/* CTA BUTTON */}

          <motion.div
            variants={reduceMotion ? undefined : contentVariants}
            className="mt-4"
          >
            <motion.a
              href={about.button.href}
              whileTap={
                reduceMotion ? undefined : { scale: 0.97 }
              }
              className="
                group relative isolate inline-flex
                items-center justify-center
                gap-4 overflow-hidden
                rounded-xl
                border border-[#e69203]
                px-5 py-2
                text-sm font-semibold
                text-[#b87500]
                transition-colors duration-500
                hover:text-white
                md:text-[15px]
              "
            >
              {/* BUTTON HOVER BACKGROUND */}

              <span
                className="
                  absolute inset-0 -z-10
                  origin-left scale-x-0
                  bg-[#e69203]
                  transition-transform duration-500
                  ease-out
                  group-hover:scale-x-100
                  motion-reduce:transition-none
                "
              />

              <span>{about.button.label}</span>

              <ArrowRight
                size={20}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                  motion-reduce:transform-none
                "
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
