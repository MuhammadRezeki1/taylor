'use client';
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WAFloat from '@/src/components/WAFloat';
import { layananAPI, type Layanan } from '@/src/lib/api';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/* ─── Tilt + Glow Card ─────────────────────────────────────────── */
function ServiceCard({ item, index }: { item: Layanan; index: number }) {
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
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;

    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.035)`;
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(232,165,152,0.22) 0%, transparent 65%)`;
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
        position: 'relative',
        borderRadius: 20,
        padding: 32,
        background: 'rgba(255,255,255,0.055)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        transition: 'transform 0.12s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        boxShadow: hovered
          ? '0 20px 60px rgba(232,165,152,0.18), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)'
          : '0 4px 24px rgba(0,0,0,0.25)',
        borderColor: hovered ? 'rgba(232,165,152,0.30)' : 'rgba(255,255,255,0.10)',
        cursor: 'pointer',
        animationDelay: `${index * 0.07}s`,
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >
      {/* Glow layer */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: 0, borderRadius: 20,
        pointerEvents: 'none', transition: 'background 0.1s ease', zIndex: 0,
      }} />

      {/* Shimmer sweep on hover */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 20,
        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
        backgroundSize: '200% 100%',
        backgroundPositionX: hovered ? '0%' : '200%',
        transition: 'background-position-x 0.6s ease',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
        background: hovered
          ? 'linear-gradient(90deg, transparent, rgba(232,165,152,0.8), transparent)'
          : 'transparent',
        transition: 'background 0.4s ease',
        borderRadius: '0 0 4px 4px', zIndex: 2,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        {/* Icon wrapper */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 72, height: 72, borderRadius: 18,
          background: hovered ? 'rgba(232,165,152,0.15)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${hovered ? 'rgba(232,165,152,0.30)' : 'rgba(255,255,255,0.08)'}`,
          marginBottom: 22, fontSize: 36,
          transition: 'all 0.35s ease',
          transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1) rotate(0deg)',
          boxShadow: hovered ? '0 8px 24px rgba(232,165,152,0.2)' : 'none',
        }}>
          {item.icon}
        </div>

        <h2 style={{
          fontSize: 21, fontWeight: 800, color: '#fff',
          marginBottom: 10, fontFamily: "'Playfair Display',serif",
          transition: 'color 0.3s ease',
        }}>
          {item.nama}
        </h2>

        <p style={{
          fontSize: 14, color: 'rgba(245,237,232,0.5)', lineHeight: 1.75, marginBottom: 22,
          transition: 'color 0.3s ease',
        }}>
          {item.deskripsi}
        </p>

        {/* Footer row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div>
            <div style={{
              fontSize: 10, color: 'rgba(232,165,152,0.65)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4,
            }}>
              Mulai dari
            </div>
            <div style={{
              fontSize: 22, fontWeight: 800, color: '#e8a598',
              fontFamily: "'Playfair Display',serif",
              transition: 'transform 0.3s ease',
              transform: hovered ? 'translateX(2px)' : 'translateX(0)',
            }}>
              Rp {item.harga_mulai.toLocaleString('id-ID')}
            </div>
          </div>

          <Link href="/pesan" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 50,
            background: hovered
              ? 'linear-gradient(135deg, #e8a598, #d4826e)'
              : 'rgba(232,165,152,0.12)',
            border: `1px solid ${hovered ? 'transparent' : 'rgba(232,165,152,0.25)'}`,
            color: hovered ? '#1a0f0c' : '#e8a598',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            transition: 'all 0.35s ease',
            transform: hovered ? 'translateX(0) scale(1.04)' : 'translateX(0) scale(1)',
            boxShadow: hovered ? '0 4px 18px rgba(232,165,152,0.35)' : 'none',
            whiteSpace: 'nowrap',
          }}>
            Pesan
            <ArrowRight size={14} style={{
              transition: 'transform 0.3s ease',
              transform: hovered ? 'translateX(3px)' : 'translateX(0)',
            }} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function LayananPage() {
  const [data, setData] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    layananAPI.getAll(true).then(r => setData(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Navbar />
      <div style={{ paddingTop: 68 }}>

        {/* Header */}
        <div style={{
          padding: '80px 24px 72px',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
            width: 600, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,165,152,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-chip" style={{ justifyContent: 'center' }}>✂️ Apa yang Kami Kerjakan</div>
            <h1 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(32px,5vw,56px)',
              fontWeight: 800, color: '#fff', marginTop: 12,
            }}>
              Layanan Jahit Kami
            </h1>
            <p style={{ color: 'rgba(245,237,232,0.55)', fontSize: 16, marginTop: 12, maxWidth: 520, margin: '12px auto 0' }}>
              Semua kebutuhan jahit Anda, kami kerjakan dengan teliti dan penuh cinta.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '72px 24px' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 28 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 280, borderRadius: 20 }} />
              ))}
            </div>
          ) : data.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(245,237,232,0.4)', padding: '60px 0' }}>
              Belum ada layanan.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 28 }}>
              {data.map((item, i) => (
                <ServiceCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WAFloat />
    </div>
  );
}