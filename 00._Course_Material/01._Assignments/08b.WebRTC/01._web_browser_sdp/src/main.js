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

/**
 *  Request access to the user's camera and microphone,
 *  then set the source of the local video elemetn to the captured media steam in HTML
 */
async function init(){
  
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  document.getElementById("localVideo").srcObject = localStream;

}

/**
 * Create a new RTCPeerConnection instance and add the local media stream tracks to it.
 * Also set up the remote media stream and the onicecandidate event handler.
 * @param {string} sdpOfferTextAreaId - The ID of the textarea where the SDP offer will be displayed
 */
async function createPeerConnection(sdpOfferTextAreaId) {
  // we have access to RTC which browser sets up for us
  // This takes a parameter which is a list of STUN servers to provide the ICE candidates to send to the other peer
  peerConnection = new RTCPeerConnection(servers); // Here the integration happens manually

  // Here we set up the remote stream from the peer i.e. peer B
  remoteStream = new MediaStream();
  document.getElementById("remoteVideo").srcObject = remoteStream;


  localStream.getTracks().forEach((track) => 
    // loop through localStream tracks and add them to peer connection from the local stream
    peerConnection.addTrack(track, localStream)
);


  peerConnection.ontrack = (event) => {
    // get tracks from peerConnection and add them to the remote stream
    event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
  };

  peerConnection.onicecandidate = (event) => {
    // Here we check if the event has a candidate, then we set the candidate
    if (event.candidate) {
      document.getElementById(sdpOfferTextAreaId).textContent = JSON.stringify(peerConnection.localDescription)
    }
  };

}


async function createOffer() {
  if (!localStream) {
    return alert("Local stream is not ready");
  }

  const offer = await createPeerConnection("sdpOfferTextArea"); 

  //Tell WebRTC that a peer wants to start a connection which triggers the ICE candidates gathering process
  await peerConnection.setLocalDescription(offer); // This where the offer inilializes to make connection for themselves
}

async function createAnswer() {
  await createPeerConnection("sdpAnswerTextArea");

  let offer = document.getElementById("sdpOfferTextArea").value;
  if (!offer) return alert("Offer is required")
  offer = JSON.parse(offer);

  // Create peer connection
  await peerConnection.setRemoteDescription(offer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  document.getElementById("sdpAnswerTextArea").textContent = JSON.stringify(answer);

}

async function addAnswer() {
  let answer = document.getElementById("sdpAnswerTextArea").value;
  if (!answer) return alert("Answer is required");
  answer = JSON.parse(answer);

  if (!peerConnection.currentRemoteDescription) {
    peerConnection.setRemoteDescription(answer);
  }
}



init();
document.getElementById("createOfferButton").addEventListener("click", createOffer);
document.getElementById("createAnswerButton").addEventListener("click", createAnswer);
document.getElementById("addAnswerButton").addEventListener("click", addAnswer);