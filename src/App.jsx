import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './styles/global.css';
import ScrollToTop from './components/ScrollToTop';

const NAV_ITEMS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

export default function App() {
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(n => document.getElementById(n.toLowerCase()));
      const scrollY = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollY >= sections[i].offsetTop) {
          setActive(NAV_ITEMS[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar active={active} navItems={NAV_ITEMS} scrollTo={scrollTo} />
      <Home scrollTo={scrollTo} />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
