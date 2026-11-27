import Image from "next/image";
import { cacheLife } from "next/cache";
import { ChevronRight, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

import { brand, footerData, headerData } from "@/type/template.type";
import FooterAnimation from "./FooterAnimation";
import FooterSocialLinks from "./FooterSocialLinks";

const contactIcons: Record<string, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
};

const headingClass = "font-display text-2xl font-semibold leading-tight text-primary";
const linkClass = "motion-safe:transition-colors hover:text-[#805008] hover:underline focus-visible:text-[#805008]";

export default async function Footer() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="border-t border-[#e8ded0] bg-[#faf7f1] text-primary">
      <div className="page-container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10 lg:py-14">
        <FooterAnimation direction="right" delay={0} className="sm:col-span-2 lg:col-span-1">
          <a href={brand.href} className="inline-block">
            <Image
              src={footerData.logo.image}
              alt={`${brand.name} ${brand.tagline}`}
              width={brand.logoWidth}
              height={brand.logoHeight}
              className="h-auto w-44 lg:w-52"
            />
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#50463d]">
            {footerData.description}
          </p>
        </FooterAnimation>

        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-5 border-y border-[#e8ded0] py-6 sm:border-y-0 sm:py-0 lg:border-x lg:px-8"
        >
          {footerData.linkGroups.map((group, index) => (
            <FooterAnimation key={group.label} direction="up" delay={0.15 + index * 0.12}>
              <h2 className={headingClass}>{group.label}</h2>
              <ul className="mt-3 space-y-2 text-sm text-[#50463d]">
                {headerData.nav
                  .filter(({ href }) => group.hrefs.includes(href))
                  .map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} className={`group inline-flex items-center gap-1.5 ${linkClass}`}>
                        <ChevronRight
                          size={13}
                          aria-hidden="true"
                          className="shrink-0 text-[#805008] motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                        />
                        {label}
                      </a>
                    </li>
                  ))}
              </ul>
            </FooterAnimation>
          ))}
        </nav>

        <FooterAnimation direction="left" delay={0.35}>
          <h2 className={headingClass}>{footerData.contact.title}</h2>
          <address className="mt-3 text-sm leading-relaxed text-[#50463d] not-italic">
            <ul className="space-y-3">
              {footerData.contact.details.map(({ id, icon, value, href }) => {
                const Icon = contactIcons[icon] ?? MapPin;

                return (
                  <li key={id} className="flex items-start gap-2.5">
                    <Icon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#805008]" />
                    {href ? (
                      <a href={href} className={`min-w-0 wrap-break-word ${linkClass}`}>
                        {value}
                      </a>
                    ) : (
                      <span>{value}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </address>
        </FooterAnimation>
      </div>

      <div className="border-t border-secondary/60 bg-[#232d33] text-[#faf7f1]">
        <div className="page-container flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between">
          <p className="text-center text-sm leading-relaxed text-[#e9dbca] sm:text-left">
            &copy; {new Date().getFullYear()} {brand.name} {brand.tagline}. {footerData.rights}
          </p>
          <FooterSocialLinks socials={footerData.socials} />
        </div>
      </div>
    </footer>
  );
}
