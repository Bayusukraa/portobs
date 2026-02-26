import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ active, navItems, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Tutup menu saat resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tutup menu saat scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (item) => {
    scrollTo(item);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={menuOpen ? 'nav-open' : ''}>
        <div className="nav-logo">Bayusukra<span>.Dev</span></div>

        {/* Desktop links */}
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={active === item ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNav(item); }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-links">
          {navItems.map((item, i) => (
            <li key={item} style={{ animationDelay: `${i * 0.07}s` }}>
              <a
                href={`#${item.toLowerCase()}`}
                className={active === item ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNav(item); }}
              >
                <span className="mobile-link-num">0{i + 1}</span>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}