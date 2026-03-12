'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WAFloat from '@/src/components/WAFloat';
import { layananAPI, testimoniAPI, galeriAPI, blogAPI, type Layanan, type Testimoni, type Galeri, type Blog } from '@/src/lib/api';
import { Star, ChevronRight, ArrowRight } from 'lucide-react';

/* ─── useInView ──────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setInView(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Tilt Card ──────────────────────────────────────────────────── */
function TiltCard({ children, style, padding }: { children: React.ReactNode; style?: React.CSSProperties; padding?: number | string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const cx = rect.width / 2; const cy = rect.height / 2;
    el.style.transform = `perspective(800px) rotateX(${((y - cy) / cy) * -8}deg) rotateY(${((x - cx) / cx) * 8}deg) scale(1.03)`;
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(232,165,152,0.2) 0%, transparent 65%)`;
  };

  const onLeave = () => {
    const el = cardRef.current; const glow = glowRef.current;
    if (!el || !glow) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    glow.style.background = 'transparent';
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        position: 'relative', borderRadius: 20,
        padding: padding ?? 28,
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
      <div ref={glowRef} style={{ position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none', transition: 'background 0.1s ease', zIndex: 0 }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 20,
        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
        backgroundSize: '200% 100%', backgroundPositionX: hovered ? '0%' : '200%',
        transition: 'background-position-x 0.6s ease', pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, background: hovered ? 'linear-gradient(90deg,transparent,rgba(232,165,152,0.8),transparent)' : 'transparent', transition: 'background 0.4s ease', zIndex: 2 }} />
      <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
    </div>
  );
}

const KEUNGGULAN = [
  { icon: '✂️', title: 'Jahitan Rapi & Presisi', desc: 'Setiap jahitan dikerjakan dengan teliti menggunakan teknik profesional.' },
  { icon: '⏰', title: 'Tepat Waktu', desc: 'Kami menghargai waktu Anda. Pesanan selesai sesuai jadwal yang disepakati.' },
  { icon: '💰', title: 'Harga Terjangkau', desc: 'Kualitas premium dengan harga yang bersahabat untuk semua kalangan.' },
  { icon: '🔄', title: 'Garansi Revisi', desc: 'Tidak puas? Kami siap merevisi hingga Anda benar-benar puas.' },
  { icon: '👗', title: 'Berpengalaman 15+ Tahun', desc: 'Pengalaman panjang menjamin kepuasan setiap pelanggan.' },
  { icon: '🏆', title: 'Pelanggan Setia', desc: 'Ratusan pelanggan setia telah mempercayakan jahitan mereka kepada kami.' },
];

const WA_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─── Hover Button ───────────────────────────────────────────────── */
function HoverLink({ href, children, className, style }: { href: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href} className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
        ...style,
      }}
    >
      {children}
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function HomePage() {
  const [layanan,   setLayanan]   = useState<Layanan[]>([]);
  const [testimoni, setTestimoni] = useState<Testimoni[]>([]);
  const [galeri,    setGaleri]    = useState<Galeri[]>([]);
  const [blog,      setBlog]      = useState<Blog[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [mounted,   setMounted]   = useState(false);

  const layananRef = useInView();
  const keungRef   = useInView();
  const testiRef   = useInView();
  const galeriRef  = useInView();
  const blogRef    = useInView();

  useEffect(() => {
    setMounted(true);
    Promise.all([
      layananAPI.getAll(true),
      testimoniAPI.getAll(true),
      galeriAPI.getAll(),
      blogAPI.getAll(true),
    ]).then(([l, t, g, b]) => {
      setLayanan(l.data.slice(0, 6));
      setTestimoni(t.data.slice(0, 6));
      setGaleri(g.data.slice(0, 6));
      setBlog(b.data.slice(0, 3));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const wa = process.env.NEXT_PUBLIC_WHATSAPP || '628123456789';

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 68 }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,165,152,0.09) 0%, transparent 70%)', pointerEvents: 'none', animation: 'orbDrift 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '0%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,112,95,0.07) 0%, transparent 70%)', pointerEvents: 'none', animation: 'orbDrift 14s ease-in-out infinite reverse' }} />

        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="grid-2">

            {/* Left */}
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity .7s, transform .7s' }}>
              <div className="section-chip">{'✂️ Jasa Jahit Profesional'}</div>
              <h1 style={{ fontSize: 'clamp(36px,5.5vw,62px)', fontWeight: 800, fontFamily: "'Playfair Display',serif", color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
                {'Jahitan '}
                <span style={{ color: '#e8a598', fontStyle: 'italic' }}>{'Rapi'}</span>
                <br />
                {'untuk Penampilan '}
                <span style={{ color: '#e8a598', fontStyle: 'italic' }}>{'Sempurna'}</span>
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(245,237,232,0.65)', lineHeight: 1.85, marginBottom: 36, maxWidth: 480 }}>
                {'Buk Nining siap mengerjakan kebutuhan jahit Anda — dari baju baru, kebaya, seragam, hingga permak pakaian lama menjadi seperti baru.'}
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
                <HoverLink href="/pesan" className="btn-primary">
                  {'Pesan Sekarang'} <ArrowRight size={16} />
                </HoverLink>
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  {WA_SVG} {'Chat WhatsApp'}
                </a>
              </div>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { val: '15+', label: 'Tahun Pengalaman' },
                  { val: '500+', label: 'Pelanggan Puas' },
                  { val: '1000+', label: 'Jahitan Selesai' },
                ].map(({ val, label }) => (
                  <StatBadge key={label} val={val} label={label} />
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity .7s .2s, transform .7s .2s' }}>
              <HeroCard wa={wa} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ LAYANAN ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
          <div ref={layananRef.ref} style={{ textAlign: 'center', marginBottom: 56, opacity: layananRef.inView ? 1 : 0, transform: layananRef.inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all .6s' }}>
            <div className="section-chip">{'✂️ Apa yang Kami Kerjakan'}</div>
            <h2 className="section-title">{'Layanan Kami'}</h2>
            <p className="section-sub" style={{ margin: '10px auto 0' }}>{'Dari jahit baru hingga permak, semua dikerjakan dengan teliti.'}</p>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 200 }} />)}
            </div>
          ) : layanan.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(245,237,232,0.4)', padding: '40px 0' }}>{'Tidak dapat memuat layanan.'}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
              {layanan.map((item, i) => (
                <div key={item.id} style={{ opacity: layananRef.inView ? 1 : 0, transform: layananRef.inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity .6s ${i * .08}s, transform .6s ${i * .08}s` }}>
                  <TiltCard>
                    <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.nama}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(245,237,232,0.5)', lineHeight: 1.7, marginBottom: 16 }}>{item.deskripsi}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#e8a598' }}>
                        {'Mulai Rp '}{item.harga_mulai.toLocaleString('id-ID')}
                      </div>
                      <Link href="/pesan" style={{ fontSize: 12, fontWeight: 700, color: '#e8a598', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'gap 0.3s ease' }}>
                        {'Pesan'} <ChevronRight size={14} />
                      </Link>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <HoverLink href="/layanan" className="btn-outline">
              {'Lihat Semua Layanan'} <ArrowRight size={16} />
            </HoverLink>
          </div>
        </div>
      </section>

      {/* ══ KEUNGGULAN ════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
          <div ref={keungRef.ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="grid-2">
            <div style={{ opacity: keungRef.inView ? 1 : 0, transform: keungRef.inView ? 'translateX(0)' : 'translateX(-28px)', transition: 'all .7s' }}>
              <div className="section-chip">{'💎 Kenapa Pilih Kami'}</div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>{'Kepuasan Anda adalah Prioritas Kami'}</h2>
              <p style={{ color: 'rgba(245,237,232,0.55)', fontSize: 15, lineHeight: 1.85, marginBottom: 32 }}>
                {'Dengan pengalaman lebih dari 15 tahun, Buk Nining telah melayani ratusan pelanggan setia.'}
              </p>
              <HoverLink href="/tentang" className="btn-primary">
                {'Cerita Kami'} <ArrowRight size={16} />
              </HoverLink>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, opacity: keungRef.inView ? 1 : 0, transform: keungRef.inView ? 'translateX(0)' : 'translateX(28px)', transition: 'all .7s .15s' }}>
              {KEUNGGULAN.map((item, i) => (
                <div key={i} style={{ transition: `transform .6s ${i * .06}s` }}>
                  <TiltCard padding="20px 18px">
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.4 }}>{item.title}</h4>
                    <p style={{ fontSize: 12, color: 'rgba(245,237,232,0.45)', lineHeight: 1.65 }}>{item.desc}</p>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALERI ════════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
          <div ref={galeriRef.ref} style={{ textAlign: 'center', marginBottom: 52, opacity: galeriRef.inView ? 1 : 0, transform: galeriRef.inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all .6s' }}>
            <div className="section-chip">{'🖼️ Hasil Karya Kami'}</div>
            <h2 className="section-title">{'Galeri'}</h2>
            <p className="section-sub" style={{ margin: '10px auto 0' }}>{'Setiap karya adalah bukti nyata kualitas dan dedikasi kami.'}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
            {loading
              ? [...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 240 }} />)
              : galeri.length === 0
                ? <p style={{ textAlign: 'center', color: 'rgba(245,237,232,0.4)', gridColumn: '1/-1' }}>{'Belum ada foto galeri.'}</p>
                : galeri.map((item, i) => (
                  <GaleriCard key={item.id} item={item} inView={galeriRef.inView} index={i} />
                ))
            }
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <HoverLink href="/galeri" className="btn-outline">
              {'Lihat Semua Karya'} <ArrowRight size={16} />
            </HoverLink>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONI ═════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
          <div ref={testiRef.ref} style={{ textAlign: 'center', marginBottom: 52, opacity: testiRef.inView ? 1 : 0, transform: testiRef.inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all .6s' }}>
            <div className="section-chip">{'⭐ Kata Pelanggan Kami'}</div>
            <h2 className="section-title">{'Testimoni'}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 }}>
            {loading
              ? [...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 180 }} />)
              : testimoni.map((item, i) => (
                <div key={item.id} style={{ opacity: testiRef.inView ? 1 : 0, transform: testiRef.inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity .6s ${i * .08}s, transform .6s ${i * .08}s` }}>
                  <TestimoniCard item={item} />
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* ══ BLOG ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
          <div ref={blogRef.ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, opacity: blogRef.inView ? 1 : 0, transition: 'all .6s', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-chip">{'📝 Tips & Inspirasi'}</div>
              <h2 className="section-title">{'Blog Kami'}</h2>
            </div>
            <HoverLink href="/blog" className="btn-outline" style={{ padding: '10px 22px', fontSize: 13 }}>
              {'Semua Artikel'} <ChevronRight size={15} />
            </HoverLink>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 28 }}>
              {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 320 }} />)}
            </div>
          ) : blog.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(245,237,232,0.4)', padding: '40px 0' }}>{'Belum ada artikel blog.'}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 28 }}>
              {blog.map((item, i) => (
                <div key={item.id} style={{ opacity: blogRef.inView ? 1 : 0, transform: blogRef.inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity .6s ${i * .1}s, transform .6s ${i * .1}s` }}>
                  <BlogCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <TiltCard padding="clamp(40px,6vw,72px)" style={{ textAlign: 'center', background: 'rgba(232,165,152,0.06)', border: '1px solid rgba(232,165,152,0.15)' }}>
            <div style={{ fontSize: 52, marginBottom: 20, animation: 'float 4s ease-in-out infinite' }}>{'✂️'}</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', fontFamily: "'Playfair Display',serif", marginBottom: 16 }}>
              {'Siap Tampil Percaya Diri?'}
            </h2>
            <p style={{ color: 'rgba(245,237,232,0.6)', fontSize: 16, lineHeight: 1.8, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
              {'Hubungi Buk Nining sekarang dan wujudkan pakaian impian Anda. Konsultasi gratis!'}
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <HoverLink href="/pesan" className="btn-primary">{'Pesan Sekarang'}</HoverLink>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="btn-wa">
                {WA_SVG} {'WhatsApp Kami'}
              </a>
            </div>
          </TiltCard>
        </div>
      </section>

      <Footer />
      <WAFloat />
      <style>{`
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,15px)} }
      `}</style>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */

function StatBadge({ val, label }: { val: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ transition: 'transform 0.3s ease', transform: hovered ? 'translateY(-3px)' : 'translateY(0)', cursor: 'default' }}>
      <div style={{ fontSize: 28, fontWeight: 800, color: hovered ? '#fff' : '#e8a598', fontFamily: "'Playfair Display',serif", transition: 'color 0.3s ease, text-shadow 0.3s ease', textShadow: hovered ? '0 0 24px rgba(232,165,152,0.6)' : 'none' }}>{val}</div>
      <div style={{ fontSize: 12, color: 'rgba(245,237,232,0.4)', fontWeight: 500, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function HeroCard({ wa }: { wa: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const cx = rect.width / 2; const cy = rect.height / 2;
    el.style.transform = `perspective(900px) rotateX(${((y - cy) / cy) * -6}deg) rotateY(${((x - cx) / cx) * 6}deg) scale(1.02)`;
    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(232,165,152,0.15) 0%, transparent 60%)`;
  };

  const onLeave = () => {
    const el = cardRef.current; const glow = glowRef.current;
    if (!el || !glow) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    glow.style.background = 'transparent';
  };

  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{ position: 'relative', transition: 'transform 0.15s ease', willChange: 'transform' }}>
      <div ref={glowRef} style={{ position: 'absolute', inset: 0, borderRadius: 24, pointerEvents: 'none', zIndex: 0, transition: 'background 0.1s ease' }} />
      <div className="glass" style={{ padding: 32, background: 'rgba(232,165,152,0.08)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', paddingBottom: '85%', borderRadius: 20, background: 'linear-gradient(135deg,rgba(232,165,152,0.15),rgba(196,112,95,0.1))', border: '1px solid rgba(232,165,152,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>{'🧵'}</div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.6),transparent)', padding: '24px 20px' }}>
            <div style={{ color: '#fff', fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600 }}>{'Jahit dengan Penuh Cinta ❤️'}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>{'Setiap jahitan dibuat dengan sepenuh hati'}</div>
          </div>
        </div>
      </div>
      <div className="glass" style={{ position: 'absolute', top: -14, right: -14, padding: '12px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.1)', animation: 'float 3s ease-in-out infinite', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#e8a598,#c4705f)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={14} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{'Rating 5.0'}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{'dari 500+ ulasan'}</div>
          </div>
        </div>
      </div>
      <div className="glass" style={{ position: 'absolute', bottom: 40, left: -14, padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', animation: 'float 3.5s ease-in-out infinite .5s', zIndex: 2 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{'✅ Garansi Revisi'}</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{'Hingga Anda Puas'}</div>
      </div>
    </div>
  );
}

function GaleriCard({ item, inView, index }: { item: Galeri; inView: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20, overflow: 'hidden',
        background: 'rgba(255,255,255,0.055)',
        border: `1px solid ${hovered ? 'rgba(232,165,152,0.3)' : 'rgba(255,255,255,0.10)'}`,
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease',
        transform: hovered ? 'scale(1.04) translateY(-6px)' : 'scale(1) translateY(0)',
        boxShadow: hovered ? '0 20px 50px rgba(232,165,152,0.18), 0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.2)',
        opacity: inView ? 1 : 0,
        animation: inView ? `fadeUp .5s ease ${index * .07}s both` : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
        <img src={item.url_gambar} alt={item.judul ?? 'Galeri'} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: hovered ? 'linear-gradient(to bottom, rgba(26,15,12,0.1) 0%, rgba(26,15,12,0.65) 100%)' : 'linear-gradient(to bottom, transparent 60%, rgba(26,15,12,0.4) 100%)', transition: 'background 0.35s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(232,165,152,0.2)', border: '1.5px solid rgba(232,165,152,0.5)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.5)', transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <span style={{ fontSize: 18 }}>{'🔍'}</span>
          </div>
        </div>
      </div>
      {item.judul && (
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${hovered ? 'rgba(232,165,152,0.2)' : 'rgba(255,255,255,0.08)'}`, transition: 'border-color 0.3s ease' }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: hovered ? '#e8a598' : '#fff', transition: 'color 0.3s ease', margin: 0 }}>{item.judul}</p>
        </div>
      )}
    </div>
  );
}

