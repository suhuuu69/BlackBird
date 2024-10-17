import React, { useEffect, useState } from 'react';
import APIKit from '../../spotify';
import './feed.css';
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Feed() {
  const [featuredTracks, setFeaturedTracks] = useState([]);
  const [bollywoodTracks, setBollywoodTracks] = useState([]);
  const [tiktokTracks, setTiktoktracks] = useState([]);

  useEffect(() => {
    // Fetch Featured Tracks
    APIKit.get("playlists/4nqbYFYZOCospBb4miwHWy/tracks")
      .then(response => {
        const limitedTracks = response.data.items.slice(0, 12); // Limit to 12 tracks
        setFeaturedTracks(limitedTracks);
      })
      .catch(error => {
        console.error("Error fetching featured playlist tracks:", error);
      });

    // Fetch Bollywood Hits
    APIKit.get("playlists/0udjmvwKO4SQcXzVL9Kv1m/tracks")
      .then(response => {
        const limitedTracks = response.data.items.slice(0, 12); // Limit to 12 tracks
        setBollywoodTracks(limitedTracks);
      })
      .catch(error => {
        console.error("Error fetching Bollywood Hits playlist tracks:", error);
      });

      //Fetch TikTok Hits
      APIKit.get("playlists/1H3AmBXPtLgPOwwf1WvUYb/tracks")
      .then(response => {
        const limitedTracks = response.data.items.slice(0, 12); // Limit to 12 tracks
        setTiktoktracks(limitedTracks);
      })
      .catch(error => {
        console.error("Error fetching Bollywood Hits playlist tracks:", error);
      });


  }, []);




  const navigate = useNavigate();

  const playTrack = (track, tracks) => {
    navigate('/player', { state: { track, tracks } });
  };

  return (
    <div className='feed-container'>
      <div className='feed-items'>

      <div className='featured-track'>
          <h2 className='feed-title'>Bollywood Hits</h2>
          <div className="feed-body">
            {bollywoodTracks?.map((item) => (
              <div className='feed-card' key={item.track.id} onClick={() => playTrack(item.track, bollywoodTracks)}> 
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

        <div className='featured-track'>
          <h2 className='feed-title'>TikTok Songs</h2>
          <div className="feed-body">
            {tiktokTracks?.map((item) => (
              <div className='feed-card' key={item.track.id} onClick={() => playTrack(item.track, tiktokTracks)}> 
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

        <div className='featured-track'>
          <h2 className='feed-title'>Featured Tracks</h2>
          <div className="feed-body">
            {featuredTracks?.map((item) => (
              <div className='feed-card' key={item.track.id} onClick={() => playTrack(item.track, featuredTracks)}> 
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

      </div>
    </div>
  );
}
