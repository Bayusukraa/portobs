import './Projects.css';

const PROJECTS = [
  {
    num: '01',
    title: 'ML Klasifikasi Sampah',
    desc: 'Sistem machine learning untuk mengklasifikasikan jenis sampah secara otomatis menggunakan computer vision dan deep learning.',
    tags: ['Python', 'TensorFlow', 'OpenCV'],
    accent: '#FF6B35',
    year: '2024',
    image: '/ml sampah.jpg',
    demoUrl: 'https://huggingface.co/spaces/bayuskraa1/volumesampah',
    githubUrl: 'https://github.com/Bayusukraa',
  },
  {
    num: '02',
    title: 'Chatbot AI',
    desc: 'Aplikasi chatbot berbasis AI yang mampu menjawab pertanyaan dan berinteraksi secara natural menggunakan NLP.',
    tags: ['Python', 'NLP', 'React'],
    accent: '#FF6B35',
    year: '2024',
    image: '/chat bot.jpg',
    demoUrl: 'https://chatbot-coba.vercel.app/',
    githubUrl: 'https://github.com/Bayusukraa',
  },
  {
    num: '03',
    title: 'IoT Monitoring Sampah',
    desc: 'Sistem pemantauan tempat sampah berbasis IoT menggunakan sensor ultrasonik dan notifikasi real-time via dashboard web.',
    tags: ['Arduino', 'IoT', 'MQTT', 'React'],
    accent: '#FF6B35',
    year: '2023',
    image: '/iot sampah.jpg',
    demoUrl: 'https://dashboard-monitoringsampah-362p.vercel.app/',
    githubUrl: 'https://github.com/Bayusukraa',
  },
  {
    num: '04',
    title: 'Website Portfolio',
    desc: 'Portfolio personal yang dibangun dengan React, menampilkan proyek, skill, dan informasi kontak secara interaktif.',
    tags: ['React', 'CSS', 'JavaScript'],
    accent: '#FF6B35',
    year: '2024',
    image: '/porto.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com/Bayusukraa',
  },
];

const IconLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
  </svg>
);

const IconGithub = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-inner">

        <div className="pj-top">
          <div className="section-label">Portofolio</div>
          <h2 className="section-title">Proyek Terpilih</h2>
          <p className="section-sub">
            Beberapa proyek yang saya kerjakan selama belajar —
            mulai dari web, data, hingga IoT.
          </p>
        </div>

        <div className="pj-grid">
          {PROJECTS.map((p) => (
            <div key={p.title} className="pj-card" style={{ '--ac': p.accent }}>

              {/* IMAGE AREA */}
              <div className="pj-image-wrap">
                <img
                  src={p.image}
                  alt={p.title}
                  className="pj-image"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="pj-image-placeholder">
                  <div className="pj-placeholder-inner">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ color: p.accent, opacity: 0.4 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="m21 15-5-5L5 21"/>
                    </svg>
                    <span>Tambahkan gambar di<br /><code>{p.image}</code></span>
                  </div>
                </div>
                <div className="pj-image-overlay" />
                <div className="pj-year">{p.year}</div>
                <div className="pj-top-line" />
              </div>

              {/* BODY */}
              <div className="pj-body">
                <div className="pj-num">{p.num}</div>
                <h3 className="pj-title">{p.title}</h3>
                <p className="pj-desc">{p.desc}</p>

                <div className="pj-footer">
                  <div className="pj-tags">
                    {p.tags.map(t => (
                      <span key={t} className="pj-tag">{t}</span>
                    ))}
                  </div>
                  <div className="pj-links">
                    <a href={p.demoUrl} className="pj-link" target="_blank" rel="noopener noreferrer">
                      <IconLink /> Demo
                    </a>
                    <a href={p.githubUrl} className="pj-link" target="_blank" rel="noopener noreferrer">
                      <IconGithub /> GitHub
                    </a>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}