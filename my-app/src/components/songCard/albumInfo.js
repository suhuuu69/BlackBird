import React from 'react';
import './albumInfo.css';

export default function AlbumInfo({ album, currentTrack }) {
  const artists = album?.artists?.map((artist) => artist.name).join(", ");

  if (!album || !currentTrack) {
    return (
      <div className="albumInfo-card">
        <div className="albumName-container">
          <div className="marquee">
            <p>NO SONGS</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="marquee">
          <p>{currentTrack.name}</p>
        </div>
        <div className="artist-name">
          <p>{artists}</p>
        </div>
      </div>
      <div className="album-release flex">
        <p>Release Date: {album.release_date}</p>
      </div>
    </div>
  );
}
