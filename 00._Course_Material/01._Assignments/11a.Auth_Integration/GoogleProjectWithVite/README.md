# To run your existing project, follow these steps:
```bash
$ npm install
$ npm run dev
```

# Firebase Google Authentication with Vite
This guide walks through setting up Firebase, enabling Google Authentication, and integrating it into a Vite project. Follow these steps to repooduce the setup. 
---
## Prerequisites
- A Google account to access Firebase

---

## Step 1: Create a Firebase project

1. Go the [Firebase console](https://console.firebase.google.com/)
2. Click on **Create a Firebase project**.
   - Disable joining the Google Developer program (optional).
   - Disable **Gemini** in Firebase (optional).
3. Enter a project name and click **Continue**
4. Disable Google Analytics (optional) and Click **Create Project**
5. One the project is created, then click **Continue** to go to the project dashboard

---
## Setp 2: Enable Google Authentication in Firebase

1. In the Firebase Console, go to **build > Authentication**.
2. Click on **GetStart**
2. Click on the **Sign-in method** tab.
3. Enable **Google** as a sign-in provider:
    - Click **Add new provider**.
    - Select **Google**.
    - Configure the **Support email for project**
    - Click **Save**
---

## Step 3: Create a Vite Project

1. Open a terminal and run the following command to create a new Vite project:
   ```bash
   $ npm create vite@latest <project_name>
   ```
   **_OBS_** : Replace <project_name> with desired poject name. 
2. Clean up the project by removing unnecessary files: 
    - vite.svg
    - counter.js
    - javascript.svg
3. Open the `style.css` file and remove all existing CSS content.
4. Open `main.js` and remive alle existing code but keep: 
    ``` bash
    $ import './style.css';
    ```
    **_OBS_**: By keeping this will Vite bundle it with our HTML.
5. (optional) Create a file named **vite.config.js** in the root of your project (where the `package.json` file is located) and add the following code:
    ``` javascript
    import { defineConfig } from 'vite';
    export default defineConfig({
    // Vite automatically loads .env files, no extra configuration is needed
    });
    ```
    - This configuration ensures that Vite automatically handles `.env` files for envirmonment variables. 
6. (optional) Create a file named `.env` in the root of your project.
   - This file will be used to store your Firebase configuration securely.
   - Vite requires environment variables to be prefixed with `VITE_` to make them accessible in the project.
     - syntax for geting environment variables in Vite:
        ``` .env
            import.meta.env[key]
        ```
   - **Example**:
     ```.env
     VITE_FIREBASE_API_KEY=import.meta.env.<your-api-key>
     ```
   - Replace `<your-api-key>` with the actual API key from your Firebase project.

--- 

## Step 5: Connect to firebase in your code; **[source](https://firebase.google.com/docs/web/setup)**

- Install Firebase SDK:
    ```bash
    $ npm install firebase
    ```
- In your Firebase dashboard, go to `Project Overview` and click on the `</>` icon to create a Firebase app.

- Initialize Firebase in your app and create a Firebase App object:

    ```javaScript
    import { initializeApp } from 'firebase/app';

    // You can securely save firebaseConfig in .env (optional)
    const firebaseConfig = {
        apiKey: "<your-api-key>",
        authDomain: "<your-auth-domain>",
        projectId: "<your-project-id>",
        storageBucket: "<your-storage-bucket>",
        messagingSenderId: "<your-messaging-sender-id>",
        appId: "<your-app-id>"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Firebase is now initialized and ready for further integration (e.g., Google Authentication)    
    ```
- Replace the placeholders (`<your-api-key>`,`<your-auth-domain>`, etc.) with the actual values from your Firebase project. You can find these in the Firebase Console under Project Settings > General > Your apps.
---

## step 6: Authentication using Google with JavaScript; **[source](https://firebase.google.com/docs/auth/web/google-signin)**

- Import the necessary Firebase modules for authentication and creating instances for the Google authentication
    ```javaScript
    import { getAuth, GoogleAuthProvider, signInWithPopup, signOut  } from "firebase/auth";


    //// code removed for brevity


    // get the language code from the user
    const auth = getAuth(app);
    auth.languageCode = 'en'; // en: English. Enables us to specify the language in which users will receive authentication messages.

    // Initialize the Google Auth provider
    const provider = new GoogleAuthProvider(); 
    ```
- GoogleAuthProvider: This allow to create Google credentials for user authentication in our app.
- getAuth(): This is depended on in `initializeApp(firebaseConfig)` to access the authentication features.

- To integrates with Google we need use funtion `signInWithPopup`:
    ```javaScript
    //// code removed for brevity

   function handleGoogleSignIn(auth, provider) {
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

    ```
    -  **signInWithPopup**: This function integrates with Google to allow users to sign in and obtain an authentication token.

- signOut: To sign out a user. 
    ```javaScript
    //// code removed for brevity

    function handleGoogleSignOut(auth) {
        signOut(auth).then(() => {
            console.log("User signed out");
            window.location.href = "/index.html"; // Redirect to login page after sign out
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    ```

- This code enables users to interact with Google authentication directly from an HTML page by clicking buttons
    ```javaScript
    //// code removed for brevity

    // We wrap the event listeners in a DOMContentLoaded event to ensure that the elements are available in the DOM
    document.addEventListener("DOMContentLoaded", () => {
    const googleLogin = document.getElementById("googleLoginBtn");
    if (googleLogin) {
        googleLogin.addEventListener("click", () => {
            handleGoogleSignIn(auth, provider); // Calls the function to log in using Google Sign-In
        });
    }

    const googleLogout = document.getElementById("googleLogoutBtn");
    if (googleLogout) {
        googleLogout.addEventListener("click", () => {
            handleGoogleSignOut(auth); // Calles the funtion to log out using Google Sign-Out
        });
    }
    });
    ```




