// Import the functions you need from the SDKs you need
import './style.css';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut  } from "firebase/auth";
import firebaseConfig from '../config/firebaseConfig.js'; // Import the firebaseConfig object


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get the language code from the user
const auth = getAuth(app);
auth.languageCode = 'en'; 

// Initialize the Google Auth provider
const provider = new GoogleAuthProvider(); 

// We wrap the event listeners in a DOMContentLoaded event to ensure that the elements are available in the DOM
document.addEventListener("DOMContentLoaded", () => {
  const googleLogin = document.getElementById("googleLoginBtn");
  if (googleLogin) {
      googleLogin.addEventListener("click", () => {
          handleGoogleSignIn(auth, provider);
      });
  }

  const googleLogout = document.getElementById("googleLogoutBtn");
  if (googleLogout) {
      googleLogout.addEventListener("click", () => {
          handleGoogleSignOut(auth);
      });
  }
});


function handleGoogleSignIn(auth, provider) {
  /*
   the line where actual integration happens when the signInWithPopup function is called. Here where is the line
   where firebase authentication interacts with the Google Auth provider to handle the sign-in process.
   */
   signInWithPopup(auth, provider) // integrate with Google Auth provider
   .then((result) => {
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;  // access token
     const user = result.user; // user info.
     console.log("User signed in: ", user);
     window.location.href = "../logged.html"; // Redirect to logged page after sign in to sign out
     
   }).catch((error) => {
     const errorCode = error.code;
     console.log("Error code: ", errorCode);
     const errorMessage = error.message;
     console.log("Error message: ", errorMessage);
   });
}

function handleGoogleSignOut(auth) {
   signOut(auth).then(() => {
     console.log("User signed out");
     window.location.href = "/index.html"; // Redirect to login page after sign out
   }).catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
   });
}


