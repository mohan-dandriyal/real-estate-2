"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Camera, SquarePlay } from "lucide-react";

type Social = { label: string; href?: string | null };

const socialIcons: Record<string, ReactNode> = {
  Facebook: <span className="text-base font-extrabold">f</span>,
  Instagram: <Camera size={16} />,
  LinkedIn: <span className="text-[11px] font-extrabold">in</span>,
  YouTube: <SquarePlay size={14} />,
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
