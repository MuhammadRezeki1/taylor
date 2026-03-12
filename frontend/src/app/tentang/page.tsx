'use client';
import { useState, useRef } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WAFloat from '@/src/components/WAFloat';
import Link from 'next/link';
import { ArrowRight, Scissors, Heart, Award, Users } from 'lucide-react';

const NILAI = [
  { icon: <Scissors size={22} />, title: 'Ketelitian', desc: 'Setiap jahitan diukur dan dikerjakan dengan presisi tinggi.' },
  { icon: <Heart size={22} />, title: 'Ketulusan', desc: 'Kami mengerjakan setiap pesanan dengan sepenuh hati.' },
  { icon: <Award size={22} />, title: 'Kualitas', desc: 'Standar kualitas tinggi tidak pernah kami kompromikan.' },
  { icon: <Users size={22} />, title: 'Kepercayaan', desc: 'Kepercayaan pelanggan adalah aset terbesar kami.' },
];

const STATS = [
  { val: '15+', label: 'Tahun Pengalaman' },
  { val: '500+', label: 'Pelanggan Puas' },
  { val: '1000+', label: 'Jahitan Selesai' },
  { val: '100%', label: 'Garansi Kepuasan' },
];

/* ─── Tilt Card (sama seperti ServiceCard di layanan) ─────────── */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(232,165,152,0.18) 0%, transparent 65%)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    glow.style.background = 'transparent';
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative', borderRadius: 20,
        background: 'rgba(255,255,255,0.055)',
        border: `1px solid ${hovered ? 'rgba(232,165,152,0.30)' : 'rgba(255,255,255,0.10)'}`,
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        transition: 'transform 0.12s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        boxShadow: hovered
          ? '0 20px 60px rgba(232,165,152,0.18), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)'
          : '0 4px 24px rgba(0,0,0,0.25)',
        overflow: 'hidden', willChange: 'transform',
        ...style,
      }}
    >
      {/* Glow layer */}
      <div ref={glowRef} style={{ position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none', transition: 'background 0.1s ease', zIndex: 0 }} />
      {/* Shimmer */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 20,
        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
        backgroundSize: '200% 100%',
        backgroundPositionX: hovered ? '0%' : '200%',
        transition: 'background-position-x 0.6s ease',
        pointerEvents: 'none', zIndex: 1,
      }} />
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
        background: hovered ? 'linear-gradient(90deg, transparent, rgba(232,165,152,0.8), transparent)' : 'transparent',
        transition: 'background 0.4s ease', borderRadius: '0 0 4px 4px', zIndex: 2,
      }} />
      <div style={{ position: 'relative', zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Nilai Card ─────────────────────────────────────────────────── */
function NilaiCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <TiltCard>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ padding: 32, textAlign: 'center' }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: hovered ? 'rgba(232,165,152,0.2)' : 'rgba(232,165,152,0.10)',
          border: `1px solid ${hovered ? 'rgba(232,165,152,0.4)' : 'rgba(232,165,152,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', color: '#e8a598',
          transition: 'all 0.35s ease',
          transform: hovered ? 'scale(1.12) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          boxShadow: hovered ? '0 8px 24px rgba(232,165,152,0.25)' : 'none',
        }}>
          {icon}
        </div>
        <h3 style={{
          fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display',serif",
          marginBottom: 10,
          color: hovered ? '#e8a598' : '#fff',
          transition: 'color 0.3s ease',
        }}>
          {title}
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(245,237,232,0.45)', lineHeight: 1.75 }}>{desc}</p>
      </div>
    </TiltCard>
  );
}

/* ─── Stat Card ──────────────────────────────────────────────────── */
function StatCard({ val, label }: { val: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textAlign: 'center', padding: '16px 8px', transition: 'transform 0.3s ease', transform: hovered ? 'translateY(-4px)' : 'translateY(0)' }}
    >
      <div style={{
        fontSize: 44, fontWeight: 900, fontFamily: "'Playfair Display',serif",
        color: hovered ? '#fff' : '#e8a598',
        transition: 'all 0.3s ease',
        textShadow: hovered ? '0 0 30px rgba(232,165,152,0.6)' : 'none',
      }}>
        {val}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(245,237,232,0.45)', marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function TentangPage() {
  const [hoveredBtn, setHoveredBtn] = useState(false);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Navbar />
      <div style={{ paddingTop: 68 }}>

        {/* ── Header ── */}
        <div style={{
          padding: '80px 24px 72px', textAlign: 'center',
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,165,152,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,165,152,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-chip" style={{ justifyContent: 'center' }}>❤️ Cerita Kami</div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>
              Tentang Jahit Buk Nining
            </h1>
            <p style={{ color: 'rgba(245,237,232,0.5)', fontSize: 16, marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
              Lebih dari sekadar jahitan — ini adalah cerita cinta dan dedikasi.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>

          {/* ── Story Section ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginBottom: 96 }} className="grid-2">

            {/* Visual card */}
            <TiltCard style={{ padding: 4 }}>
              <div style={{ padding: 4 }}>
                <div style={{
                  borderRadius: 16, overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(232,165,152,0.15), rgba(196,112,95,0.08))',
                  border: '1px solid rgba(232,165,152,0.15)',
                  paddingBottom: '100%', position: 'relative',
                }}>
                  {/* Grid pattern */}
                  <div style={{
                    position: 'absolute', inset: 0, opacity: 0.05,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }} />
                  {/* Orb */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,165,152,0.2) 0%, transparent 70%)' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 90,
                    filter: 'drop-shadow(0 0 40px rgba(232,165,152,0.4))',
                    animation: 'float 4s ease-in-out infinite',
                  }}>✂️</div>
                </div>
              </div>
            </TiltCard>

            {/* Text */}
            <div>
              <div className="section-chip">📖 Cerita Kami</div>
              <h2 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800,
                color: '#fff', margin: '16px 0 20px', lineHeight: 1.3,
              }}>
                15+ Tahun Melayani dengan Cinta
              </h2>
              <p style={{ color: 'rgba(245,237,232,0.6)', fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
                Jahit Buk Nining dimulai dari sebuah mesin jahit sederhana dan mimpi besar untuk membantu semua orang tampil percaya diri dengan pakaian yang pas dan indah.
              </p>
              <p style={{ color: 'rgba(245,237,232,0.6)', fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
                Selama lebih dari 15 tahun, kami telah melayani ratusan pelanggan setia dari remaja yang ingin kebaya wisuda, ibu yang butuh seragam keluarga, hingga perusahaan yang memesan seragam karyawan.
              </p>
              <p style={{ color: 'rgba(245,237,232,0.6)', fontSize: 15, lineHeight: 1.9, marginBottom: 36 }}>
                Setiap jahitan adalah karya seni. Setiap pelanggan adalah keluarga. Itulah filosofi Buk Nining.
              </p>
              <Link href="/pesan"
                onMouseEnter={() => setHoveredBtn(true)}
                onMouseLeave={() => setHoveredBtn(false)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 50, textDecoration: 'none',
                  background: hoveredBtn
                    ? 'linear-gradient(135deg, #d4826e, #c05a45)'
                    : 'linear-gradient(135deg, #e8a598, #c4705f)',
                  color: '#fff', fontSize: 14, fontWeight: 700,
                  transition: 'all 0.3s ease',
                  transform: hoveredBtn ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: hoveredBtn
                    ? '0 8px 28px rgba(232,165,152,0.45)'
                    : '0 4px 14px rgba(232,165,152,0.25)',
                }}
              >
                Mulai Pesan
                <ArrowRight size={16} style={{ transition: 'transform 0.3s ease', transform: hoveredBtn ? 'translateX(3px)' : 'translateX(0)' }} />
              </Link>
            </div>
          </div>

          {/* ── Nilai Section ── */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-chip" style={{ justifyContent: 'center' }}>💎 Nilai Kami</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, color: '#fff', marginTop: 16 }}>
              Yang Kami Percaya
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 24, marginBottom: 80 }}>
            {NILAI.map(({ icon, title, desc }) => (
              <NilaiCard key={title} icon={icon} title={title} desc={desc} />
            ))}
          </div>

          {/* ── Stats ── */}
          <TiltCard style={{ padding: 0 }}>
            <div style={{
              padding: '48px 40px',
              background: 'rgba(232,165,152,0.05)',
            }}>
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 2, background: 'linear-gradient(90deg, transparent, rgba(232,165,152,0.6), transparent)', borderRadius: '0 0 4px 4px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 32, position: 'relative', zIndex: 3 }}>
                {STATS.map(({ val, label }) => (
                  <StatCard key={label} val={val} label={label} />
                ))}
              </div>
            </div>
          </TiltCard>

        </div>
      </div>
      <Footer />
      <WAFloat />
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
      `}</style>
    </div>
  );
}