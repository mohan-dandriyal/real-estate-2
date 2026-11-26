import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type SectionTextProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

export function SectionTitle({
  as = "h2",
  id,
  children,
  className,
  variants,
}: SectionTextProps & { as?: "h1" | "h2"; id?: string }) {
  const props = {
    id,
    className: [as === "h1" ? "font-display" : "section-title", className]
      .filter(Boolean)
      .join(" "),
    children,
  };

  if (as === "h1") return <h1 {...props} />;
  if (variants) return <motion.h2 {...props} variants={variants} />;
  return <h2 {...props} />;
}

export function SectionDescription({ children, className, variants }: SectionTextProps) {
  const props = {
    className: className ? `font-sans ${className}` : "font-sans",
    children,
  };

  if (variants) return <motion.p {...props} variants={variants} />;
  return <p {...props} />;
}
