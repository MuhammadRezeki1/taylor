'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WAFloat from '@/src/components/WAFloat';
import { galeriAPI, type Galeri } from '@/src/lib/api';
import { X, ZoomIn } from 'lucide-react';

const KATEGORI = ['semua','kebaya','seragam','pesta','batik','celana','bordir'];

/* ─── Filter Chip ────────────────────────────────────────────────── */
function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 22px', borderRadius: 30, cursor: 'pointer',
        fontFamily: 'inherit', fontWeight: 600, fontSize: 13, textTransform: 'capitalize',
        transition: 'all 0.25s ease',
        border: active
          ? '1px solid transparent'
          : `1px solid ${hovered ? 'rgba(232,165,152,0.4)' : 'rgba(255,255,255,0.12)'}`,
        background: active
          ? 'linear-gradient(135deg, #e8a598, #c4705f)'
          : hovered
            ? 'rgba(232,165,152,0.12)'
            : 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: active ? '#1a0f0c' : hovered ? '#e8a598' : 'rgba(245,237,232,0.7)',
        boxShadow: active
          ? '0 4px 18px rgba(232,165,152,0.35)'
          : hovered ? '0 2px 12px rgba(232,165,152,0.15)' : 'none',
        transform: hovered && !active ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {label}
    </button>
  );
}

/* ─── Gallery Card ───────────────────────────────────────────────── */
function GalleryCard({ item, onClick }: { item: Galeri; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20, overflow: 'hidden', cursor: 'pointer', position: 'relative',
        background: 'rgba(255,255,255,0.055)',
        border: `1px solid ${hovered ? 'rgba(232,165,152,0.30)' : 'rgba(255,255,255,0.10)'}`,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease',
        transform: hovered ? 'scale(1.03) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: hovered
          ? '0 20px 60px rgba(232,165,152,0.18), 0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)'
          : '0 4px 24px rgba(0,0,0,0.25)',
      }}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <img
          src={item.url_gambar}
          alt={item.judul ?? 'Galeri'}
          style={{
            width: '100%', height: 240, objectFit: 'cover', display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? 'linear-gradient(to bottom, rgba(26,15,12,0.15) 0%, rgba(26,15,12,0.75) 100%)'
            : 'linear-gradient(to bottom, transparent 50%, rgba(26,15,12,0.5) 100%)',
          transition: 'background 0.35s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Zoom icon */}
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(232,165,152,0.15)',
            border: '1.5px solid rgba(232,165,152,0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(0.5)',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            boxShadow: '0 4px 16px rgba(232,165,152,0.2)',
          }}>
            <ZoomIn size={22} color="#e8a598" />
          </div>
        </div>

        {/* Category badge */}
        {item.kategori && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(232,165,152,0.15)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(232,165,152,0.3)',
            padding: '4px 12px', borderRadius: 20,
            fontSize: 11, fontWeight: 700, color: '#e8a598',
            textTransform: 'capitalize', letterSpacing: 0.5,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'all 0.3s ease',
          }}>
            {item.kategori}
          </div>
        )}
      </div>

      {/* Title */}
      {item.judul && (
        <div style={{
          padding: '16px 20px',
          borderTop: `1px solid ${hovered ? 'rgba(232,165,152,0.2)' : 'rgba(255,255,255,0.08)'}`,
          transition: 'border-color 0.3s ease',
        }}>
          <p style={{
            fontSize: 14, fontWeight: 600, margin: 0,
            transition: 'color 0.3s ease',
            color: hovered ? '#e8a598' : 'rgba(245,237,232,0.85)',
            fontFamily: "'Playfair Display', serif",
          }}>
            {item.judul}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function GaleriPage() {
  const [data, setData] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<Galeri | null>(null);
  const [filter, setFilter] = useState('semua');

  useEffect(() => {
    setLoading(true);
    const k = filter === 'semua' ? undefined : filter;
    galeriAPI.getAll(k).then(r => setData(r.data)).finally(() => setLoading(false));
  }, [filter]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Navbar />
      <div style={{ paddingTop: 68 }}>

        {/* Header — dark glass, sama seperti Layanan */}
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
            <div className="section-chip" style={{ justifyContent: 'center' }}>🖼️ Hasil Karya</div>
            <h1 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(32px,5vw,56px)',
              fontWeight: 800, color: '#fff', marginTop: 12,
            }}>
              Galeri Karya
            </h1>
            <p style={{ color: 'rgba(245,237,232,0.55)', fontSize: 16, marginTop: 12, maxWidth: 520, margin: '12px auto 0' }}>
              Lihat hasil jahitan terbaik kami untuk berbagai kebutuhan.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '56px 24px' }}>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
            {KATEGORI.map(k => (
              <FilterChip key={k} label={k} active={filter === k} onClick={() => setFilter(k)} />
            ))}
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 22 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 260, borderRadius: 20 }} />
              ))}
            </div>
          ) : data.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(245,237,232,0.4)', padding: '60px 0' }}>
              Belum ada foto dalam kategori ini.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 22 }}>
              {data.map(item => (
                <GalleryCard key={item.id} item={item} onClick={() => setLightbox(item)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
            animation: 'fadeIn 0.2s ease', backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <button
            onClick={e => { e.stopPropagation(); setLightbox(null); }}
            style={{
              position: 'absolute', top: 24, right: 24,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 46, height: 46, borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,165,152,0.2)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,165,152,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
          >
            <X size={20} />
          </button>

          <img
            src={lightbox.url_gambar}
            alt={lightbox.judul ?? 'Galeri'}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90%', maxHeight: '88vh', borderRadius: 18,
              objectFit: 'contain',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
              animation: 'zoomIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />

          {lightbox.judul && (
            <div style={{
              position: 'absolute', bottom: 32,
              background: 'rgba(232,165,152,0.12)',
              border: '1px solid rgba(232,165,152,0.25)',
              color: '#e8a598', fontFamily: "'Playfair Display', serif",
              padding: '10px 24px', borderRadius: 30, fontSize: 14, fontWeight: 600,
              backdropFilter: 'blur(8px)',
              animation: 'slideUp 0.3s ease 0.1s both',
            }}>
              {lightbox.judul}
            </div>
          )}
        </div>
      )}

      <Footer />
      <WAFloat />

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes zoomIn  { from { transform: scale(0.85); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}