const firebaseConfig = {
    apiKey: getViteEnv("VITE_FIREBASE_API_KEY"),
    authDomain: getViteEnv("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: getViteEnv("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: getViteEnv("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getViteEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: getViteEnv("VITE_FIREBASE_APP_ID"),

};

// VITE sytem env. use import.meta.env to access the env variables in Vite.
function getViteEnv(key) {
    return import.meta.env[key];
}

export default firebaseConfig;


