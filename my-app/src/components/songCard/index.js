import React from 'react';
import '../songCard/songCard.css';
import AlbumImage from './albumImage';
import AlbumInfo from './albumInfo';
import AudioPlayer from '../audioPlayer';

export default function SongCard({album, currentTrack, total, currentIndex, setCurrentIndex}) {
  return (
    <div className='parent-container flex'>
      <div className='songCard-body flex'>
        <AlbumImage url={album?.images[0]?.url}/>
        <AlbumInfo album={album} currentTrack={currentTrack}/>
        <AudioPlayer 
          currentTrack={currentTrack} 
          total={total} 
          currentIndex={currentIndex} 
          setCurrentIndex={setCurrentIndex} 
        />

      </div>
   </div>

  )
}
