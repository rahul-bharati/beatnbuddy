import type { NextComponentType } from "next";
import { useContext, useEffect, useState } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BsFillFileMusicFill } from "react-icons/bs";
import { AppContext } from "./../context/AppContext";
import { shortenAddress } from "./../utils/shortenAddress";

interface Props {
  play: boolean;
}

const Player: NextComponentType = () => {
  const { playerData } = useContext(AppContext);

  const [timeline, setTimeline] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioDuration, setAudioDuration] = useState<number | undefined>(0);
  const [trackAudio, setTrackAudio] = useState(false);

  useEffect(() => {
    if (playerData.soundUri !== "") {
      const audioPlayer: HTMLAudioElement | undefined = document.getElementById(
        "player"
      ) as HTMLAudioElement;
      if (audioPlayer) {
        setAudio(audioPlayer);
      }
    }
  }, []);

  useEffect(() => {
    if (playerData.soundUri !== "") {
      const audioPlayer: HTMLAudioElement | undefined = document.getElementById(
        "player"
      ) as HTMLAudioElement;
      if (audioPlayer) {
        setAudio(audioPlayer);
      }
    }
  }, [playerData]);

  const metaDataLoaded = () => {
    setAudioDuration(audio?.duration);
    setTrackAudio(true);
  };

  const onProgressUpdate = () => {
    const currentDuration = audio?.currentTime || 0;
    const duration = audio?.duration || 0;
    const percent = (currentDuration / duration) * 100;
    setTimeline(percent);
  };

  useEffect(() => {
    setInterval(() => {
      if (trackAudio) {
        onProgressUpdate();
      }
    }, 500);
    setTimeout(() => {
      if (!audio?.paused) {
        setIsPlaying(false);
      }
    });
  });

  const playPause = () => {
    isPlaying ? audio?.play() : audio?.pause();
    setIsPlaying(!isPlaying);
  };

  if (playerData.soundUri == "") {
    return <></>;
  }

  return (
    <div className="w-screen bg-black px-4 py-4 fixed bottom-0 left-0">
      <audio
        id="player"
        preload="metadata"
        src={playerData.soundUri}
        onLoadedMetadata={metaDataLoaded}
        onProgress={onProgressUpdate}
        onPlay={() => {
          setTrackAudio(true);
          setIsPlaying(true);
        }}
        onPlaying={() => {
          setTrackAudio(true);
          setIsPlaying(true);
        }}
        autoPlay
      />
      <div className="container max-w-[1200px] w-full mx-auto flex items-center flex-col sm:flex-row">
        <div className="flex items-center sm:min-w-[200px] mb-3 sm:mb-0 border-b-2 sm:border-b-0">
          <BsFillFileMusicFill className="text-3xl text-gray-100 mr-5" />
          <div className="details-container flex flex-col">
            <p className="text-gray-100 text-md font-bold">
              {playerData.title}
            </p>
            <p className="text-gray-300 text-sm">
              {shortenAddress(playerData.owner)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex items-center">
            <button className="btn p-0" onClick={playPause}>
              {isPlaying ? (
                <AiFillPlayCircle className="text-3xl text-gray-100" />
              ) : (
                <AiFillPauseCircle className="text-3xl text-gray-100" />
              )}
            </button>
          </div>
          <div className="flex items-center max-w-[300px] lg:max-w-[600px] w-full justify-center">
            <input
              type="range"
              name="timeline"
              id="timeline"
              max={100}
              value={timeline}
              step={1}
              className="w-full block mt-2"
              readOnly
              onChange={(e) => {
                setTimeline(parseInt(e.target.value));
              }}
              style={{
                background:
                  "linear-gradient(to right, #7e7e7e 0%, #7e7e7e " +
                  timeline +
                  "%, #3d3d3d " +
                  timeline +
                  "%, #3d3d3d 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
