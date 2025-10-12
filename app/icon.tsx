import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
 
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: '22px',
          fontWeight: '900',
          fontFamily: 'Arial Black, Arial, sans-serif',
          letterSpacing: '2px',
          textShadow: '2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000',
          WebkitTextStroke: '2px #FFFFFF',
        }}
      >
        SL
      </div>
    ),
    {
      ...size,
    }
  )
}

