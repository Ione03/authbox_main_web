import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Hero from "../components/Hero";
// import Features from "../components/Features";
// import Brands from "../components/Brands";
import { AboutSectionOne, AboutSectionTwo } from "../components/About";
// import Video from "../components/Video";
// import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";

export default component$(() => {
  return (
    <>
      <Hero />
      {/* <Features />
      <Brands /> */}
      <AboutSectionOne />
      <AboutSectionTwo />
      {/* <Video />
      <Testimonials /> */}
      <Pricing />
    </>
  );
});

export const head: DocumentHead = {
  title: "WebCraft - Jasa Pembuatan Website Profesional",
  meta: [
    {
      name: "description",
      content: "Jasa pembuatan website profesional dengan teknologi terkini, desain modern, dan harga terjangkau.",
    },
  ],
};
