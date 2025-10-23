import React from "react";
import YouTube from "react-youtube";
import './VideoModal.css'

const VideoModal = ({trailerId, closeModal}) =>{
    const opts = {
        height: '480',
        width: '800',
        playerVars:{
            autoplay: 1,
        },
    };
    return(
        <div className="video-modal-overlay" onClick={closeModal}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>×</button>
        <YouTube videoId={trailerId} opts={opts} />
      </div>
    </div>
    );
};
export default VideoModal;