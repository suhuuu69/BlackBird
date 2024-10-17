import React from 'react';
import './progressBar.css';

export default function ProgressBar({ percentage }) {
  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}
