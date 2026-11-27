import Image from "next/image";
import { cacheLife } from "next/cache";

import {
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

import {
  brand,
  footerData,
  headerData,
} from "@/type/template.type";

import FooterSocialLinks from "./FooterSocialLinks";
import FooterAnimation from "@/components/common/FooterAnimation";

const contactIcons: Record<string, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
};

export default async function Footer() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="border-t border-[#7a622f] bg-[#102139] py-5 text-[#faf7f1]">
      <div className="page-container">
        <div className="grid grid-cols-1 items-start gap-8 border-b border-[#faf7f1]/20 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-stretch lg:gap-0">

          {/* Brand */}
          <FooterAnimation
            direction="right"
            delay={0}
            className="lg:border-r lg:border-[#faf7f1]/20 lg:pr-8"
          >
          <a href={brand.href} className="shrink-0">
                    <Image
                        src={footerData.logo.image}
                        alt={`${brand.name} ${brand.tagline}`}
                        width={brand.logoWidth}
                        height={brand.logoHeight}
                        preload
                        className="h-auto w-40 lg:w-48 xl:w-[220px]"
                    />
                </a>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#e9dbca]">
              {footerData.description}
            </p>
          </FooterAnimation>

          {/* Navigation Links */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-6 lg:px-8 xl:px-16"
          >
            {footerData.linkGroups.map((group, index) => (
              <FooterAnimation
                key={group.label}
                direction="up"
                delay={0.15 + index * 0.12}
              >
                <h2 className="inline-block border-b-2 border-[#e9a313] pb-1 font-display text-xl font-bold">
                  {group.label}
                </h2>

                <ul className="mt-5 space-y-2 text-sm text-[#e9dbca]">
                  {headerData.nav
                    .filter(({ href }) =>
                      group.hrefs.includes(href)
                    )
                    .map(({ href, label }) => (
                      <li key={href}>
                        <a
                          href={href}
                          className="group inline-flex font-medium items-center gap-1.5 hover:text-[#f1c466] focus-visible:text-[#f1c466] motion-safe:transition-colors"
                        >
                          <ChevronRight
                            size={12}
                            aria-hidden="true"
                            className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                          />

                          {label}
                        </a>
                      </li>
                    ))}
                </ul>
              </FooterAnimation>
            ))}
          </nav>

          {/* Contact Information */}
          <FooterAnimation
            direction="left"
            delay={0.35}
            className="lg:border-l lg:border-[#faf7f1]/20 lg:pl-8"
          >
            <h2 className="inline-block border-b-2 border-[#e9a313] pb-1 font-display text-xl font-bold">
              {footerData.contact.title}
            </h2>

            <address className="mt-5 text-sm leading-relaxed text-[#e9dbca] not-italic">
              <ul className="space-y-2">
                {footerData.contact.details.map(
                  ({ id, icon, value, href }) => {
                    const Icon =
                      contactIcons[icon] ?? MapPin;

                    return (
                      <li
                        key={id}
                        className="group flex items-start gap-2"
                      >
                        <Icon
                          size={16}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-[#f1c466] motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110"
                        />

                        {href ? (
                          <a
                            href={href}
                            className="min-w-0 wrap-break-word hover:text-[#f1c466] focus-visible:text-[#f1c466] motion-safe:transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <span>{value}</span>
                        )}
                      </li>
                    );
                  }
                )}
              </ul>
            </address>
          </FooterAnimation>
        </div>

        {/* Bottom Bar */}
        <FooterAnimation
          direction="up"
          delay={0.45}
          className="flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between"
        >
          <p className="text-center text-sm md:text-[15px] text-[#d9c6b0] sm:text-left">
            &copy; {new Date().getFullYear()}{" "}
            {brand.name} {" "} {brand.tagline}.{" "}
            {footerData.rights}
          </p>

          <FooterSocialLinks
            socials={footerData.socials}
          />
        </FooterAnimation>
      </div>
    </footer>
  );
}
