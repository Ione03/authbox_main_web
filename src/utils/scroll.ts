import { $ } from "@builder.io/qwik";

/**
 * Scroll to a specific section by ID with smooth animation
 * @param sectionId - The ID of the element to scroll to
 */
export const scrollToSection = (sectionId: string) => {
    return $(() => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
};

/**
 * Pre-defined scroll handlers for common sections
 */
export const scrollToHome = scrollToSection("home");
export const scrollToFeatures = scrollToSection("features");
export const scrollToAbout = scrollToSection("about");
export const scrollToPricing = scrollToSection("pricing");
export const scrollToContact = scrollToSection("contact");
