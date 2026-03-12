'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Scissors } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/blog', label: 'Blog' },
  { href: '/tentang', label: 'Tentang' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: scrolled ? 'rgba(26,15,12,0.7)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
      transition: 'all .35s ease',
      boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.3)' : 'none',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(232,165,152,0.3), rgba(196,112,95,0.4))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(232,165,152,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(196,112,95,0.3)',
            }}>
              <Scissors size={18} color="#e8a598" />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 17, color: '#fff', lineHeight: 1 }}>
                Jahit Buk Nining
              </div>
              <div style={{ fontSize: 10, color: 'rgba(232,165,152,0.7)', letterSpacing: '.8px', marginTop: 2 }}>
                Jahitan Rapi • Harga Bersahabat
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{
                  color: active ? '#e8a598' : 'rgba(245,237,232,0.7)',
                  textDecoration: 'none', padding: '7px 16px',
                  borderRadius: 50, fontSize: 14, fontWeight: active ? 600 : 500,
                  background: active ? 'rgba(232,165,152,0.15)' : 'transparent',
                  border: active ? '1px solid rgba(232,165,152,0.25)' : '1px solid transparent',
                  backdropFilter: active ? 'blur(10px)' : 'none',
                  transition: 'all .2s ease',
                }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = '#e8a598';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(232,165,152,0.08)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,232,0.7)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/pesan" className="btn-primary hide-mobile" style={{ padding: '10px 22px', fontSize: 13 }}>
              Pesan Sekarang
            </Link>
            <button className="show-mobile"
              onClick={() => setOpen(!open)}
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 10, padding: 8, cursor: 'pointer', color: '#e8a598', display: 'none' }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{
            background: 'rgba(26,15,12,0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 16, margin: '0 0 12px',
            padding: '12px 8px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            animation: 'fadeUp .2s ease',
          }}>
            {LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} style={{
                display: 'block', color: 'rgba(245,237,232,0.8)', textDecoration: 'none',
                padding: '11px 16px', borderRadius: 10, fontSize: 14, fontWeight: 500,
                transition: 'all .2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,165,152,0.1)'; (e.currentTarget as HTMLElement).style.color = '#e8a598'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(245,237,232,0.8)'; }}
              >
                {label}
              </Link>
            ))}
            <div style={{ padding: '10px 8px 4px' }}>
              <Link href="/pesan" onClick={() => setOpen(false)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Pesan Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}