function TestimoniCard({ item }: { item: Testimoni }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20, padding: 26,
        background: 'rgba(255,255,255,0.055)',
        border: `1px solid ${hovered ? 'rgba(232,165,152,0.30)' : 'rgba(255,255,255,0.10)'}`,
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 50px rgba(232,165,152,0.15), 0 4px 20px rgba(0,0,0,0.35)' : '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
        {[...Array(item.bintang)].map((_, j) => (
          <Star key={j} size={14} style={{ color: '#f59e0b', fill: '#f59e0b', transition: 'transform 0.2s ease', transform: hovered ? 'scale(1.2)' : 'scale(1)' }} />
        ))}
      </div>
      <p style={{ fontSize: 14, color: 'rgba(245,237,232,0.65)', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>
        {'"'}{item.isi}{'"'}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: hovered ? 'linear-gradient(135deg,#e8a598,#c4705f)' : 'linear-gradient(135deg,rgba(232,165,152,0.3),rgba(196,112,95,0.4))', border: '1px solid rgba(232,165,152,0.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: hovered ? '#fff' : '#e8a598', fontWeight: 700, fontSize: 16, flexShrink: 0, transition: 'all 0.3s ease' }}>
          {item.nama.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{item.nama}</div>
          {item.kota && <div style={{ fontSize: 12, color: 'rgba(245,237,232,0.4)' }}>{item.kota}</div>}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ item }: { item: Blog }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/blog/${item.slug}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 20, overflow: 'hidden',
          background: 'rgba(255,255,255,0.055)',
          border: `1px solid ${hovered ? 'rgba(232,165,152,0.30)' : 'rgba(255,255,255,0.10)'}`,
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease',
          transform: hovered ? 'scale(1.03) translateY(-5px)' : 'scale(1) translateY(0)',
          boxShadow: hovered ? '0 20px 50px rgba(232,165,152,0.18), 0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ height: 180, background: 'linear-gradient(135deg,rgba(232,165,152,0.15),rgba(196,112,95,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle,rgba(232,165,152,0.2) 0%,transparent 70%)', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.5)' : 'scale(1)' }} />
          <span style={{ position: 'relative', zIndex: 1, transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)', filter: 'drop-shadow(0 0 20px rgba(232,165,152,0.4))' }}>{'📰'}</span>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, background: hovered ? 'linear-gradient(90deg,transparent,rgba(232,165,152,0.8),transparent)' : 'transparent', transition: 'background 0.4s ease' }} />
        </div>
        <div style={{ padding: '20px 22px' }}>
          <div style={{ fontSize: 12, color: '#e8a598', fontWeight: 600, marginBottom: 8 }}>
            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: hovered ? '#e8a598' : '#fff', lineHeight: 1.5, marginBottom: 10, transition: 'color 0.3s ease' }}>{item.judul}</h3>
          {item.ringkasan && (
            <p style={{ fontSize: 13, color: 'rgba(245,237,232,0.45)', lineHeight: 1.65, marginBottom: 14 }}>{item.ringkasan}</p>
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: '#e8a598', display: 'flex', alignItems: 'center', gap: 4, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {'Baca Selengkapnya'}
            <ChevronRight size={14} style={{ transition: 'transform 0.3s ease', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }} />
          </span>
        </div>
      </div>
    </Link>
  );
}