import { continueRender, delayRender, Sequence, useVideoConfig, Audio, Img, AbsoluteFill, interpolate, spring, useCurrentFrame, staticFile } from 'remotion';
import { LiquidBackground } from './LiquidBackground';

export const MusicVisualizerH = ({ title, artist, bpm, bgColor, colors, audio, miniature }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const introZoom = spring({
    frame,
    fps,
    from: 1.2,
    to: 1,
    config: {
      damping: 200,
    },
  });

  const beat = 0.02 * Math.sin((frame - 30) * 2 * Math.PI * ((bpm / 60) / fps));
  const scale = frame < 30 ? introZoom : 1 + beat;
  const titleOpacity = interpolate(frame, [20, 40], [0, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
      <LiquidBackground bpm={bpm} bgColor={bgColor} colors={colors} />

      {/* Imagen de portada con zoom */}
      <Img
        src={staticFile(miniature)}
        style={{
          width: '500px',
          height: '500px',
          transform: `scale(${scale})`,
          borderRadius: '50%',
          objectFit: 'cover',
          boxShadow: '0 0 50px rgba(255,255,255,0.2)',
          zIndex: 1,
        }}
      />

      {/* Título de la canción */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          color: 'white',
          fontSize: 60,
          fontWeight: 'bold',
          fontFamily: 'Arial, SF Pro Text, Helvetica, sans-serif',
          opacity: titleOpacity,
          zIndex: 2,
        }}
      >
        {title}
      </div>

      {/* Artista */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          color: '#aaa',
          fontSize: 40,
          fontFamily: 'Arial, SF Pro Text, Helvetica, sans-serif',
          opacity: titleOpacity,
          zIndex: 2,
        }}
      >
        {artist}
      </div>

      {/* Audio */}
      <Audio src={staticFile(audio)} />
    </AbsoluteFill>
  );
};
