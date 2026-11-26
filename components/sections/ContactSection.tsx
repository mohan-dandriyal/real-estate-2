

"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  Phone,
  Mail,
  MapPin,
  UserRound,
  Building2,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

import { SectionTitle, SectionDescription } from "@/components/common/SectionHeading";
import { contactData } from "@/type/template.type";

const contact = contactData;

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// ICON MAPPING
// ========================================

const icons: Record<string, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  user: UserRound,
  building: Building2,
  message: MessageSquare,
};

// ========================================
// ANIMATION VARIANTS
// ========================================

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const initialFormData = Object.fromEntries(
  contact.form.fields.map((field) => [field.name, ""])
);

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  const [formData, setFormData] =
    useState<Record<string, string>>(initialFormData);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setStatus("idle");
  };

  // ========================================
  // HANDLE FORM SUBMISSION
  // ========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Enquiry submission failed");
      }

      setStatus("success");
      setFormData({ ...initialFormData });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full rounded-lg border border-[#102139]/15
    bg-[#fafafa] py-3.5 pl-11 pr-4
    text-sm font-medium text-[#102139]
    outline-none transition-all duration-300
    placeholder:text-[#64748b]
    focus:border-[#e69203]
    focus:ring-2 focus:ring-[#e69203]/10
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  return (
    <section
      id={contact.id}
      className="
        relative isolate overflow-hidden
        bg-[#f3f5fa]
        section-spacing
      "
    >
      {/* ========================================
          BACKGROUND CITY SKYLINE
      ======================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0 -z-10
          h-[240px] opacity-30
          md:h-[320px]
        "
      >
        <Image
          src={contact.background}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      {/* BACKGROUND GRADIENT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          -z-10 bg-gradient-to-b
          from-[#f3f5fa] via-transparent
          to-white/10
        "
      />

      <div
        className="
          page-container
        "
      >
        <div
          className="
            grid grid-cols-1 items-center
            gap-10
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-16
          "
        >
          {/* ========================================
              LEFT CONTACT INFORMATION
          ======================================== */}

          <motion.div
            variants={
              reduceMotion ? undefined : containerVariants
            }
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              relative lg:pr-12
              lg:border-r lg:border-[#e69203]/70
            "
          >
            {/* SUBTITLE */}

            <motion.div
              variants={
                reduceMotion ? undefined : contentVariants
              }
              className="
                mb-4 flex items-center gap-3
                text-xs font-bold uppercase
                tracking-[0.25em] text-[#102139]
              "
            >
              <span className="h-[2px] w-10 bg-[#e69203]" />

              {contact.subtitle}
            </motion.div>

            {/* TITLE */}

            <SectionTitle
              variants={
                reduceMotion ? undefined : contentVariants
              }
              className="text-[#102139]"
            >
              <span className="block">
                {contact.title}
              </span>

              <span className="block">
                {contact.highlight}
              </span>
            </SectionTitle>

            {/* DESCRIPTION */}

            <SectionDescription
              variants={
                reduceMotion ? undefined : contentVariants
              }
              className="
                mt-5 max-w-[450px]
                text-base leading-relaxed text-[#475569]
              "
            >
              {contact.description}
            </SectionDescription>

            {/* ========================================
                CONTACT DETAILS
            ======================================== */}

            <div className="mt-7 space-y-3">
              {contact.details.map((item) => {
                const Icon = icons[item.icon] ?? MapPin;

                const className = `
                  group flex items-center gap-4
                  rounded-lg border border-[#102139]/10
                  bg-white/70 px-4 py-3.5
                  transition-all duration-300
                  hover:border-[#e69203]/60
                  hover:bg-white
                  hover:shadow-sm
                `;

                const content = (
                  <>
                    <Icon
                      size={23}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="
                        shrink-0 text-[#e69203]
                        transition-transform duration-300
                        group-hover:scale-110
                        motion-reduce:transform-none
                      "
                    />

                    <span
                      className="
                        break-words text-sm
                        font-semibold text-[#102139]
                        md:text-[15px]
                      "
                    >
                      {item.value}
                    </span>
                  </>
                );

                return (
                  <motion.div
                    key={item.id}
                    variants={
                      reduceMotion
                        ? undefined
                        : contentVariants
                    }
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className={className}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={className}>
                        {content}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ========================================
              RIGHT ENQUIRY FORM
          ======================================== */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 40,
                    y: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
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
            className="
              relative rounded-2xl
              border border-white
              bg-white p-5
              shadow-[0_12px_40px_rgba(16,33,57,0.10)]
              sm:p-7 lg:p-8
            "
          >
            {/* FORM TITLE */}

            <h3
              className="
                mb-6 font-display
                text-2xl font-bold
                text-[#102139] md:text-3xl
              "
            >
              {contact.form.title}
            </h3>

            <form onSubmit={handleSubmit}>
              <div
                className="
                  grid grid-cols-1 gap-4
                  sm:grid-cols-2
                "
              >
                {contact.form.fields.map((field) => {
                  const Icon =
                    icons[field.icon] ?? UserRound;

                  const fieldId =
                    `${contact.id}-${field.name}`;

                  const placeholder =
                    field.placeholder +
                    (field.required ? " *" : "");

                  return (
                    <div
                      key={field.name}
                      className={`
                        relative
                        ${
                          field.type === "textarea"
                            ? "sm:col-span-2"
                            : ""
                        }
                      `}
                    >
                      {/* ACCESSIBLE LABEL */}

                      <label
                        htmlFor={fieldId}
                        className="sr-only"
                      >
                        {placeholder}
                      </label>

                      {/* INPUT ICON */}

                      <Icon
                        size={19}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute left-3.5 top-4
                          z-10 text-[#e69203]
                        "
                      />

                      {/* SELECT FIELD */}

                      {field.type === "select" ? (
                        <>
                          <select
                            id={fieldId}
                            name={field.name}
                            required={field.required}
                            disabled={loading}
                            value={
                              formData[field.name] ?? ""
                            }
                            onChange={(event) =>
                              handleChange(
                                field.name,
                                event.target.value
                              )
                            }
                            className={`
                              ${inputClass}
                              cursor-pointer
                              appearance-none pr-10
                            `}
                          >
                            <option value="" disabled>
                              {placeholder}
                            </option>

                            {field.options?.map((option) => (
                              <option
                                key={option}
                                value={option}
                              >
                                {option}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={17}
                            aria-hidden="true"
                            className="
                              pointer-events-none
                              absolute right-3.5 top-4
                              text-[#102139]
                            "
                          />
                        </>
                      ) : field.type === "textarea" ? (
                        /* TEXTAREA */

                        <textarea
                          id={fieldId}
                          name={field.name}
                          rows={4}
                          required={field.required}
                          disabled={loading}
                          placeholder={placeholder}
                          value={
                            formData[field.name] ?? ""
                          }
                          onChange={(event) =>
                            handleChange(
                              field.name,
                              event.target.value
                            )
                          }
                          className={`
                            ${inputClass}
                            min-h-[120px] resize-y
                          `}
                        />
                      ) : (
                        /* TEXT INPUT */

                        <input
                          id={fieldId}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          disabled={loading}
                          placeholder={placeholder}
                          autoComplete={
                            field.type === "tel"
                              ? "tel"
                              : field.type === "email"
                              ? "email"
                              : field.name === "name"
                              ? "name"
                              : undefined
                          }
                          value={
                            formData[field.name] ?? ""
                          }
                          onChange={(event) =>
                            handleChange(
                              field.name,
                              event.target.value
                            )
                          }
                          className={inputClass}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ========================================
                  SUBMIT BUTTON
              ======================================== */}

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={
                  reduceMotion || loading
                    ? undefined
                    : { scale: 0.98 }
                }
                className="
                  group relative isolate mt-5
                  flex w-full items-center
                  justify-center gap-4
                  overflow-hidden rounded-lg
                  bg-gradient-to-r
                  from-[#e69203] to-[#b87500]
                  px-6 py-4
                  text-sm font-bold text-white
                  transition-all duration-500
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {/* HOVER BACKGROUND */}

                <span
                  aria-hidden="true"
                  className="
                    absolute inset-0 -z-10
                    origin-left scale-x-0
                    bg-[#102139]
                    transition-transform duration-500
                    group-hover:scale-x-100
                    motion-reduce:transition-none
                  "
                />

                {loading ? (
                  <>
                    <LoaderCircle
                      size={19}
                      className="animate-spin"
                    />

                    {contact.form.loadingText}
                  </>
                ) : (
                  <>
                    {contact.form.button}

                    <ArrowRight
                      size={20}
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-1
                        motion-reduce:transform-none
                      "
                    />
                  </>
                )}
              </motion.button>

              {/* ========================================
                  FORM STATUS MESSAGE
              ======================================== */}

              <div aria-live="polite">
                <AnimatePresence>
                  {status !== "idle" && (
                    <motion.div
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, y: 10 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`
                        mt-4 flex items-center
                        gap-2 rounded-lg p-3 text-sm
                        ${
                          status === "success"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }
                      `}
                    >
                      {status === "success" ? (
                        <>
                          <CheckCircle2
                            size={19}
                            className="shrink-0"
                          />

                          {contact.form.successMessage}
                        </>
                      ) : (
                        <>
                          <AlertCircle
                            size={19}
                            className="shrink-0"
                          />

                          {contact.form.errorMessage}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
