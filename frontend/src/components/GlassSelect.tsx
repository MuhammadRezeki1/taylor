'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface Props{
  value:string
  onChange:(v:string)=>void
  options:string[]
  placeholder?:string
}

export default function GlassSelect({
  value,
  onChange,
  options,
  placeholder='Pilih layanan'
}:Props){

  const [open,setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=>{

    const handleClick = (e:any)=>{
      if(ref.current && !ref.current.contains(e.target)){
        setOpen(false)
      }
    }

    window.addEventListener('click',handleClick)
    return ()=>window.removeEventListener('click',handleClick)

  },[])

  return(

  <div ref={ref} style={{position:'relative'}}>

    {/* SELECT BOX */}

    <div
    onClick={()=>setOpen(!open)}
    className="glass-input"
    style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      cursor:'pointer'
    }}
    >

      <span style={{
        color:value ? '#f5ede8' : 'rgba(245,237,232,0.45)'
      }}>
        {value || placeholder}
      </span>

      <ChevronDown
      size={18}
      style={{
        transform:open?'rotate(180deg)':'rotate(0deg)',
        transition:'all .2s'
      }}
      />

    </div>


    {/* DROPDOWN */}

    {open && (

    <div style={{

      position:'absolute',
      left:0,
      right:0,
      top:'calc(100% + 6px)',

      borderRadius:14,

      background:'rgba(20,16,40,0.85)',
      backdropFilter:'blur(18px)',

      border:'1px solid rgba(255,255,255,0.12)',

      boxShadow:'0 20px 60px rgba(0,0,0,0.45)',

      overflow:'hidden',

      zIndex:50

    }}>

    {options.map(opt=>(

      <div
      key={opt}
      onClick={()=>{
        onChange(opt)
        setOpen(false)
      }}
      style={{

        padding:'12px 16px',
        cursor:'pointer',
        fontSize:14,
        color:'#f5ede8',

        borderBottom:'1px solid rgba(255,255,255,0.05)',

        transition:'all .15s'

      }}

      onMouseEnter={(e)=>
        (e.currentTarget.style.background='rgba(255,255,255,0.06)')
      }

      onMouseLeave={(e)=>
        (e.currentTarget.style.background='transparent')
      }

      >

      {opt}

      </div>

    ))}

    </div>

    )}

  </div>

  )
}