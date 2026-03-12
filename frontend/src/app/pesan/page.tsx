'use client';

import { useState } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WAFloat from '@/src/components/WAFloat';
import { pesananAPI } from '@/src/lib/api';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';
import GlassSelect from '@/src/components/GlassSelect'

const LAYANAN_LIST = [
  'Jahit Baju Baru',
  'Permak & Reparasi',
  'Jahit Kebaya',
  'Konveksi Seragam',
  'Jahit Celana',
  'Bordir & Sablon',
  'Lainnya'
];

export default function PesanPage() {

  const [form,setForm] = useState({
    nama_pelanggan:'',
    no_hp:'',
    email:'',
    alamat:'',
    jenis_layanan:'',
    deskripsi_pesanan:''
  });

  const [loading,setLoading] = useState(false);

  const set = (k:string,v:string)=>
    setForm(f=>({...f,[k]:v}));


  const handleSubmit = async()=>{

    if(!form.nama_pelanggan || !form.no_hp || !form.jenis_layanan){
      toast.error('Mohon lengkapi data penting');
      return;
    }

    setLoading(true);

    try{

      await pesananAPI.create(form);

      toast.success('Pesanan berhasil dikirim');

      setForm({
        nama_pelanggan:'',
        no_hp:'',
        email:'',
        alamat:'',
        jenis_layanan:'',
        deskripsi_pesanan:''
      });

    }catch{
      toast.error('Gagal mengirim pesanan');
    }

    setLoading(false);
  }


  return(

  <div style={{
    minHeight:'100vh',
    position:'relative',
    zIndex:1
  }}>

  <Navbar/>

  <div style={{paddingTop:68}}>

  {/* HEADER */}

  <div style={{
    padding:'90px 24px 80px',
    textAlign:'center',
    background:'rgba(0,0,0,0.25)',
    backdropFilter:'blur(24px)',
    borderBottom:'1px solid rgba(255,255,255,0.05)',
    position:'relative',
    overflow:'hidden'
  }}>

  <div style={{
    position:'absolute',
    top:'-35%',
    left:'50%',
    transform:'translateX(-50%)',
    width:650,
    height:420,
    borderRadius:'50%',
    background:'radial-gradient(circle, rgba(232,165,152,0.15) 0%, transparent 70%)'
  }}/>

  <div style={{position:'relative',zIndex:1}}>

  <div className="section-chip" style={{justifyContent:'center'}}>
  ✂️ Form Pemesanan
  </div>

  <h1 style={{
    fontFamily:"'Playfair Display',serif",
    fontSize:'clamp(34px,5vw,56px)',
    fontWeight:800,
    color:'#fff',
    marginTop:14
  }}>
  Pesan Jahitan
  </h1>

  <p style={{
    color:'rgba(245,237,232,0.55)',
    fontSize:16,
    marginTop:12
  }}>
  Isi form di bawah ini dan kami akan menghubungi Anda segera.
  </p>

  </div>
  </div>


  {/* FORM AREA */}

  <div style={{
    maxWidth:760,
    margin:'0 auto',
    padding:'80px 24px'
  }}>

  <div style={{

    borderRadius:26,
    padding:'46px 40px',

    background:'rgba(255,255,255,0.06)',

    backdropFilter:'blur(22px)',
    WebkitBackdropFilter:'blur(22px)',

    border:'1px solid rgba(255,255,255,0.12)',

    boxShadow:'0 30px 80px rgba(0,0,0,0.45)'

  }}>


  <div style={{
    display:'flex',
    flexDirection:'column',
    gap:24
  }}>


  {/* NAMA */}

  <input
  className="glass-input"
  placeholder="Nama lengkap"
  value={form.nama_pelanggan}
  onChange={e=>set('nama_pelanggan',e.target.value)}
  />


  {/* HP EMAIL */}

  <div style={{
    display:'grid',
    gridTemplateColumns:'1fr 1fr',
    gap:18
  }}>

  <input
  className="glass-input"
  placeholder="Nomor HP / WhatsApp"
  value={form.no_hp}
  onChange={e=>set('no_hp',e.target.value)}
  />

  <input
  className="glass-input"
  type="email"
  placeholder="Email"
  value={form.email}
  onChange={e=>set('email',e.target.value)}
  />

  </div>


  {/* LAYANAN */}

<GlassSelect
value={form.jenis_layanan}
onChange={(v)=>set('jenis_layanan',v)}
options={LAYANAN_LIST}
placeholder="Pilih layanan"
/>


  {/* ALAMAT */}

  <textarea
  rows={2}
  className="glass-input"
  placeholder="Alamat"
  value={form.alamat}
  onChange={e=>set('alamat',e.target.value)}
  />


  {/* DESKRIPSI */}

  <textarea
  rows={4}
  className="glass-input"
  placeholder="Deskripsi pesanan (model, ukuran, kain dll)"
  value={form.deskripsi_pesanan}
  onChange={e=>set('deskripsi_pesanan',e.target.value)}
  />


  {/* BUTTON */}

  <button

  onClick={handleSubmit}
  disabled={loading}

  style={{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:12,

    padding:'16px',

    borderRadius:50,

    background:'linear-gradient(135deg,#e8a598,#d4826e)',

    border:'none',

    fontWeight:700,

    fontSize:15,

    color:'#1a0f0c',

    cursor:'pointer',

    boxShadow:'0 10px 30px rgba(232,165,152,0.35)'
  }}

  >

  {loading?'Mengirim...':
  <>
  <Send size={18}/>
  Kirim Pesanan
  </>
  }

  </button>


  </div>
  </div>
  </div>

  </div>

  <Footer/>
  <WAFloat/>

  </div>

  )
}