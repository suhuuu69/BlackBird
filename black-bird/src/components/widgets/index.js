import React, { useState, useEffect } from "react";
import "./widgets.css";
import apiClient from "../../spotify";
import WidgetCard from "./widgetCard";

export default function Widgets({ artistID }) {
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    if (artistID) {
      apiClient
        .get(`/browse/new-releases`)
        .then((res) => {
          const a = res.data?.albums.items.slice(0, 3);
          setNewRelease(a);
        })
        .catch((err) => console.error(err));
    }
  }, [artistID]);

  return (
    <div className="widgets-body flex">
      <WidgetCard title="New Releases" newRelease={newRelease}/>
    </div>
  );
}