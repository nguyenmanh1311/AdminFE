import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: 'AIzaSyC-4xG9Qa8V5Yx8Phz9Wz3diZrpF5636yI',
    authDomain: 'tgdd-6d431.firebaseapp.com',
    projectId: 'tgdd-6d431',
    storageBucket: 'tgdd-6d431.appspot.com',
    messagingSenderId: '641675556978',
    appId: '1:641675556978:web:1a82a76ef33292c6f4eaeb',
    measurementId: 'G-FXLLWJCV3F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);