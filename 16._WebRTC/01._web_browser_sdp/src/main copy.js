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

async function init(){
    // fra min egen webbrowser camera
    localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    });
    document.getElementById("localVideo").srcObject = localStream;

}

// her laver vi en peer connection
// async function creeatePeerConnection(){


//     remoteStream = new MediaStream();
//     document.getElementById("remoteVideo").srcObject = remoteStream;

//     // vi tilføjer stream til peer connection
//     localStream.getTracks().forEach(track => {
//         // loop gennem tracks og tilføj dem til peer connection
//         peerConnection.addTrack(track, localStream);
//     });
    
//     // listen to remote tracks from the peer
//     peerConnection.ontrack = (event) => {
//         event.streams[0].getTracks().forEach((track) => 
//             remoteStream.addTrack(track));
//     };
    
//     peerConnection.onicecandidate = (event) => {
//         if(event.candidate){
//             document.getElementById("sdpOfferTextArea").t
//         }
//     }



//     // console.log(localStream.getTracks());

// }
async function createPeerConnection(sdpOfferTextArea) {
    // vi har adgagn til RTC som browser adstiller for us
    // denne tager param som er en liste af servere som er stun server
    peerConnection = new  RTCPeerConnection(servers); // det er her integration forgår manualt   

    remoteStream = new MediaStream();
    document.getElementById("remoteVideo").srcObject = remoteStream;
  
  
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
  
    // listen to remote tracks from the peer
    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
    };
  
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        document.getElementById(sdpOfferTextArea).textContent = JSON.stringify(peerConnection.localDescription)
      }
    };
  
  }


async function  createOffer(){
    if(!localStream){
        return alert("local stream is not available");
    }

    const offer = await createPeerConnection("sdpOfferTextArea");
    
    //tells WebRtc that a peer wants to start a connection which triggers the ICE  candidates gathering process
    await peerConnection.setLocalDescription(offer); // interblere for at lave en connection for sig selv
}


async function createAnswer() {
    await createPeerConnection("sdpAnswerTextArea");

    let offer = document.getElementById("sdpOfferTextArea").value;
    if (!offer) return alert("Offer is required")
    offer = JSON.parse(offer);

    // laver peer connection
    // er sender offer til remote peer
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

init()
document.getElementById("createOfferButton").addEventListener("click", createOffer);
document.getElementById("createAnswerButton").addEventListener("click", createAnswer);
document.getElementById("addAnswerButton").addEventListener("click", addAnswer);