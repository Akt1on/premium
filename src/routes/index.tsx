import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { NoiseOverlay } from "@/components/site/NoiseOverlay";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { TrustReasons } from "@/components/site/TrustReasons";
import { Calculator } from "@/components/site/Calculator";
import { Reviews } from "@/components/site/Reviews";
import { FAQ } from "@/components/site/FAQ";
import { FloatingCTA } from "@/components/site/FloatingCTA";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { AsphaltCompare } from "@/components/site/AsphaltCompare";
import { MachineryShowcase } from "@/components/site/MachineryShowcase";
import { Materials } from "@/components/site/Materials";
import { Projects } from "@/components/site/Projects";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <NoiseOverlay />
      <Header />
      <main className="bg-asphalt text-foreground">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Calculator />
        <AsphaltCompare />
        <MachineryShowcase />
        <Materials />
        <Projects />
        <TrustReasons />
        <Process />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
      <FloatingCTA />
    </>
  );
}
