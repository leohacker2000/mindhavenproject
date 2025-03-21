import React, { useState } from "react";
import "./sidebar.css";
import {
  Event,
  Person2Outlined,
  ContactPageOutlined,
  FeedOutlined,
  ChatOutlined,
  PlayCircleOutlined,
  Menu
} from "@mui/icons-material";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import {useNavigate} from "react-router-dom"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleMentaltestRedirect = () => {
    navigate("/mentaltest");
  };
  
  const handleAboutusRedirect = () => {
    navigate("/aboutus");
  };
  const handleVideosRedirect = () => {
    navigate("/videos");
  };
  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <button className="menuButton" onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebarWrapper">
          <button className="closeButton" onClick={() => setIsOpen(false)}>
            ✖
          </button>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <FeedOutlined className="sidebarIcon" />
              <span className="sidebarListItemText" onClick={handleHomeRedirect}>Feed</span>
            </li>
            <li className="sidebarListItem">
              <ChatOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
              <PlayCircleOutlined className="sidebarIcon" />
              <span className="sidebarListItemText" onClick={handleVideosRedirect}>Videos</span>
            </li>
            <li className="sidebarListItem">
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Event</span>
            </li>
            <li className="sidebarListItem">
              <Person2Outlined className="sidebarIcon" />
              <span className="sidebarListItemText" onClick={handleAboutusRedirect}>About Us</span>
            </li>
                
              
            <li className="sidebarListItem">
              <ContactPageOutlined className="sidebarIcon"/>
              <span className="sidebarListItemText" onClick={handleMentaltestRedirect}>Test</span>
            </li>
          


         </ul>
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
            {Users.map((u) => (
              <CloseFriend key={u._id} user={u} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
