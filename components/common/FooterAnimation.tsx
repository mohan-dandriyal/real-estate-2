"use client";

import { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

interface FooterAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FooterAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FooterAnimationProps) {
  const reduceMotion = useReducedMotion();

  const directions = {
    up: { x: 0, y: 35 },
    down: { x: 0, y: -35 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
  };

  const variants: Variants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      x: reduceMotion ? 0 : directions[direction].x,
      y: reduceMotion ? 0 : directions[direction].y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
    >
      {children}
    </motion.div>
  );
}