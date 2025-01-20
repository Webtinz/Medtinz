import React, { useEffect, useState } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import { Video, Mic, PhoneOff } from 'lucide-react';
import { generateMeetingCode, generateMeetingLink, extractMeetingCode } from '../utils/meetingUtils';

const APP_ID = '0ed9e0b3cb1b4f5c94cc0635013be32c';
const CHANNEL = extractMeetingCode() || generateMeetingCode();

AgoraRTC.setLogLevel(4);

const createAgoraClient = ({ onVideoTrack, onUserDisconnected }) => {
  const client = createClient({
    mode: 'rtc',
    codec: 'vp8',
  });

  let tracks;

  const connect = async () => {
    try {
      const uid = await client.join(APP_ID, CHANNEL, null, null);
      console.log('Connected with UID:', uid);

      tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

      client.on('user-published', async (user, mediaType) => {
        try {
          console.log('User published:', user.uid, mediaType);
          await client.subscribe(user, mediaType);
          
          if (mediaType === 'video') {
            onVideoTrack(user);
          }
          if (mediaType === 'audio') {
            user.audioTrack?.play();
          }
        } catch (error) {
          console.error('Subscribe error:', error);
          setTimeout(() => client.subscribe(user, mediaType), 1000);
        }
      });

      client.on('user-left', (user) => {
        console.log('User left:', user.uid);
        onUserDisconnected(user);
      });

      await client.publish(tracks);
      console.log('Local tracks published');

      return {
        tracks,
        uid,
      };
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  };

  const disconnect = async () => {
    try {
      client.removeAllListeners();
      if (tracks) {
        tracks.forEach(track => {
          track.stop();
          track.close();
        });
        await client.unpublish(tracks);
      }
      await client.leave();
      console.log('Disconnected successfully');
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  return {
    connect,
    disconnect,
    client,
  };
};

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState(null);
  const [audioTrack, setAudioTrack] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [client, setClient] = useState(null);

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
    }
  };

  useEffect(() => {
    let mounted = true;

    const handleVideoTrack = (user) => {
      if (!mounted) return;
      
      setUsers(previousUsers => {
        const existingUser = previousUsers.find(u => u.uid === user.uid);
        if (!existingUser) {
          return [...previousUsers, user];
        }
        return previousUsers.map(u => u.uid === user.uid ? user : u);
      });
    };

    const handleUserDisconnected = (user) => {
      if (!mounted) return;
      setUsers(previousUsers => previousUsers.filter(u => u.uid !== user.uid));
    };

    const agoraClient = createAgoraClient({
      onVideoTrack: handleVideoTrack,
      onUserDisconnected: handleUserDisconnected,
    });

    setClient(agoraClient);

    const initialize = async () => {
      try {
        const { tracks, uid } = await agoraClient.connect();
        if (!mounted) return;

        setUid(uid);
        setAudioTrack(tracks[0]);
        setVideoTrack(tracks[1]);
        setUsers(prev => [
          ...prev,
          {
            uid,
            audioTrack: tracks[0],
            videoTrack: tracks[1],
          },
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
  }, []);

  return (
    <div>
      <div className="video-grid">
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} currentUid={uid} />
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