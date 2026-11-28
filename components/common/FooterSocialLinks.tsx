"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Social = { label: string; href?: string | null };

const socialIcons: Record<string, ReactNode> = {
  Facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 24V13h3.7l.6-4H14V6.5c0-1.2.3-2 2.1-2h2.3V.9A29 29 0 0 0 15 .7c-3.4 0-5.7 2.1-5.7 5.9V9H5.5v4h3.8v11z" />
    </svg>
  ),
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="4.5" cy="4.5" r="2.5" />
      <path d="M2.3 8.5h4.4V22H2.3zm7.2 0h4.2v1.8h.1a4.6 4.6 0 0 1 4.1-2.2c4.4 0 5.2 2.8 5.2 6.4V22h-4.4v-6.6c0-1.6 0-3.6-2.2-3.6s-2.6 1.7-2.6 3.5V22H9.5z" />
    </svg>
  ),
  YouTube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  ),
};

const socialStyle =
  "relative grid size-10 shrink-0 place-items-center rounded-full border border-white/40 bg-white/5 text-white";

// List: staggers the icons in once the footer scrolls into view.
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

// Each <li>: springy pop-in.
const item: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 18 },
  },
};

// Link: lifts and tilts on hover/focus. Children (ring, icon) inherit the "hover" label.
const link: Variants = {
  rest: { y: 0, rotate: 0, scale: 1 },
  hover: { y: -4, rotate: -8, scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 14 } },
};

// Gold ring pulsing outward while hovered.
const ring: Variants = {
  rest: { opacity: 0, scale: 1 },
  hover: {
    opacity: [0.8, 0],
    scale: [1, 1.7],
    transition: { duration: 0.9, repeat: Infinity, ease: "easeOut" },
  },
};

// Icon wiggle on hover.
const icon: Variants = {
  rest: { rotate: 0 },
  hover: { rotate: [0, 14, -10, 0], transition: { duration: 0.5 } },
};

export default function FooterSocialLinks({ socials }: { socials: Social[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.ul
      aria-label="Social media"
      className="flex flex-wrap items-center justify-center gap-3"
      variants={list}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {socials.map(({ label, href }) => {
        const glyph = socialIcons[label] ?? label.slice(0, 1);

        return (
          <motion.li key={label} variants={item}>
            {href ? (
              <motion.a
                href={href}
                aria-label={label}
                className={`${socialStyle} transition-colors hover:border-[#f1c466] hover:bg-[#f1c466] hover:text-[#102139] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1c466]`}
                variants={link}
                initial="rest"
                whileHover={reduce ? undefined : "hover"}
                whileFocus={reduce ? undefined : "hover"}
                whileTap={reduce ? undefined : { scale: 0.92 }}
              >
                <motion.span
                  aria-hidden="true"
                  variants={ring}
                  className="pointer-events-none absolute -inset-px rounded-full border-2 border-[#f1c466]"
                />
                <motion.span aria-hidden="true" variants={icon} className="grid place-items-center">
                  {glyph}
                </motion.span>
              </motion.a>
            ) : (
              <span role="img" aria-label={label} className={socialStyle}>
                <span aria-hidden="true">{glyph}</span>
              </span>
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
