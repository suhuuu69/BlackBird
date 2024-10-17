import React, { useEffect, useState } from 'react';
import APIKit from '../../spotify';
import '../library/library.css';
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    APIKit.get("me/tracks")
      .then(response => {
        console.log(response.data.items);
        setTracks(response.data.items);
      })
      .catch(error => {
        console.error("Error fetching favorite tracks:", error);
      });
  }, []);

  const navigate = useNavigate();

  const playTrack = (track) => {
    navigate('/player', { state: { track, tracks } });
  };

  return (
    <div className='screen-container'>
      <div className="library-body">
        {tracks?.map((item) => (
          <div className='playlist-card' key={item.track.id} onClick={() => playTrack(item.track)}> 
            <img src={item.track.album.images[0].url} className='playlist-image' alt='Track-Art' />
            <p className='playlist-title'>{item.track.name}</p>
            <p className='playlist-subtitle'>{item.track.artists[0].name}</p>
            <div className='playlist-fade'>
              <IconContext.Provider value={{ size: "50px", color: "#FFFFFF" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
