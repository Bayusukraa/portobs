import { useEffect, useRef, useState } from 'react';
import './Skills.css';

// Skill yang tampil di RADAR (maks 8 agar tidak penuh)
const SOFT_SKILLS = [
  { name: 'Komunikasi',      value: 88, desc: 'Mampu menyampaikan ide dan hasil kerja secara jelas kepada tim maupun non-teknis.' },
  { name: 'Kolaborasi',      value: 85, desc: 'Terbiasa bekerja dalam tim, terbuka terhadap masukan, dan aktif berkontribusi dalam diskusi.' },
  { name: 'Kreativitas', value: 88, desc: 'Suka mencari pendekatan baru dalam menyelesaikan tantangan baik di kode maupun desain.' },
  { name: 'Problem Solving',     value: 85, desc: 'Mampu menganalisis masalah secara sistematis dan menemukan solusi yang tepat dan efektif.' },
  { name: 'Manajemen Waktu',         value: 90, desc: 'Mampu mengatur prioritas dan menyelesaikan tugas tepat waktu' },
  { name: 'Belajar Mandiri', value: 90, desc: 'Terbiasa belajar dari dokumentasi dan eksperimen langsung tanpa harus selalu dibimbing.' },
  { name: 'Adaptif', value: 85, desc: 'Cepat menyesuaikan diri dengan tools baru, lingkungan kerja, maupun perubahan kebutuhan' },
  { name: 'Empati',          value: 88, desc: 'Memahami sudut pandang orang lain dan merespons kebutuhan tim dengan baik.' },
];

const HARD_SKILLS = [
  { name: 'HTML & CSS',       value: 96, desc: 'Membangun tampilan web yang responsif dan accessible menggunakan HTML5 dan CSS3 modern.' },
  { name: 'JavaScript',       value: 84, desc: 'Menulis logika interaktif menggunakan JavaScript modern (ES6+).' },
  { name: 'React JS',         value: 84, desc: 'Membangun komponen UI reusable menggunakan React dengan hooks dan state management.' },
  { name: 'Python',           value: 86, desc: 'Menggunakan Python untuk scripting, otomasi, dan implementasi model ML.' },
  { name: 'Machine Learning', value: 94, desc: 'Memahami konsep ML dan mengimplementasikan model sederhana menggunakan scikit-learn.' },
  { name: 'Data Analytics',   value: 80, desc: 'Mengolah dan memvisualisasikan data menggunakan Pandas, NumPy, dan Matplotlib.' },
  { name: 'IoT / Arduino',    value: 88, desc: 'Merancang sistem IoT sederhana menggunakan Arduino dan Raspberry Pi.' },
  { name: 'Git & GitHub',     value: 86, desc: 'Mengelola versi kode dan berkolaborasi lewat pull request di GitHub.' },
];

// Skill tambahan yang tampil sebagai list bar di bawah radar
const SOFT_EXTRA = [
  { name: 'Kepemimpinan',     value: 82, desc: 'Mampu memimpin diskusi kelompok kecil dan mengarahkan tim menuju tujuan yang jelas.' },
  { name: 'Berpikir Kritis',  value: 82, desc: 'Mengevaluasi informasi secara objektif sebelum mengambil keputusan.' },
  { name: 'Presentasi',       value: 86, desc: 'Mampu menyajikan hasil kerja atau ide secara terstruktur dan mudah dipahami.' },
  { name: 'Inisiatif',        value: 84, desc: 'Proaktif mencari solusi dan peluang tanpa menunggu instruksi.' },
  { name: 'Ketahanan Mental', value: 82, desc: 'Tetap fokus dan produktif di bawah tekanan atau saat menghadapi kegagalan.' },
];

const HARD_EXTRA = [
  { name: 'Node.js',          value: 82, desc: 'Membangun REST API dan server-side logic menggunakan Node.js dan Express.' },
  { name: 'Figma',            value: 80, desc: 'Membuat wireframe dan prototype desain UI sebelum tahap pengembangan.' },
  { name: 'SQL Server',       value: 84, desc: 'Mengelola database relasional dan menulis query SQL yang efisien.' },
  { name: 'TensorFlow',       value: 82, desc: 'Belajar membangun dan melatih model deep learning menggunakan TensorFlow.' },
  { name: 'Linux ',      value: 72, desc: 'Terbiasa menggunakan terminal Linux untuk navigasi, scripting, dan manajemen server.' },
  { name: 'REST API',         value: 80, desc: 'Merancang dan mengonsumsi REST API untuk komunikasi antar layanan.' },
  { name: 'Tailwind CSS',     value: 80, desc: 'Membangun UI cepat dengan utility-first approach menggunakan Tailwind CSS.' },
];

