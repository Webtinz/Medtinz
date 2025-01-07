// Configuration de l'application Agora
// In this script fil, the call is ended only when the last user Left
const APP_ID = "0ed9e0b3cb1b4f5c94cc0635013be32c"

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

let localTracks = []
let remoteUsers = {}
let currentChannel = ''
let mediaRecorder
let recordedChunks = []

// Vérifie s'il y a un nom de chaîne dans l'URL lors du chargement de la page
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const channelName = urlParams.get('channel');
    if (channelName) {
        document.getElementById('channel-input').value = channelName;
        joinAndDisplayLocalStream(channelName);
    }
}

let joinAndDisplayLocalStream = async (channelName) => {
    currentChannel = channelName

    // Générer et afficher un lien partageable
    const shareLink = generateShareableLink(channelName, 'join-call')
    document.getElementById('share-link').value = shareLink
    document.getElementById('share-details').style.display = 'block'

    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)

    try {
        let UID = await client.join(APP_ID, channelName, null, null)

        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

        let player = `<div class="video-container" id="user-container-${UID}">
                            <div class="video-player" id="user-${UID}"></div>
                      </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        localTracks[1].play(`user-${UID}`)

        await client.publish([localTracks[0], localTracks[1]])

        document.getElementById('setup-form').style.display = 'none'
        document.getElementById('stream-wrapper').style.display = 'block'
    } catch (error) {
        console.error(error)
        alert('Error joining call. Please try again.')
    }
}


// let generateShareableLink = (channelName) => {
//     const currentURL = new URL(window.location.href)
//     currentURL.searchParams.set('channel', channelName)
//     return currentURL.href
// } 

let generateShareableLink = (channelName, customPath = '') => {
    // Récupère la base de l'URL (protocole + domaine)
    const currentURL = new URL(window.location.href);
    const baseURL = `${currentURL.origin}/`; // Exemple : http://example.com/

    // Construit l'URL complète avec le chemin personnalisé
    const newURL = new URL(customPath, baseURL);

    // Ajoute le paramètre de requête "channel"
    newURL.searchParams.set('channel', channelName);

    return newURL.href; // Retourne l'URL finale
};

// // Exemple d'utilisation
// let shareableLink = generateShareableLink('myChannel', 'new-page');
// console.log(shareableLink); // http://example.com/new-page?channel=myChannel


let copyShareLink = async () => {
    const shareLinkInput = document.getElementById('share-link')
    try {
        await navigator.clipboard.writeText(shareLinkInput.value)
        const copyBtn = document.getElementById('copy-btn')
        copyBtn.textContent = 'Copied!'
        setTimeout(() => {
            copyBtn.textContent = 'Copy Link'
        }, 2000)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user 
    await client.subscribe(user, mediaType)

    if (mediaType === 'video') {
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null) {
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`)
    }

    if (mediaType === 'audio') {
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for (let i = 0; localTracks.length > i; i++) {
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()

    document.getElementById('setup-form').style.display = 'block'
    document.getElementById('stream-wrapper').style.display = 'none'
    document.getElementById('video-streams').innerHTML = ''
    document.getElementById('channel-input').value = ''
    document.getElementById('share-details').style.display = 'none'

    // Supprimer les paramètres de l'URL
    window.history.replaceState({}, document.title, window.location.pathname)
}

let toggleMic = async (e) => {
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false)
        e.target.innerText = 'Mic Off'
        e.target.style.backgroundColor = 'cadetblue'
    } else {
        await localTracks[0].setMuted(true)
        e.target.innerText = 'Mic On'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

let toggleCamera = async (e) => {
    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false)
        e.target.innerText = 'Camera off'
        e.target.style.backgroundColor = 'cadetblue'
    } else {
        await localTracks[1].setMuted(true)
        e.target.innerText = 'Camera on'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

// Fonctionnalités d'enregistrement
const startRecording = () => {
    const allTracks = [];

    // Ajouter les flux vidéo et audio locaux
    if (localTracks[1]) allTracks.push(localTracks[1].getMediaStreamTrack());
    if (localTracks[0]) allTracks.push(localTracks[0].getMediaStreamTrack());

    // Ajouter les flux des utilisateurs distants visibles
    for (const uid in remoteUsers) {
        const user = remoteUsers[uid];
        if (user.videoTrack) {
            allTracks.push(user.videoTrack.getMediaStreamTrack());
        }
        if (user.audioTrack) {
            allTracks.push(user.audioTrack.getMediaStreamTrack());
        }
    }

    const stream = new MediaStream(allTracks);
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${currentChannel}-${new Date().toISOString()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        recordedChunks = [];
    };

    mediaRecorder.start();
    console.log("Recording started");
};

const stopRecording = () => {
    if (mediaRecorder) {
        mediaRecorder.stop();
        console.log("Recording stopped");
    }
};

document.getElementById('create-btn').addEventListener('click', async () => {
    const channelName = document.getElementById('channel-input').value.trim()
    if (channelName) {
        await joinAndDisplayLocalStream(channelName)
    } else {
        alert('Please enter a call name')
    }
})
document.getElementById('copy-btn').addEventListener('click', copyShareLink)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('record-btn').addEventListener('click', (e) => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        stopRecording();
        e.target.innerText = 'Start Recording';
        e.target.style.backgroundColor = 'cadetblue';
    } else {
        startRecording();
        e.target.innerText = 'Stop Recording';
        e.target.style.backgroundColor = '#EE4B2B';
    }
});
