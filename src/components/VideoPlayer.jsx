import React, {
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

export const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    if (user && user.videoTrack) {
      user.videoTrack.play(ref.current);
    }
    return () => {
      if (user && user.videoTrack) {
        user.videoTrack.stop();
      }
    };
  }, [user.videoTrack]); // Ajouter la dépendance

  return (
    <div className="video-item">
      <div
        ref={ref}
        className="video-frame"
      ></div>
      <div className="participant-tag">
         User Id : {user.uid}
      </div>
    </div>
  );
};
