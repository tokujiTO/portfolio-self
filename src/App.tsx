import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Hero } from "./components/Sections/hero";
import { SunsetBand } from "./components/Sections/sunsetBand";
import { About } from "./components/Sections/about";
import { Journey } from "./components/Sections/journey";
import { Technologies } from "./components/Sections/technologies";
import { Projects } from "./components/Sections/projects";
import { Contact } from "./components/Sections/contact";

function App() {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <a id="top" />

      <div className="content-col">
        <Hero />
      </div>

      <SunsetBand />

      <div className="content-col">
        <About />
        <Journey />
        <Technologies />
        <Projects />
      </div>

      <Contact />
      <Footer />
    </div>
  );
}

export default App;
