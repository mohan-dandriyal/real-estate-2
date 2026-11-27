
"use client";

import Image from "next/image";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Quote, Star } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
  Keyboard,
  A11y,
} from "swiper/modules";

import { SectionTitle } from "@/components/common/SectionHeading";
import { testimonialData } from "@/type/template.type";

import "swiper/css";
import "swiper/css/pagination";

const testimonial = testimonialData;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TestimonialSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={testimonial.id}
      aria-labelledby="testimonials-title"
      className="
        relative overflow-hidden
        border-t border-[#e8ded0] bg-[#f7f1e8] text-[#102139]
        section-spacing
      "
    >
      <div
        className="
          page-container
        "
      >
        <div
          className="
            grid grid-cols-1
            items-center gap-8
            lg:grid-cols-[0.8fr_2.2fr]
            lg:gap-12
          "
        >
          {/* ========================================
              LEFT HEADING SECTION
          ======================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: -40 }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: EASE,
            }}
            className="
              text-left
            "
          >
            {/* SUBTITLE */}

            <div
              className="
                mb-4 flex items-center
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px w-8
                  bg-[#805008]
                "
              />

              <span
                className="
                  text-xs font-bold uppercase
                  tracking-[0.19em]
                  text-[#805008]
                "
              >
                {testimonial.subtitle}
              </span>
            </div>

            {/* TITLE */}

            <SectionTitle
              id="testimonials-title"
              className="text-[#102139]"
            >
              <span className="block">
                {testimonial.title}
              </span>

              <span className="block text-[#805008]">
                {testimonial.highlight}
              </span>
            </SectionTitle>
          </motion.div>

          {/* ========================================
              RIGHT TESTIMONIAL SLIDER
          ======================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 35 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1,
              delay: reduceMotion ? 0 : 0.15,
              ease: EASE,
            }}
            className="relative min-w-0"
          >
            <Swiper
              modules={[
                Autoplay,
                Pagination,
                Keyboard,
                A11y,
              ]}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={20}
              speed={
                reduceMotion
                  ? 0
                  : testimonial.settings.speed
              }
              loop={testimonial.items.length >= 4}
              grabCursor
              keyboard={{
                enabled: true,
                onlyInViewport: true,
              }}
              autoplay={
                testimonial.settings.autoplay &&
                !reduceMotion
                  ? {
                      delay: testimonial.settings.delay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 24,
                },
              }}
              className="testimonial-swiper"
            >
              {testimonial.items.map((item) => (
                <SwiperSlide key={item.id}>
                  <article
                    className="
                      group relative flex h-full
                      flex-col justify-between
                      rounded
                      border border-[#e8ded0]
                      bg-[#fffdfa] p-5
                      md:p-6
                    "
                  >
                    {/* ========================================
                        REVIEW CONTENT
                    ======================================== */}

                    <div
                      className="
                        grid gap-3
                      "
                    >
                      {/* QUOTE ICON */}

                      <Quote
                        size={32}
                        strokeWidth={1}
                        fill="currentColor"
                        aria-hidden="true"
                        className="
                          shrink-0 rotate-180
                          text-[#805008]
                        "
                      />

                      {/* DESCRIPTION */}

                      <p
                        className="
                          font-display text-xl font-semibold
                          leading-snug
                          text-[#102139]
                          md:text-xl
                        "
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* ========================================
                        CLIENT DETAILS
                    ======================================== */}

                    <div
                      className="
                        mt-6 flex flex-wrap border-t border-[#e8ded0] pt-4
                        items-center justify-between
                        gap-3
                      "
                    >
                      {/* PROFILE */}

                      <div
                        className="
                          flex min-w-0
                          items-center gap-3
                        "
                      >
                        {/* PROFILE IMAGE */}

                        <div
                          className="
                            relative h-12 w-12
                            shrink-0 overflow-hidden
                            rounded-full bg-gray-100
                            md:h-14 md:w-14
                          "
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="
                              object-cover object-center
                              transition-transform
                              duration-700
                              group-hover:scale-110
                              motion-reduce:transform-none
                            "
                          />
                        </div>

                        {/* NAME AND DESIGNATION */}

                        <div className="min-w-0">
                          <h3
                            className="
                              text-sm font-bold
                              leading-tight
                              text-[#102139]
                              md:text-base
                            "
                          >
                            {item.name}
                          </h3>

                          <p
                            className="
                              mt-1 text-xs
                              text-[#50463d]
                            "
                          >
                            {item.designation}
                          </p>
                        </div>
                      </div>

                      {/* ========================================
                          STAR RATING
                      ======================================== */}

                      <div
                        aria-label={`${item.rating} out of 5 stars`}
                        className="
                          flex shrink-0
                          items-center gap-1
                        "
                      >
                        {Array.from(
                          { length: 5 },
                          (_, index) => (
                            <Star
                              key={index}
                              size={15}
                              strokeWidth={1.5}
                              aria-hidden="true"
                              className={
                                index < item.rating
                                  ? "fill-[#805008] text-[#805008]"
                                  : "fill-gray-200 text-gray-200"
                              }
                            />
                          )
                        )}
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
