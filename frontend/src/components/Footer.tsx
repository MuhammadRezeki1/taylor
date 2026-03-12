import Link from 'next/link';
import { Scissors, MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      marginTop: 0,
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 48, paddingBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(232,165,152,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(232,165,152,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Scissors size={16} color="#e8a598" />
              </div>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>
                Jahit Buk Nining
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.85, color: 'rgba(245,237,232,0.5)', marginBottom: 20 }}>
              Jasa jahit profesional dengan pengalaman lebih dari 15 tahun. Jahitan rapi, harga bersahabat.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(232,165,152,0.7)', textDecoration: 'none', transition: 'all .2s',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(232,165,152,0.15)';
                    el.style.color = '#e8a598';
                    el.style.borderColor = 'rgba(232,165,152,0.3)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.07)';
                    el.style.color = 'rgba(232,165,152,0.7)';
                    el.style.borderColor = 'rgba(255,255,255,0.12)';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 style={{ color: 'rgba(245,237,232,0.4)', fontWeight: 600, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
              Menu
            </h4>
            {[
              { href: '/', label: 'Beranda' },
              { href: '/layanan', label: 'Layanan' },
              { href: '/galeri', label: 'Galeri' },
              { href: '/blog', label: 'Blog' },
              { href: '/tentang', label: 'Tentang Kami' },
              { href: '/pesan', label: 'Pesan Sekarang' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                display: 'block', color: 'rgba(245,237,232,0.5)',
                textDecoration: 'none', marginBottom: 10, fontSize: 13, transition: 'color .2s',
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#e8a598'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(245,237,232,0.5)'}
              >
                › {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'rgba(245,237,232,0.4)', fontWeight: 600, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
              Kontak
            </h4>
            {[
              { Icon: MapPin, text: 'Jl. Contoh No. 123, Pekanbaru, Riau' },
              { Icon: Phone, text: '08123456789' },
              { Icon: Mail, text: 'buknining@jahitbuknining.com' },
              { Icon: Clock, text: 'Senin–Sabtu: 08.00–17.00 WIB' },
            ].map(({ Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
                <Icon size={14} style={{ color: '#e8a598', marginTop: 2, flexShrink: 0, opacity: 0.7 }} />
                <span style={{ fontSize: 13, color: 'rgba(245,237,232,0.5)', lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 24px', textAlign: 'center',
        color: 'rgba(245,237,232,0.3)', fontSize: 13,
      }}>
        © {new Date().getFullYear()} Jahit Buk Nining. Dibuat dengan ❤️ untuk pelanggan setia kami.
      </div>
    </footer>
  );
}