import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Work from "@/components/site/Work";
import Pricing from "@/components/site/Pricing";
import Process from "@/components/site/Process";
import About from "@/components/site/About";
import Faq from "@/components/site/Faq";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import MobileCta from "@/components/site/MobileCta";
import { BandWaveTop, BandWaveBottom, CtaWaveTop } from "@/components/site/Waves";

export default function Home() {
  return (
    <>
      <Reveal />
      <Header />

      <main id="main">
        <Hero />
        <div className="wrap">
          <Work />
          <div className="band">
            <BandWaveTop />
            <Pricing />
            <BandWaveBottom />
          </div>
          <Process />
          <About />
          <Faq />
        </div>
      </main>

      {/* The CTA band is itself constrained to the 1280px column, as on the source. */}
      <div className="wrap">
        <div className="cta-band">
          <CtaWaveTop />
          <div className="blob blob-4" aria-hidden="true" />
          <Contact />
          <MobileCta />
          <Footer />
        </div>
      </div>
    </>
  );
}
