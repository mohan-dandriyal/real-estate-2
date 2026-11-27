"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";

import type { brandDataType, headerDataType } from "@/type/template.type";

type HeaderProps = {
    brand: brandDataType;
    headerData: headerDataType;
};

const enquiryClass =
    "brand-button inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded border border-[#805008] bg-[#805008] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#664006]";

export default function Header({ brand, headerData }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeHref, setActiveHref] = useState(brand.href);
    const menuButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const sectionLinks = headerData.nav.filter(({ href }) => href.startsWith("#") && href.length > 1);
        let frame: number | null = null;

        const updateActiveSection = () => {
            frame = null;

            // Use the same offset as native anchor navigation below the sticky header.
            const root = document.documentElement;
            const scrollPadding = Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
            const activationLine = scrollPadding + 1;
            const atPageBottom =
                window.scrollY > 0 && window.scrollY + window.innerHeight >= root.scrollHeight - 1;
            let nextHref = brand.href;
            let nearestTop = -Infinity;

            for (const { href } of sectionLinks) {
                const section = document.getElementById(href.slice(1));
                if (!section) continue;

                const top = section.getBoundingClientRect().top;
                if (top > nearestTop && (top <= activationLine || (atPageBottom && top < window.innerHeight))) {
                    nextHref = href;
                    nearestTop = top;
                }
            }

            setActiveHref(nextHref);
        };

        const scheduleUpdate = () => {
            if (frame === null) frame = window.requestAnimationFrame(updateActiveSection);
        };

        // Section positions can shift after the gallery or images finish loading.
        const resizeObserver = new ResizeObserver(scheduleUpdate);
        resizeObserver.observe(document.body);
        scheduleUpdate();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        window.addEventListener("hashchange", scheduleUpdate);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            window.removeEventListener("hashchange", scheduleUpdate);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, [brand.href, headerData.nav]);

    useEffect(() => {
        if (!menuOpen) return;

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && menuButton.current?.getClientRects().length) {
                setMenuOpen(false);
                menuButton.current.focus();
            }
        };

        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [menuOpen]);

    const navigation = headerData.nav.map(({ href, label }) => {
        const active = href === activeHref;

        return (
            <a
                key={href}
                href={href}
                aria-current={active ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`border-b-2 py-2 text-sm font-semibold transition-colors hover:border-secondary hover:text-[#805008] ${
                    active ? "border-secondary" : "border-transparent"
                }`}
            >
                {label}
            </a>
        );
    });

    const contactActions = (
        <a href={headerData.cta.href} className={enquiryClass} onClick={() => setMenuOpen(false)}>
            {headerData.cta.label}
            <ArrowRight size={16} aria-hidden="true" />
        </a>
    );

    return (
        <header
            data-mobile-menu-open={menuOpen ? "" : undefined}
            className="sticky top-0 z-50 border-b border-[#e8ded0] bg-[#faf7f1] text-primary"
        >
            <div className="page-container flex min-h-[68px] items-center justify-between gap-4">
                <a href={brand.href} className="shrink-0" onClick={() => setMenuOpen(false)}>
                    <Image
                        src={brand.logo}
                        alt={`${brand.name} ${brand.tagline}`}
                        width={brand.logoWidth}
                        height={brand.logoHeight}
                        preload
                        className="h-auto w-40 lg:w-48 xl:w-[220px]"
                    />
                </a>
                <nav aria-label="Main navigation" className="hidden items-center gap-4 lg:flex xl:gap-8">
                    {navigation}
                </nav>
                <div className="hidden shrink-0 items-center gap-3 lg:flex xl:gap-4">
                    {contactActions}
                </div>
                <button
                    ref={menuButton}
                    type="button"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="grid size-11 place-items-center rounded border border-[#d8c7a8] hover:bg-[#f2e8da] lg:hidden"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                inert={!menuOpen}
                className={`page-container absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-y border-[#e8ded0] bg-[#faf7f1] py-4 shadow-lg motion-safe:transition-[opacity,translate,visibility] motion-safe:duration-200 motion-safe:ease-out lg:hidden ${
                    menuOpen
                        ? "visible opacity-100 motion-safe:translate-y-0"
                        : "invisible pointer-events-none opacity-0 motion-safe:-translate-y-2"
                }`}
            >
                <div className="flex flex-col items-start gap-1">{navigation}</div>
                <div className="mt-4 flex flex-wrap gap-3">{contactActions}</div>
            </nav>
        </header>
    );
}
