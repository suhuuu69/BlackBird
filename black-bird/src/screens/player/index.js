import React, { useEffect, useState } from 'react';
import '../player/player.css';
import { useLocation } from 'react-router-dom';
import APIKit from '../../spotify';
import SongCard from '../../components/songCard';
import RightSidebar from '../../components/rightSidebar';

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      if (location.state.id) {
        APIKit.get(`playlists/${location.state.id}/tracks`)
          .then(res => {
            setTracks(res.data.items);
            setCurrentIndex(0); 
            setCurrentTrack(res.data.items[0].track);
          })
          .catch(error => console.error('Error fetching playlist tracks:', error));
      } else if (location.state.tracks) {
        setTracks(location.state.tracks);
        const clickedIndex = location.state.tracks.findIndex(item => item.track.id === location.state.track.id);
        setCurrentIndex(clickedIndex);
        setCurrentTrack(location.state.track);
      }
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="right-player-body">
        <SongCard 
          album={currentTrack?.album} 
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex} 
        />
        <RightSidebar tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
