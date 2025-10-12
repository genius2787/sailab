import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
 
export const contentType = 'image/png'
 
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          fontWeight: '900',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-8px',
          borderRadius: '20px',
          textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
          border: '4px solid white',
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

