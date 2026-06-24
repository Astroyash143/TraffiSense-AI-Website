import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzNdZIv1dBp0ohWB0e8Yg_B6a9qsc4GOk",
  authDomain: "traffic-sense-ai-e0266.firebaseapp.com",
  projectId: "traffic-sense-ai-e0266",
  storageBucket: "traffic-sense-ai-e0266.firebasestorage.app",
  messagingSenderId: "253709733558",
  appId: "1:253709733558:web:504d83afb109697be96017",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);