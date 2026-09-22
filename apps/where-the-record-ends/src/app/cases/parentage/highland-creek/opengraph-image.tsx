import { ImageResponse } from 'next/og';

export const alt =
  'The Thousand Acres on Highland Creek — an open evidence-led parentage investigation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function HighlandCreekOpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        background: '#f4efe7',
        color: '#2b211b',
        padding: '58px 68px',
        fontFamily: 'Georgia, serif',
        backgroundImage:
          'radial-gradient(circle at 88% 12%, rgba(152,83,56,0.2), transparent 34%), linear-gradient(135deg, transparent 70%, rgba(104,113,90,0.1))',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Arial, sans-serif',
          fontSize: 17,
          letterSpacing: 3.5,
          textTransform: 'uppercase',
          color: '#985338',
        }}
      >
        <span>Open parentage investigation</span>
        <span style={{ color: 'rgba(43,33,27,0.52)' }}>
          Evidence-led · Unresolved
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            maxWidth: 980,
            fontSize: 78,
            lineHeight: 0.98,
            letterSpacing: -2.5,
          }}
        >
          The Thousand Acres on Highland Creek
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 25,
            maxWidth: 920,
            fontFamily: 'Arial, sans-serif',
            fontSize: 24,
            lineHeight: 1.42,
            color: 'rgba(43,33,27,0.67)',
          }}
        >
          Inheritance records place Benjamin Meason inside a family network.
          They still do not name his parents.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
          fontSize: 18,
          letterSpacing: 1.2,
          color: 'rgba(43,33,27,0.55)',
        }}
      >
        Where the Record Ends
      </div>
    </div>,
    size
  );
}
