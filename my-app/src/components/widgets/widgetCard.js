import React from 'react';
import './widgetCard.css';
import WidgetEntry from './widgetEntry';

export default function WidgetCard({ title, newRelease}) {
    console.log(newRelease);
  return (
    <div className='widgetcard-body'>
      <p className='widget-title'>{title}</p>
      <div className="widget-entries">
        {newRelease
          ? newRelease.map((album, index) => (
            
              <WidgetEntry
                title={album?.name}
                subtitle={album?.artists[0]?.name}
                image={album?.images[2]?.url}
                index={index}
              />
            ))
          : null}
      </div>
    </div>
  );
}
