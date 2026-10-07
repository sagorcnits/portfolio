import { Sidebar } from "@/components/portfolio/sidebar";
import {
  About,
  Contact,
  Experience,
  Philosophy,
  Services,
  TechStack,
  Work,
} from "@/components/portfolio/sections";
import { Splash } from "@/components/portfolio/splash";
import { WhatsAppButton } from "@/components/portfolio/whatsapp-button";

export default function Home() {
  return (
    <>
      <Splash />
      <div
        id="top"
        className="splash-reveal mx-auto w-full max-w-7xl px-6 md:flex md:gap-12 md:px-10 lg:gap-20 lg:px-16"
      >
        <Sidebar />
        <main className="min-w-0 flex-1 md:py-4">
          <About />
          <Work />
          <Experience />
          <Services />
          <TechStack />
          <Philosophy />
          <Contact />
        </main>
        <WhatsAppButton />
      </div>
    </>
  );
}