const LEVEL = (n) => n >= 85 ? 'Mahir' : n >= 70 ? 'Menengah' : 'Dasar';

// Gambar radar chart pakai pure canvas — tidak bergantung Chart.js responsive
function RadarCanvas({ skills, color, selected, onSelect, width, height }) {
  const canvasRef = useRef(null);
  const cx = width / 2;
  const cy = height / 2;
  const r  = Math.min(cx, cy) * 0.62;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const n = skills.length;

    ctx.clearRect(0, 0, width, height);

    // Helper: koordinat polar ke cartesian
    const pt = (i, radius) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    };

    // Grid rings (4 rings)
    for (let ring = 1; ring <= 4; ring++) {
      const rr = (r * ring) / 4;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const { x, y } = pt(i, rr);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Spoke lines
    for (let i = 0; i < n; i++) {
      const { x, y } = pt(i, r);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data polygon (fill)
    const hex = color;
    ctx.beginPath();
    skills.forEach((s, i) => {
      const { x, y } = pt(i, (r * s.value) / 100);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = hex.replace('1)', '0.12)');
    ctx.fill();

    // Data polygon (stroke)
    ctx.beginPath();
    skills.forEach((s, i) => {
      const { x, y } = pt(i, (r * s.value) / 100);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = hex;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Points
    skills.forEach((s, i) => {
      const { x, y } = pt(i, (r * s.value) / 100);
      const isActive = i === selected;

      ctx.beginPath();
      ctx.arc(x, y, isActive ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#ffffff' : hex;
      ctx.fill();

      if (isActive) {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = hex;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Labels — wrap teks panjang jadi 2 baris
    const fontSize = width < 400 ? 11 : 12;
    const lineH = fontSize + 3;

    const wrapLabel = (name) => {
      // Pecah jadi 2 baris jika ada spasi dan panjang > 10 karakter
      const words = name.split(' ');
      if (words.length <= 1 || name.length <= 10) return [name];
      const mid = Math.ceil(words.length / 2);
      return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
    };

    skills.forEach((s, i) => {
      const labelR = r + (width < 400 ? 30 : 38);
      const { x, y } = pt(i, labelR);
      const isActive = i === selected;
      const lines = wrapLabel(s.name);

      ctx.font = `${isActive ? '700' : '400'} ${fontSize}px 'Satoshi', sans-serif`;
      ctx.fillStyle = isActive ? '#ffffff' : 'rgba(255,255,255,0.55)';
      ctx.textAlign = x < cx - 5 ? 'right' : x > cx + 5 ? 'left' : 'center';

      // Offset vertikal supaya multi-baris centered
      const totalH = lines.length * lineH;
      let startY = y;
      if (y < cy - 5) {
        ctx.textBaseline = 'bottom';
        startY = y - (lines.length - 1) * lineH;
      } else if (y > cy + 5) {
        ctx.textBaseline = 'top';
        startY = y;
      } else {
        ctx.textBaseline = 'middle';
        startY = y - ((lines.length - 1) * lineH) / 2;
      }

      lines.forEach((line, li) => {
        ctx.fillText(line, x, startY + li * lineH);
      });
    });

  }, [skills, color, selected, width, height]);

  // Hit test saat klik
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const n = skills.length;

    // Scale mouse coords ke canvas coords
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const cmx = mx * scaleX;
    const cmy = my * scaleY;

    let hit = null;
    skills.forEach((s, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const px = cx + (r * s.value / 100) * Math.cos(angle);
      const py = cy + (r * s.value / 100) * Math.sin(angle);
      const dist = Math.sqrt((cmx - px) ** 2 + (cmy - py) ** 2);
      if (dist < 16) hit = i;
    });

    onSelect(prev => (hit !== null ? (prev === hit ? null : hit) : prev));
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      style={{ width: '100%', height: 'auto', cursor: 'pointer', display: 'block' }}
    />
  );
}

function useContainerWidth(ref) {
  const [w, setW] = useState(300);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) setW(Math.floor(entry.contentRect.width));
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return w;
}

function ExtraList({ extras, accentCss, tagBg, tagBorder, visible }) {
  return (
    <div className="sk-extra-list">
      <div className="sk-extra-label">Skill lainnya</div>
      {extras.map((s, i) => (
        <div key={s.name} className="sk-extra-item" style={{ animationDelay: `${i * 0.05}s` }}>
          <div className="sk-extra-row">
            <span className="sk-extra-name">{s.name}</span>
            <span className="sk-extra-pct" style={{ color: accentCss }}>{s.value}%</span>
          </div>
          <div className="sk-extra-track">
            <div
              className="sk-extra-fill"
              style={{
                width: visible ? `${s.value}%` : '0%',
                background: accentCss,
                transitionDelay: `${i * 0.06}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillPanel({ title, tag, skills, extras, isAccent2, visible }) {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const containerW = useContainerWidth(containerRef);
  const canvasSize = Math.min(containerW, 500);

  const color     = isAccent2 ? 'rgba(78,205,196,1)'  : 'rgba(255,107,53,1)';
  const accentCss = isAccent2 ? 'var(--accent2)'       : 'var(--accent)';
  const tagBg     = isAccent2 ? 'rgba(78,205,196,0.08)': 'rgba(255,107,53,0.08)';
  const tagBorder = isAccent2 ? 'rgba(78,205,196,0.3)' : 'rgba(255,107,53,0.3)';

  const skill = selected !== null ? skills[selected] : null;

  return (
    <div className="sk-panel">
      {/* Header */}
      <div className="sk-head">
        <div className="sk-head-left">
          <span className="sk-tag" style={{ color: accentCss, background: tagBg, borderColor: tagBorder }}>
            {tag}
          </span>
          <h3 className="sk-title">{title}</h3>
        </div>
        <span className="sk-hint">Klik titik untuk detail</span>
      </div>

      {/* Chart — full width container */}
      <div className="sk-chart-container" ref={containerRef}>
        {canvasSize > 0 && (
          <RadarCanvas
            skills={skills}
            color={color}
            selected={selected}
            onSelect={setSelected}
            width={canvasSize}
            height={canvasSize}
          />
        )}
      </div>

      {/* Detail */}
      <div className="sk-detail" style={{ '--ac': accentCss, '--ac-bg': tagBg, '--ac-bd': tagBorder }}>
        {skill ? (
          <div className="sk-detail-content" key={selected}>
            <div className="sk-detail-top">
              <span className="sk-detail-name">{skill.name}</span>
              <button className="sk-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="sk-detail-meta">
              <span className="sk-badge">{LEVEL(skill.value)}</span>
              <span className="sk-pct">{skill.value}%</span>
            </div>
            <div className="sk-bar"><div className="sk-bar-fill" style={{ width: `${skill.value}%` }} /></div>
            <p className="sk-desc">{skill.desc}</p>
          </div>
        ) : (
          <div className="sk-empty">
            <span className="sk-empty-arrow">↑</span>
            Pilih titik pada grafik untuk melihat detail
          </div>
        )}
      </div>

      {/* Extra skills list */}
      {extras && extras.length > 0 && (
        <ExtraList
          extras={extras}
          accentCss={accentCss}
          tagBg={tagBg}
          tagBorder={tagBorder}
          visible={visible}
        />
      )}
    </div>
  );
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref}>
      <div className="section-inner">
        <div className="section-label">Keahlian</div>
        <h2 className="section-title">Skill &amp; Kompetensi</h2>
        <p className="section-sub">
          Klik titik mana saja pada grafik untuk melihat detail skill.
        </p>

        <div className={`sk-grid ${visible ? 'sk-grid--in' : ''}`}>
          <SkillPanel title="Soft Skills" tag="01" skills={SOFT_SKILLS} extras={SOFT_EXTRA} isAccent2={true}  visible={visible} />
          <SkillPanel title="Hard Skills" tag="02" skills={HARD_SKILLS} extras={HARD_EXTRA} isAccent2={false} visible={visible} />
        </div>
      </div>
    </section>
  );
}