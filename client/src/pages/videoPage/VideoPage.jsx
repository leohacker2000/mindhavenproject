import React, { useState } from 'react';
import "./videoPage.css";
import Topabar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar"





const VideosPage = () => {



  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Managing Exam Stress",
      description: "Learn techniques to manage stress during exam periods",
      thumbnail: "assets/videos/thumbnails/tp1.jpg",
      videoUrl: "assets/videos/v1.mp4",
      duration: "2:31",
      
    },
    {
      id: 2,
      title: "Mindfulness Meditation",
      description: "A guided meditation session for beginners",
      thumbnail: "assets/videos/thumbnails/tp2.jpg",
      videoUrl: "assets/videos/v2.mp4",
      duration: "4:50"
    },
    {
      id: 3,
      title: "Healthy Sleep Habits",
      description: "Tips for better sleep and improved mental health",
      thumbnail: "assets/videos/thumbnails/tp3.jpg",
      videoUrl: "assets/videos/v3.mp4",
      duration: "3:28"
    },
    {
      id: 4,
      title: "Anxiety Coping Strategies",
      description: "Practical strategies to cope with anxiety in daily life",
      thumbnail: "assets/videos/thumbnails/tp4.jpg",
      videoUrl: "assets/videos/v4",
      duration: "15:15"
    },
    {
      id: 5,
      title: "Building Resilience",
      description: "How to build mental resilience as a student",
      thumbnail: "assets/videos/thumbnails/tp5.jpg",
      videoUrl: "assets/videos/v5.mp4",
      duration: "15:15"
    },
    {
      id: 6,
      title: "Social Connection",
      description: "The importance of social connections for mental health",
      thumbnail: "assets/videos/thumbnails/tp6.jpg",
      videoUrl: "assets/videos/v6.mp4",
      duration: "4:47"
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
<>
    <Topabar />
    <Sidebar />

    <div className="videos-container">
      <div className="videos-header">
        <h1>Mental Health Vidos</h1>
        <p>Watch our collection of videos on mental health and wellbeing for students</p>
      </div>

      <div className="videos-grid">
        {videos.map((video) => (
          <div className="video-card" key={video.id} onClick={() => openVideo(video)}>
            <div className="thumbnail-container">
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
              <div className="duration-badge">{video.duration}</div>
              <div className="play-icon">
                <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeVideo}>×</button>
            <h2>{selectedVideo.title}</h2>
            <video controls autoPlay className="video-player">
              <source src={selectedVideo.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="video-description">{selectedVideo.description}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
  
};

export default VideosPage;