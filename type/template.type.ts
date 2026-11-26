

import data from "@/data/template.json"

const templateData = data.categories.PrimeEstate.sections

export const headerData = templateData.Header.variants.PrimeEstateHeader2;
export const footerData = data.common.Footer;
export type footerDataType = typeof footerData;

export const brand = data.common.brand;
export const heroData = templateData.Hero.variants.PrimeEstateHero2;
export const aboutData = templateData.AboutUs.variants.PrimeEstateAboutUs2;
export const amenitiesData = templateData.Amenities.variants.PrimeEstateAmenities2;
export const projectsData = templateData.Projects.variants.PrimeEstateProjects2;
export const galleryData = templateData.Gallery.variants.PrimeEstateGallery2;
export const testimonialData = templateData.Testimonials.variants.PrimeEstateTestimonials2;
export const contactData = templateData.Contact.variants.PrimeEstateContact2;
export const floorPlanData = templateData.FloorPlan.variants.PrimeEstateFloorPlan2;



export type headerDataType = typeof headerData;
export type brandDataType = typeof brand;
export type heroDataType = typeof heroData;
export type aboutDataType = typeof aboutData;
export type projectsDataType = typeof projectsData;
export type galleryDataType = typeof galleryData;
export type testimonialDataType = typeof testimonialData;
export type contactDataType = typeof contactData;
export type floorPlanDataType = typeof floorPlanData;
