import './style.css'


let localStream;
let remoteStream;
let peerConnection;


// en list af candidater af STUN server
const servers = {
  iceServers: [
      {
          urls: ['stun:stun1.l.google.com:19302'],
      }
  ]
};