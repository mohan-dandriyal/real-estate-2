
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { SectionTitle } from "@/components/common/SectionHeading";
import { galleryData } from "@/type/template.type";

import "swiper/css";
import "./ProjectGallery.css";

const gallery = galleryData;
const canLoop = gallery.items.length >= 4;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectGallery() {
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const reduceMotion = useReducedMotion();

  // ========================================
  // UPDATE SWIPER STATE
  // ========================================

  const updateSwiper = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // ========================================
  // SLIDER NAVIGATION
  // ========================================

  const previousSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const goToSlide = (index: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (canLoop) {
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  };

  return (
    <section
      id={gallery.id}
      className="
        relative overflow-hidden
        bg-white section-spacing
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
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 30 }
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
          className="mb-8 text-center md:mb-10"
        >
          {/* SUBTITLE */}

          <div
            className="
              mb-3 flex items-center
              justify-center gap-4
            "
          >
            <span className="h-[2px] w-10 bg-[#e69203]" />

            <span
              className="
                text-xs font-bold uppercase
                tracking-[0.25em] text-[#102139]
              "
            >
              {gallery.subtitle}
            </span>

            <span className="h-[2px] w-10 bg-[#e69203]" />
          </div>

          {/* TITLE */}

          <SectionTitle
            className="text-[#102139]"
          >
            {gallery.title}
          </SectionTitle>
        </motion.div>

        {/* ========================================
            GALLERY SLIDER
        ======================================== */}

        <div>
          <Swiper
            modules={[Autoplay, Keyboard, A11y]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateSwiper(swiper);
            }}
            onSlideChange={updateSwiper}
            onResize={updateSwiper}
            slidesPerView={1.2}
            spaceBetween={12}
            centeredSlides
            speed={
              reduceMotion ? 0 : gallery.settings.speed
            }
            loop={canLoop}
            grabCursor
            watchSlidesProgress
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            autoplay={
              gallery.settings.autoplay && !reduceMotion
                ? {
                    delay: gallery.settings.delay,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: !canLoop,
                  }
                : false
            }
            breakpoints={{
              640: {
                slidesPerView: 1.33,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 1.45,
                spaceBetween: 24,
              },
            }}
            className="project-gallery-swiper"
          >
            {gallery.items.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <SwiperSlide
                  key={item.id}
                  className="project-gallery-slide"
                >
                  <article
                    className="
                      group relative h-full w-full
                      overflow-hidden bg-[#102139]
                    "
                  >
                    {/* ========================================
                        GALLERY IMAGE
                    ======================================== */}

                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="
                        (max-width: 640px) 84vw,
                        (max-width: 1024px) 75vw,
                        70vw
                      "
                      className="
                        object-cover object-center
                        transition-transform
                        duration-1000 ease-out
                        group-hover:scale-105
                        motion-reduce:transform-none
                      "
                    />

                    {/* DARK OVERLAY */}

                    <div
                      className={`
                        pointer-events-none
                        absolute inset-0
                        transition-opacity duration-700
                        bg-gradient-to-t
                        from-black/40 via-transparent
                        to-transparent
                        ${isActive ? "opacity-100" : "opacity-0"}
                      `}
                    />

                    {/* INACTIVE SLIDE CLICK AREA */}

                    {!isActive && (
                      <button
                        type="button"
                        aria-label={`View ${item.title}`}
                        onClick={() => goToSlide(index)}
                        className="
                          absolute inset-0 z-10
                          cursor-pointer
                        "
                      />
                    )}

                    {/* ========================================
                        ACTIVE SLIDE CONTENT
                    ======================================== */}

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key={item.id}
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 25,
                                }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: reduceMotion ? 0 : 15,
                          }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.5,
                            delay: reduceMotion ? 0 : 0.2,
                            ease: EASE,
                          }}
                          className="
                            absolute inset-x-4 bottom-4
                            z-20 flex flex-col
                            items-start justify-between
                            gap-5 border border-white/15
                            bg-[#102139]/55
                            p-5 backdrop-blur-xl
                            md:inset-x-6 md:bottom-6
                            lg:inset-x-8 lg:bottom-8
                            lg:flex-row lg:items-center
                            lg:p-6
                          "
                        >
                          {/* DESCRIPTION */}

                          <p
                            className="
                              max-w-[550px]
                              text-sm font-semibold
                              leading-relaxed text-white
                              md:text-base lg:text-lg
                            "
                          >
                            {item.description}
                          </p>

                          {/* CTA BUTTON */}

                          <Link
                            href={item.button.href}
                            className="
                              group/button relative isolate
                              inline-flex shrink-0
                              items-center justify-between
                              gap-5 overflow-hidden
                              bg-[#e69203]
                              px-6 py-4
                              text-sm font-bold
                              text-[#102139]
                              transition-colors duration-500
                              hover:text-white
                            "
                          >
                            <span
                              className="
                                absolute inset-0 -z-10
                                origin-left scale-x-0
                                bg-[#102139]
                                transition-transform
                                duration-500 ease-out
                                group-hover/button:scale-x-100
                                motion-reduce:transition-none
                              "
                            />

                            {item.button.label}

                            <ArrowRight
                              size={20}
                              className="
                                transition-transform duration-300
                                group-hover/button:translate-x-1
                                motion-reduce:transform-none
                              "
                            />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* ========================================
            SLIDER BOTTOM CONTROLS
        ======================================== */}

        <div
          className="
            mt-7 flex flex-wrap items-center
            justify-between gap-4
          "
        >
          {/* SLIDE COUNTER */}

          <div />

          {/* CUSTOM PAGINATION */}

          <div
            className="
              hidden flex-1 items-center
              justify-center gap-2 sm:flex
            "
          >
            {gallery.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index}
                onClick={() => goToSlide(index)}
                className="flex h-8 items-center"
              >
                <span
                  className={`
                    block h-[3px] rounded-full
                    transition-all duration-500
                    ${
                      activeIndex === index
                        ? "w-10 bg-[#e69203]"
                        : "w-5 bg-[#102139]/20 hover:bg-[#e69203]/50"
                    }
                  `}
                />
              </button>
            ))}
          </div>

          {/* NAVIGATION BUTTONS */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={previousSlide}
              disabled={!canLoop && isBeginning}
              aria-label="Previous slide"
              className="
                flex h-11 w-11 items-center
                justify-center rounded-full
                border border-[#e69203]
                text-[#e69203]
                transition-all duration-300
                hover:bg-[#e69203]
                hover:text-[#102139]
                disabled:cursor-not-allowed
                disabled:border-gray-300
                disabled:bg-transparent
                disabled:text-gray-300
              "
            >
              <ArrowLeft size={21} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              disabled={!canLoop && isEnd}
              aria-label="Next slide"
              className="
                flex h-11 w-11 items-center
                justify-center rounded-full
                border border-[#e69203]
                text-[#e69203]
                transition-all duration-300
                hover:bg-[#e69203]
                hover:text-[#102139]
                disabled:cursor-not-allowed
                disabled:border-gray-300
                disabled:bg-transparent
                disabled:text-gray-300
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
