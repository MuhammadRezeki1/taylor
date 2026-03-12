'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WAFloat from '@/src/components/WAFloat';
import { blogAPI, type Blog } from '@/src/lib/api';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      blogAPI.getBySlug(slug)
        .then(r => setData(r.data))
        .catch(() => setData(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  /* ── Loading ── */
  if (loading) return (
    <div style={{
      minHeight: '100vh', position: 'relative', zIndex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          border: '3px solid rgba(232,165,152,0.2)',
          borderTopColor: '#e8a598',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px',
        }} />
        <p style={{ color: 'rgba(245,237,232,0.4)', fontSize: 14 }}>Memuat artikel...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  /* ── Not found ── */
  if (!data) return (
    <div style={{
      minHeight: '100vh', position: 'relative', zIndex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 20,
    }}>
      <div style={{ fontSize: 64 }}>😕</div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#fff', fontWeight: 700 }}>
        Artikel tidak ditemukan
      </h2>
      <p style={{ color: 'rgba(245,237,232,0.45)' }}>Mungkin artikel ini sudah dipindahkan atau dihapus.</p>
      <Link href="/blog" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '11px 24px', borderRadius: 30,
        background: 'rgba(232,165,152,0.12)',
        border: '1px solid rgba(232,165,152,0.25)',
        color: '#e8a598', textDecoration: 'none',
        fontSize: 14, fontWeight: 600,
        backdropFilter: 'blur(8px)',
      }}>
        <ArrowLeft size={15} /> Kembali ke Blog
      </Link>
    </div>
  );

  const readTime = Math.max(1, Math.round((data.konten?.length ?? 0) / 1200));

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Navbar />
      <div style={{ paddingTop: 68 }}>

        {/* ── Hero ── */}
        <div style={{
          padding: '64px 24px 0',
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow orb */}
          <div style={{
            position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
            width: 600, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,165,152,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>

            {/* Back button */}
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: '#e8a598', textDecoration: 'none', fontWeight: 600, fontSize: 13,
              background: 'rgba(232,165,152,0.1)', padding: '9px 18px',
              borderRadius: 30, border: '1px solid rgba(232,165,152,0.22)',
              transition: 'all 0.25s', marginBottom: 36,
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(232,165,152,0.2)'; el.style.transform = 'translateX(-3px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(232,165,152,0.1)'; el.style.transform = 'none'; }}
            >
              <ArrowLeft size={14} /> Kembali ke Blog
            </Link>

            {/* Meta */}
            <div style={{ display: 'flex', gap: 18, color: 'rgba(245,237,232,0.45)', fontSize: 13, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={13} style={{ color: '#e8a598' }} />
                {new Date(data.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={13} style={{ color: 'rgba(232,165,152,0.7)' }} /> {data.penulis}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={13} style={{ color: 'rgba(232,165,152,0.5)' }} /> {readTime} menit baca
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(26px,4.5vw,46px)',
              fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 0,
            }}>
              {data.judul}
            </h1>

            {/* Thumbnail */}
            <div style={{
              marginTop: 40, borderRadius: '20px 20px 0 0', overflow: 'hidden',
              height: 280, position: 'relative',
              background: 'linear-gradient(135deg, rgba(232,165,152,0.15), rgba(196,112,95,0.1))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.08)',
              borderBottom: 'none',
            }}>
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.05,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }} />
              <div style={{
                position: 'absolute', width: 240, height: 240, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(232,165,152,0.2) 0%, transparent 70%)',
              }} />
              <span style={{
                fontSize: 90, position: 'relative', zIndex: 1,
                filter: 'drop-shadow(0 0 40px rgba(232,165,152,0.5))',
                animation: 'float 4s ease-in-out infinite',
              }}>📰</span>
            </div>
          </div>
        </div>

        {/* ── Article body ── */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 96px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '0 0 24px 24px',
            border: '1px solid rgba(255,255,255,0.09)',
            borderTop: 'none',
            boxShadow: '0 24px 72px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}>
            {/* Top accent */}
            <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(232,165,152,0.8), transparent)' }} />

            <div style={{ padding: '44px 48px' }}>
              {data.ringkasan && (
                <div style={{
                  background: 'rgba(232,165,152,0.08)',
                  border: '1px solid rgba(232,165,152,0.2)',
                  borderRadius: 16, padding: '20px 24px', marginBottom: 36,
                }}>
                  <p style={{ fontSize: 17, color: 'rgba(245,237,232,0.7)', lineHeight: 1.9, fontStyle: 'italic', margin: 0 }}>
                    {data.ringkasan}
                  </p>
                </div>
              )}

              <div style={{ color: 'rgba(245,237,232,0.65)', fontSize: 16, lineHeight: 2, whiteSpace: 'pre-line' }}>
                {data.konten}
              </div>
            </div>
          </div>

          {/* ── Author card ── */}
          <div style={{ marginTop: 32 }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 22, padding: '28px 32px',
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(232,165,152,0.3), rgba(196,112,95,0.4))',
                border: '1.5px solid rgba(232,165,152,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, boxShadow: '0 4px 18px rgba(232,165,152,0.2)',
              }}>✍️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'rgba(232,165,152,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
                  Ditulis oleh
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{data.penulis}</div>
                <div style={{ fontSize: 13, color: 'rgba(245,237,232,0.4)', marginTop: 3 }}>Tim Jahit Buk Nining</div>
              </div>
              <Link href="/blog" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 22px', borderRadius: 30, textDecoration: 'none',
                background: 'rgba(232,165,152,0.1)', border: '1px solid rgba(232,165,152,0.25)',
                color: '#e8a598', fontSize: 13, fontWeight: 600,
                backdropFilter: 'blur(8px)', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,165,152,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,165,152,0.1)'; }}
              >
                Artikel Lainnya <ArrowLeft size={13} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </div>
          </div>

          {/* ── Back link ── */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 30, textDecoration: 'none',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(245,237,232,0.7)', fontSize: 14, fontWeight: 600,
              backdropFilter: 'blur(8px)', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,165,152,0.1)'; (e.currentTarget as HTMLElement).style.color = '#e8a598'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,165,152,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,232,0.7)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >
              <ArrowLeft size={16} /> Kembali ke Daftar Artikel
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <WAFloat />
      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      `}</style>
    </div>
  );
}