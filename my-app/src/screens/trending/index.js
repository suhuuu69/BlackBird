import React, { useEffect, useState } from 'react';
import APIKit from '../../spotify';
import '../feed/feed.css';
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Trending() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    APIKit.get("playlists/4nqbYFYZOCospBb4miwHWy/tracks")
      .then(response => {
        console.log(response.data.items);
        setTracks(response.data.items);
      })
      .catch(error => {
        console.error("Error fetching playlist tracks:", error);
      });
  }, []);

const navigate = useNavigate();

const playTrack = (track) => {
  navigate('/player', { state: { track, tracks } });
};

return (
    <div className='feed-container'>
      <h2 className='feed-title'>Trending</h2>
      <div className="feed-body">
        {tracks?.map((item) => (
          <div className='feed-card' key={item.track.id} onClick={() => playTrack(item.track)}> 
            <img src={item.track.album.images[0].url} className='feed-image' alt='Track-Art' />
            <p className='feed-card-title'>{item.track.name}</p>
            <p className='feed-card-subtitle'>{item.track.artists[0].name}</p>
            <div className='feed-fade'>
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
