import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Services from "../components/Services/Services";
import Footer from "./Footer";

function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Services />
    </main>
  );
}

export default Home;
