import useTypewriter from '../hooks/useTypewriter';
import './Home.css';

const TYPING_NAMES = ['Bayusukra'];

export default function Home({ scrollTo }) {
  const typedName = useTypewriter(TYPING_NAMES);

  return (
    <section id="home">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="home-grid section-inner">

        {/* LEFT */}
        <div>
          <div className="home-eyebrow animate-in">Portofolio</div>
          <h1 className="home-title animate-in delay-1">
            Halo, Saya<br />
            <span className="highlight typewriter-wrap">
              {typedName}<span className="typewriter-cursor" />
            </span>
          </h1>

          <div className="home-roles animate-in delay-2">
            <span>Web Developer</span>
            <span className="role-dot">·</span>
            <span>ML Engineer</span>
            <span className="role-dot">·</span>
            <span>Data Analyst</span>
            <span className="role-dot">·</span>
            <span>IoT</span>
          </div>

          <p className="home-desc animate-in delay-2">
            Saya Bayusukra — mahasiswa yang aktif mengeksplorasi dunia pengembangan web,
            machine learning, analisis data, dan Internet of Things. Saya belajar
            paling baik lewat proyek nyata, dan terus mencoba hal-hal baru setiap harinya.
          </p>

          <div className="btn-group animate-in delay-3">
            <button className="btn-primary" onClick={() => scrollTo('Projects')}>Lihat Proyek</button>
            <button className="btn-outline" onClick={() => scrollTo('Contact')}>Hubungi Saya</button>
          </div>
        </div>

        {/* RIGHT — Photo */}
        <div className="home-visual">
          <div className="photo-wrap">
            <div className="avatar-ring" />
            {/* Foto: letakkan file foto di public/foto.jpg */}
            <div className="photo-inner">
              <img
                src="/foto.jpeg"
                alt="Bayusukra"
                className="photo-img"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="photo-fallback">
                <div className="avatar-glow" />
              </div>
            </div>
            <div className="photo-badge">
              <span className="badge-dot" />
              Terbuka Kolaborasi
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}