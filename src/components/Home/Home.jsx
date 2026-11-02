import Hero from "./Hero";
import Skills from "./Skills";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import Modal from "./Modal";


function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Modal />
      <About />
      <Contact />
    </main>
  );
}

export default Home;
