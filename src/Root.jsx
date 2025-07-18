import { Composition } from "remotion";
import { MusicVisualizerH } from "./MusicVisualizerH";
import { MusicVisualizerV } from "./MusicVisualizerV";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot = () => {
  // npx remotion render <id> out/video.mp4
  const songData = {
    title: "ハイドレンジア feat. 歌愛ユキ",
    artist: "LonePi",
    audio: "audio.mp3",
    miniature: "miniature.jpg",
    bpm: 134,
    bgColor: "#2d2331ff",
    colors: [
      "#2d2331ff",
      "#4a2e4bff",
      "#392e49ff"
    ],
    duration: 3 * 60 + 21,
    // OPTIONAL
    // seed: 42,
    // blur: 60
  }
  return (
    <>
      <Composition
        id="MusicVisualizerH"
        component={MusicVisualizerH}
        durationInFrames={30 * songData.duration}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={songData}
      />
      <Composition
        id="MusicVisualizerV"
        component={MusicVisualizerV}
        durationInFrames={30 * songData.duration}
        fps={30}
        height={1920}
        width={1080}
        defaultProps={songData}
      />
    </>
  );
};
