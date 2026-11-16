import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Hero from "@/components/home/Hero";
import Nav from "@/components/site/Nav";
import { About, Experience, PlaygroundSection, Stack, Work } from "@/components/site/Sections";
import PointerEffects from "@/components/site/PointerEffects";
import ScrollEffects from "@/components/site/ScrollEffects";
import { findAvatar } from "@/lib/avatar";

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <PointerEffects />
      <Nav home />
      <div className="relative z-[1] mx-auto max-w-page px-6 sm:px-10">
        <Hero avatar={findAvatar()} />
        <main id="content">
          <About />
          <Experience />
          <Work />
          <PlaygroundSection />
          <Stack />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
