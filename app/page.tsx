import { Suspense } from "react";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import AboutSection from "@/components/sections/AboutSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import ContactSection from "@/components/sections/ContactSection";
import FloorPlanSection from "@/components/sections/FloorPlanSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectGallery from "@/components/sections/ProjectGallery";
import ProjectsSection from "@/components/sections/ProjectSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import { brand, headerData } from "@/type/template.type";

export default function Home() {
  return (
    <>
      <Header brand={brand} headerData={headerData} />
      <main>
        <HeroSection />
        <AboutSection />
        <AmenitiesSection />
        <ProjectsSection />
        <Suspense>
          <ProjectGallery />
        </Suspense>
        <Suspense>
          <TestimonialSection />
        </Suspense>
        <FloorPlanSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
