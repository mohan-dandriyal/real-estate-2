
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ArrowRight,
  MapPin,
} from "lucide-react";

import { SectionTitle } from "@/components/common/SectionHeading";
import { projectsData } from "@/type/template.type";

const projects = projectsData;

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// ANIMATION VARIANTS
// ========================================

const headingVariants: Variants = {
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: (index % 3) * 0.12,
      ease: EASE,
    },
  }),
};

export default function ProjectsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={projects.id}
      className="
        relative overflow-hidden
        bg-[#fafafa]
        section-spacing
      "
    >
      <div
        className="
          page-container
        "
      >
        {/* ========================================
            SECTION HEADING
        ======================================== */}

        <motion.div
          variants={
            reduceMotion ? undefined : headingVariants
          }
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            mx-auto mb-8 text-center md:mb-10
          "
        >
          {/* SUBTITLE */}

          <div
            className="
              mb-3 flex items-center
              justify-center gap-3 sm:gap-4
            "
          >
            <span
              className="
                h-[2px] w-8 bg-[#e69203]
                sm:w-12
              "
            />

            <span
              className="
                text-[10px] font-bold
                uppercase tracking-[0.25em]
                text-[#102139]
                sm:text-xs
              "
            >
              {projects.subtitle}
            </span>

            <span
              className="
                h-[2px] w-8 bg-[#e69203]
                sm:w-12
              "
            />
          </div>

          {/* TITLE */}

          <SectionTitle
            className="text-[#102139]"
          >
            {projects.title}
          </SectionTitle>
        </motion.div>

        {/* ========================================
            PROJECTS GRID
        ======================================== */}

        <div
          className="
            grid grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-7
          "
        >
          {projects.items.map((project, index) => (
            <motion.article
              key={project.id}
              custom={index}
              variants={
                reduceMotion ? undefined : cardVariants
              }
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              whileHover={
                reduceMotion ? undefined : { y: -6 }
              }
              className="
                group relative h-full
                overflow-hidden rounded-2xl
                border border-[#102139]/5
                bg-white
                shadow-[0_4px_12px_rgba(16,33,57,0.10)]
                transition-shadow duration-500
                hover:shadow-[0_15px_35px_rgba(16,33,57,0.15)]
              "
            >
              <Link
                href={project.href}
                aria-label={`Enquire about ${project.title}`}
                className="
                  flex h-full flex-col
                  focus-visible:outline-2
                  focus-visible:outline-offset-[-3px]
                  focus-visible:outline-[#e69203]
                "
              >
                {/* ========================================
                    PROJECT IMAGE
                ======================================== */}

                <div
                  className="
                    relative h-[220px] w-full
                    overflow-hidden
                    bg-[#f0f0f0]
                    sm:h-[230px]
                    lg:h-[240px]
                  "
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="
                      object-cover object-center
                      transition-transform
                      duration-1000 ease-out
                      group-hover:scale-110
                      motion-reduce:transform-none
                    "
                  />

                  {/* IMAGE HOVER OVERLAY */}

                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      bg-[#102139]/0
                      transition-colors duration-500
                      group-hover:bg-[#102139]/10
                    "
                  />
                </div>

                {/* ========================================
                    PROJECT CONTENT
                ======================================== */}

                <div
                  className="
                    flex flex-1 items-center
                    justify-between gap-4
                    px-5 py-4
                    md:px-6 md:py-5
                  "
                >
                  <div className="min-w-0 flex-1">
                    {/* PROJECT TITLE */}

                    <h3
                      className="
                        text-lg font-bold
                        leading-tight
                        text-[#102139]
                        transition-colors duration-300
                        group-hover:text-[#b87500]
                        md:text-xl
                      "
                    >
                      {project.title}
                    </h3>

                    {/* PROJECT LOCATION */}

                    <div
                      className="
                        mt-2 flex items-center
                        gap-2
                        text-sm font-medium
                        text-[#475569]
                      "
                    >
                      <MapPin
                        size={18}
                        strokeWidth={2.3}
                        aria-hidden="true"
                        className="
                          shrink-0 text-[#e69203]
                        "
                      />

                      <span>
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* ARROW BUTTON */}

                  <div
                    aria-hidden="true"
                    className="
                      relative isolate
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      overflow-hidden rounded-full
                      border border-[#e69203]
                      text-[#e69203]
                      transition-colors duration-500
                      group-hover:text-white
                    "
                  >
                    {/* BUTTON HOVER BACKGROUND */}

                    <span
                      className="
                        absolute inset-0 -z-10
                        scale-0 rounded-full
                        bg-[#e69203]
                        transition-transform
                        duration-500 ease-out
                        group-hover:scale-110
                        motion-reduce:transition-none
                      "
                    />

                    <ArrowRight
                      size={21}
                      strokeWidth={2}
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-0.5
                        motion-reduce:transform-none
                      "
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
