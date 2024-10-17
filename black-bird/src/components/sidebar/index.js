import React, { useEffect, useState } from 'react';
import './sidebar.css';
import SidebarButton from './sidebarButton';
import { MdFavorite, MdSpaceDashboard } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import apiClient from '../../spotify';

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );

  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  const handleProfileClick = () => {
    window.location.href = REACT_APP_SPOTIFY_REDIRECT_URI;
  };

  const handleSignOut = () => {
    // Clear token from localStorage
    window.localStorage.removeItem('token');
    // Reload the page to reflect sign-out state
    window.location.reload();
  };
  
  return (
    <div className='sidebar-container'>
      <a href="/feed" onClick={handleProfileClick}>
        <img src={image} className='profile-img' alt='profile' />
      </a>

      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
        <SidebarButton title="Library" to="/library" icon={<IoLibrary />} />
      </div>

      <div className="sidebar-footer">
        <button className="sign-out-button" onClick={handleSignOut}>
          <FaSignOutAlt style={{ fontSize: '25px', marginLeft: '5px', marginBottom: '5px' }} />
          <span className='button-title'>Sign Out</span>
        </button>
      </div>      
    </div>
  );
}
