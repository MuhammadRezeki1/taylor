import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title:       { default: 'Jahit Buk Nining', template: '%s | Jahit Buk Nining' },
  description: 'Jahit Buk Nining — Jahitan Rapi, Harga Bersahabat. Jasa jahit profesional dengan pengalaman lebih dari 15 tahun.',
  keywords:    ['jahit','penjahit','kebaya','seragam','permak','jahit baju','Pekanbaru'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '14px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '14px',
              background: 'rgba(15,12,30,.96)',
              color: '#f0eeff',
              border: '1px solid rgba(255,255,255,.12)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,.4)',
            },
            success: { iconTheme: { primary: '#a78bfa', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#f472b6', secondary: '#fff' } },
          }}
        />
        {children}
      </body>
    </html>
  );
}