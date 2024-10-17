import React, { useState } from 'react';
import './rightSidebar.css';
import { FaArrowLeft, FaArrowRight, FaMusic } from "react-icons/fa";
import { IconContext } from 'react-icons';

export default function RightSidebar({ tracks, setCurrentIndex }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`right-sidebar-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="right-sidebar-container">
        <div className="right-sidebar-content">
          <h2>Up Next</h2>
          {tracks?.length ? (
            tracks.map((track, index) => (
              <div
                className="queue-item"
                key={index}
                onClick={() => setCurrentIndex(index)}
              >
                <IconContext.Provider value={{ size: "15px", color: "#FFFFFF" }}>
                  <FaMusic />
                </IconContext.Provider>
                <p className="track-name">{track?.track?.name}</p>
              </div>
            ))
          ) : (
            <p>No tracks available</p>
          )}
        </div>
      </div>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FaArrowRight /> : <FaArrowLeft />}
      </div>
    </div>
  );
}
