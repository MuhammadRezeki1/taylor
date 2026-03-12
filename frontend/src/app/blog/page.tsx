'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WAFloat from '@/src/components/WAFloat';
import { blogAPI, type Blog } from '@/src/lib/api';
import { ChevronRight, Calendar, User } from 'lucide-react';

/* ─── Blog Card ──────────────────────────────────────────────────── */
function BlogCard({ item }: { item: Blog }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/blog/${item.slug}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
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
        {/* Thumbnail */}
        <div style={{
          height: 200, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(232,165,152,0.15), rgba(196,112,95,0.1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.06,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
          {/* Glow orb */}
          <div style={{
            position: 'absolute', width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,165,152,0.25) 0%, transparent 70%)',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.3)' : 'scale(1)',
          }} />
          <span style={{
            fontSize: 56, position: 'relative', zIndex: 1,
            filter: 'drop-shadow(0 0 20px rgba(232,165,152,0.4))',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
            display: 'block',
          }}>📰</span>

          {/* Top accent bar */}
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
            background: hovered
              ? 'linear-gradient(90deg, transparent, rgba(232,165,152,0.8), transparent)'
              : 'transparent',
            transition: 'background 0.4s ease',
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(232,165,152,0.7)', fontWeight: 600 }}>
              <Calendar size={11} style={{ color: '#e8a598' }} />
              {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(245,237,232,0.4)', fontWeight: 600 }}>
              <User size={11} style={{ color: 'rgba(245,237,232,0.4)' }} />
              {item.penulis}
            </span>
          </div>

          <h2 style={{
            fontSize: 18, fontWeight: 700, lineHeight: 1.4, marginBottom: 10,
            fontFamily: "'Playfair Display',serif",
            color: hovered ? '#e8a598' : '#fff',
            transition: 'color 0.3s ease',
          }}>
            {item.judul}
          </h2>

          {item.ringkasan && (
            <p style={{
              fontSize: 13, lineHeight: 1.75, marginBottom: 18,
              color: 'rgba(245,237,232,0.45)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {item.ringkasan}
            </p>
          )}

          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 13, fontWeight: 700,
            color: hovered ? '#fff' : '#e8a598',
            transition: 'all 0.3s ease',
            paddingTop: 14,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            Baca Selengkapnya
            <ChevronRight size={14} style={{
              transition: 'transform 0.3s ease',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            }} />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function BlogPage() {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogAPI.getAll(true).then(r => setData(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Navbar />
      <div style={{ paddingTop: 68 }}>

        {/* Header */}
        <div style={{
          padding: '80px 24px 72px', textAlign: 'center',
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
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
            <div className="section-chip" style={{ justifyContent: 'center' }}>📝 Tips & Inspirasi</div>
            <h1 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: '#fff', marginTop: 12,
            }}>
              Blog
            </h1>
            <p style={{ color: 'rgba(245,237,232,0.55)', fontSize: 16, marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
              Tips jahit, inspirasi fashion, dan cerita dari Buk Nining.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '72px 24px' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 28 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 360, borderRadius: 20 }} />
              ))}
            </div>
          ) : data.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(245,237,232,0.4)', padding: '60px 0' }}>
              Belum ada artikel.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 28 }}>
              {data.map(item => <BlogCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <WAFloat />
    </div>
  );
}