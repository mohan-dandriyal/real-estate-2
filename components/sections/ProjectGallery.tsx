
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
