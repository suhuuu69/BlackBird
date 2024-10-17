import React from 'react';
import emptyTextImage from '../images/empty-text-image.png';
import './albumImage.css';

export default function AlbumImage({ url }) {
  const placeholderUrl = emptyTextImage;

  if (!url) {
    return (
      <div className='albumImage flex'>
        <img src={placeholderUrl} alt='album art placeholder' className='albumImage-art' />
      </div>
    );
  }

  return (
    <div className='albumImage flex'>
      <img src={url} alt='album art' className='albumImage-art' />
      <div className='albumImage-shadow'>
        <img src={url} alt='shadow' className='albumImage-shadow' />
      </div>
    </div>
  );
}
