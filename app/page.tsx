import Contact from "@/components/site/Contact";
import { About, Experience, Stack, Work } from "@/components/site/Sections";
import PointerEffects from "@/components/site/PointerEffects";
import ScrollEffects from "@/components/site/ScrollEffects";
import Sidebar from "@/components/site/Sidebar";
import { findAvatar } from "@/lib/avatar";

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <PointerEffects />
      <div className="relative z-[1] mx-auto min-h-screen max-w-screen-xl px-6 py-12 sm:px-12 sm:py-20 lg:px-20 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-8">
          <Sidebar avatar={findAvatar()} />
          <main id="content" className="pt-20 lg:w-[54%] lg:py-24">
            <About />
            <Experience />
            <Work />
            <Stack />
            <Contact />
            <footer data-reveal className="max-w-md pb-16 text-sm leading-6 text-faint sm:pb-0">
              Built with Next.js, Tailwind CSS and TypeScript, in Addis Ababa. The USSD demo runs entirely in your
              browser with sample data.
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
