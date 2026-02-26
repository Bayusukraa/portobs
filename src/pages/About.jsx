import './About.css';

export default function About() {
  return (
    <section id="about">
      <div className="section-inner">

        <div className="about-header">
          <div className="section-label">Tentang Saya</div>
          <h2 className="section-title">
            Halo, saya <span className="about-name-accent">Bayu Sukra</span> 
          </h2>
        </div>

        <div className="about-grid">

          {/* LEFT */}
          <div className="about-left">

            <p className="about-bio">
              Saya adalah mahasiswa S1 Program Studi Sistem Komputer di ITB STIKOM Bali yang
              berfokus pada pengembangan antarmuka pengguna (Front End Development). Saya
              memiliki ketertarikan dalam membangun tampilan aplikasi dan website yang responsif,
              mudah digunakan, dan memiliki pengalaman pengguna yang baik.
            </p>

            <p className="about-bio">
              Saya percaya cara belajar terbaik adalah dengan langsung mengerjakan
              sesuatu. Itu sebabnya saya selalu berusaha mengubah apa yang saya
              pelajari menjadi proyek yang nyata dan bisa dilihat hasilnya.
            </p>

            <div className="about-divider" />

            <div className="about-info-list">
              {[
                { key: 'Lokasi',     val: 'Bali, Indonesia' },
                { key: 'Pendidikan', val: 'progres S1 Sistem Komputer' },
                { key: 'Minat',      val: 'Web · ML · Data · IoT' },
                { key: 'Bahasa',     val: 'Indonesia & Inggris (litle bit)' },
              ].map(({ key, val }) => (
                <div key={key} className="about-info-item">
                  <span className="info-key">{key}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
              <div className="about-info-item">
                <span className="info-key">Status</span>
                <span className="info-val info-available">
                  <span className="available-dot" />
                  Tersedia untuk proyek
                </span>
              </div>
            </div>

            <div className="about-divider" />

            <div className="cv-section">
              <p className="cv-label">Tertarik untuk berkolaborasi?</p>
              <a href="/cv.jpg" download="cv.jpg" className="cv-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Unduh CV
              </a>
            </div>

          </div>

          {/* RIGHT */}
          <div className="about-right">

            <div className="about-focus">
              <p className="focus-label">Bidang yang saya tekuni</p>
              <div className="focus-list">
                {[
                  { num: '01', title: 'Web Development',    desc: 'Membangun antarmuka dan sistem web menggunakan React, Node.js, dan teknologi modern lainnya.' },
                  { num: '02', title: 'Machine Learning',   desc: 'Mempelajari dan mengimplementasikan model ML dengan Python untuk memecahkan masalah nyata.' },
                  { num: '03', title: 'Data Analytics',     desc: 'Mengolah dan memvisualisasikan data untuk menghasilkan insight yang bermakna.' },
                  { num: '04', title: 'Internet of Things', desc: 'Menghubungkan perangkat keras dengan sistem digital untuk menciptakan solusi yang terintegrasi.' },
                ].map((item) => (
                  <div key={item.num} className="focus-item">
                    <div className="focus-header">
                      <span className="focus-num">{item.num}</span>
                      <span className="focus-title">{item.title}</span>
                    </div>
                    <p className="focus-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}