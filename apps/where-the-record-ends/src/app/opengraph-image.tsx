import { ImageResponse } from 'next/og';

export const alt = 'Where the Record Ends — an active family history';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#f4efe7',
        color: '#2b211b',
        padding: '68px 76px',
        fontFamily: 'Georgia, serif',
        backgroundImage:
          'radial-gradient(circle at 80% 10%, rgba(152,83,56,0.22), transparent 38%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
          fontSize: 18,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: '#985338',
        }}
      >
        An active family history
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 94, lineHeight: 0.92 }}>
          Where the Record Ends
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            maxWidth: 780,
            fontFamily: 'Arial, sans-serif',
            fontSize: 25,
            lineHeight: 1.4,
            color: 'rgba(43,33,27,0.65)',
          }}
        >
          What the records establish. What the evidence suggests. What remains
          unknown.
        </div>
      </div>
    </div>,
    size
  );
}
