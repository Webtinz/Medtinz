import React, { useEffect, useState } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import { Video, Mic, PhoneOff } from 'lucide-react';
import { generateMeetingCode, generateMeetingLink, extractMeetingCode } from '../utils/meetingUtils';

import api from '../service/caller';
import { ToastContainer, toast } from 'react-toastify';

const APP_ID = '0ed9e0b3cb1b4f5c94cc0635013be32c';

export const VideoRoom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState(null);
  const [audioTrack, setAudioTrack] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const [UserData, setUserData] = useState([]);  

  useEffect(() => {
    const fetchLoggedUserData = async () => {
      try {
        const response = await api.get('api/usersprofile');

        setUserData(response.data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchLoggedUserData();
  }, []);

  useEffect(() => {
    // Extract channel code
    const extractedChannel = extractMeetingCode();
    
    if (extractedChannel) {
      // Set channel and stop loading
      setChannel(extractedChannel);
      setIsLoading(false);
    } else {
      // No channel found, remain in loading state
      setIsLoading(true);
      return;
    }
  }, []);

  useEffect(() => {
    // Only run Agora initialization if channel exists
    if (!channel) return;

    AgoraRTC.setLogLevel(4);

    const createAgoraClient = ({ onVideoTrack, onUserDisconnected, setUsers }) => {
      const agoraClient = createClient({
        mode: 'rtc',
        codec: 'vp8',
      });

      let tracks;

      const connect = async () => {
        try {
          const uid = await agoraClient.join(APP_ID, channel, null, null);
          console.log('Connected with UID:', uid);
          console.log('Connected in the channel:', channel);

          tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

          agoraClient.on('user-published', async (user, mediaType) => {
            try {
              await agoraClient.subscribe(user, mediaType);
              if (mediaType === 'video') {
                onVideoTrack(user);
              }
              if (mediaType === 'audio') {
                user.audioTrack?.play();
              }
            } catch (error) {
              console.error('Error subscribing to user:', error);
            }
          });

          agoraClient.on('user-unpublished', (user, mediaType) => {
            console.log('User unpublished:', user.uid, mediaType);
            setUsers(prev => prev.filter(u => u.uid !== user.uid));
          });

          agoraClient.on('user-left', (user) => {
            console.log('User left:', user.uid);
            setUsers(prev => prev.filter(u => u.uid !== user.uid));
          });

          await agoraClient.publish(tracks);
          console.log('Local tracks published');

          return { tracks, uid };
        } catch (error) {
          console.error('Connection error:', error);
          throw error;
        }
      };

      const disconnect = async () => {
        try {
          agoraClient.removeAllListeners();
          if (tracks) {
            tracks.forEach(track => {
              track.stop();
              track.close();
            });
            await agoraClient.unpublish(tracks);
          }
          await agoraClient.leave();
          console.log('Disconnected successfully');
        } catch (error) {
          console.error('Disconnect error:', error);
        }
      };

      return { connect, disconnect, client: agoraClient };
    };

    let mounted = true;
    
    const handleVideoTrack = (user) => {
      if (user.videoTrack) {
        setUsers(prev => {
          const existingUser = prev.find(u => u.uid === user.uid);
          if (!existingUser) {
            return [...prev, user];
          }
          return prev.map(u => (u.uid === user.uid ? user : u));
        });
      } else {
        console.warn(`User ${user.uid} has no video track.`);
      }
    };

    const handleUserDisconnected = (user) => {
      if (!mounted) return;
      setUsers(previousUsers => previousUsers.filter(u => u.uid !== user.uid));
    };

    const agoraClient = createAgoraClient({
      onVideoTrack: handleVideoTrack,
      onUserDisconnected: handleUserDisconnected,
      setUsers,
    });
    
    setClient(agoraClient);

    const initialize = async () => {
      try {
        const { tracks, uid } = await agoraClient.connect();
        if (!mounted) return;
    
        setUid(uid);
        setAudioTrack(tracks[0]);
        setVideoTrack(tracks[1]);
    
        // Add local user
        setUsers(prev => [
          ...prev,
          {
            uid,
            audioTrack: tracks[0],
            videoTrack: tracks[1],
          },
        ]);
    
        // Add remote users already connected
        const remoteUsers = agoraClient.client.remoteUsers;
        setUsers(prev => [
          ...prev,
          ...remoteUsers.map(user => ({
            uid: user.uid,
            audioTrack: user.audioTrack,
            videoTrack: user.videoTrack,
          })),
        ]);
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initialize();

    return () => {
      mounted = false;
      if (agoraClient) {
        agoraClient.disconnect().catch(console.error);
      }
    };
  }, [channel]); // Dependency added to react to channel changes

  const toggleAudio = async () => {
    if (audioTrack) {
      try {
        await audioTrack.setMuted(!isAudioMuted);
        setIsAudioMuted(!isAudioMuted);
      } catch (error) {
        console.error('Error toggling audio:', error);
      }
    }
  };

  const toggleVideo = async () => {
    if (videoTrack) {
      try {
        await videoTrack.setMuted(!isVideoMuted);
        setIsVideoMuted(!isVideoMuted);
      } catch (error) {
        console.error('Error toggling video:', error);
      }
    }
  };

  const endCall = async () => {
    if (client) {
      await client.disconnect();
      setUsers([]);
      setUid(null);
      setAudioTrack(null);
      setVideoTrack(null);
      setIsAudioMuted(false);
      setIsVideoMuted(false);
      
      // Redirection vers l'URL sans le paramètre ?channel
      const url = new URL(window.location.href);
      url.searchParams.delete('channel');
      window.location.href = url.pathname; // Redirige vers l'URL sans paramètres
    }
  };

  if (isLoading) {
    return <div>Waiting for meeting code...</div>;
  }

  return (
    <div>
      <div className="video-grid">
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} currentUid={uid} connectedUser={UserData}/>
        ))}
        
      </div>
      <TeleControls 
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        hasAudio={!isAudioMuted}
        hasVideo={!isVideoMuted}
        onEndCall={endCall}
      />
    </div>
  );
};

// TeleControls component remains the same
const TeleControls = ({ onToggleAudio, onToggleVideo, hasAudio, hasVideo, onEndCall }) => {
  return (
    <div className="controls">
      <button className="control-btn end-call" onClick={onEndCall}>
        <PhoneOff />
      </button>
      <button 
        className={`control-btn ${!hasAudio ? 'disabled' : 'active'}`} 
        onClick={onToggleAudio}
      >
        <Mic />
      </button>
      <button 
        className={`control-btn ${!hasVideo ? 'disabled' : 'active'}`} 
        onClick={onToggleVideo}
      >
        <Video />
      </button>
    </div>
  );
};