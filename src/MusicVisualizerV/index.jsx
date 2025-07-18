import {  useVideoConfig, Audio, Img, AbsoluteFill, interpolate, spring, useCurrentFrame, staticFile } from 'remotion';
import { LiquidBackground } from './LiquidBackground';

export const MusicVisualizerV = ({ title, artist, bpm, bgColor, colors, audio, miniature}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Animación de entrada (zoom de 1.2 a 1 en los primeros 30 frames)
  const introZoom = spring({
    frame,
    fps,
    from: 1.2,
    to: 1,
    config: {
      damping: 200,
    },
  });

  // Efecto de "beat" (a partir del frame 30 en adelante)
  const beat = 0.02 * Math.sin((frame - 30) * 2 * Math.PI * ((bpm / 60) / fps)); 

  // Escala combinada: entrada + beat
  const scale = frame < 30 ? introZoom : 1 + beat;

  // Opacidad para los textos
  const titleOpacity = interpolate(frame, [20, 40], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center' }}>
      <LiquidBackground bpm={bpm} bgColor={bgColor} colors={colors} />
      
      <Img
        src={staticFile(miniature)}
        style={{
          width: '600px',
          height: '600px',
          transform: `scale(${scale})`,
          borderRadius: '50%',
          objectFit: 'cover',
          boxShadow: '0 0 50px rgba(255,255,255,0.2)',
          zIndex: 1000,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 525,
          color: 'white',
          fontSize: 65,
          fontWeight: 'bold',
          fontFamily: 'Arial, SF Pro Text, Helvetica, sans-serif',
          opacity: titleOpacity,
          zIndex: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 450,
          color: '#aaa',
          fontSize: 50,
          fontFamily: 'Arial, SF Pro Text, Helvetica, sans-serif',
          opacity: titleOpacity,
          zIndex: 1000,
        }}
      >
        {artist}
      </div>
      <Audio src={staticFile(audio)} />
    </AbsoluteFill>
  );
};

