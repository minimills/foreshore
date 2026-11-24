import Header, { Nav } from "./Header";
import Footer from "./Footer";

/* Frame for the inner pages (work, packages, privacy, terms): menu on top, footer below. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="wrap">
        <Nav ghost />
        <div id="top">{children}</div>
      </main>
      <div className="wrap">
        <div className="cta-band page-foot">
          <Footer />
        </div>
      </div>
    </>
  );
}
