import React, { useEffect, useRef, useState, useCallback } from 'react';
import ProgressBar from './progressBar';
import Controls from './controls';
import './audioPlayer.css';

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioSrc = total[currentIndex]?.track.preview_url;

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  // Memoize handleNext using useCallback
  const handleNext = useCallback(() => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, total.length, setCurrentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, total.length, setCurrentIndex]);

  useEffect(() => {
    const startTimer = () => {
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (audioRef.current.ended) {
          handleNext();
        } else {
          setTrackProgress(audioRef.current.currentTime);
        }
      }, 1000);
    };

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error(e));
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, handleNext]);

  useEffect(() => {
    if (isReady.current) {
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play().catch(e => console.error(e));
      setTrackProgress(audioRef.current.currentTime);
      setIsPlaying(true);
    } else {
      isReady.current = true;
    }
  }, [currentIndex, audioSrc]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  return (
    <div className='player-body'>
      <div className='player-left-body'>
        <ProgressBar percentage={currentPercentage} />
      </div>
      <div className='player-right-body'>
        <div className='song-duration flex'>
          <p className='duration'>0:{addZero(Math.round(trackProgress))}</p>
          <p className='duration'>0:30</p>
        </div>
        <Controls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          handleNext={handleNext}
          handlePrev={handlePrev}
          total={total}
        />
      </div>
    </div>
  );
}
