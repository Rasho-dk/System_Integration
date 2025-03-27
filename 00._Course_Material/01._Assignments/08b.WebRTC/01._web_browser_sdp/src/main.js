import './style.css'


let localStream;
let remoteStream;
let peerConnection;


// en list af candidater
const servers = {
  iceServers: [
      {
          urls: ['stun:stun1.l.google.com:19302'],
      }
  ]
};