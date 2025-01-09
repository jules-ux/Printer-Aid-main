live// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIpUdHpSEk8ahMIO59T-BAx7n5_BcRYW4",
  authDomain: "printer-aid.firebaseapp.com",
  databaseURL: "https://printer-aid-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "printer-aid",
  storageBucket: "printer-aid.firebasestorage.app",
  messagingSenderId: "636113573034",
  appId: "1:636113573034:web:1476a0e2c26c595232acd3",
  measurementId: "G-BFZTJTGYRC"
};

//initialize database

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Elementen ophalen
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('namefirst');
const surnameInput = document.getElementById('namelast');
const wantsEmailCheckbox = document.getElementById('wantsEmail');
const submitButton = document.getElementById('submitButton');



// Evenementenlistener voor de knop
document.getElementById("submitButton").addEventListener("click", (e) => {
  console.log('Button clicked');
  e.preventDefault(); // Voorkom standaard herladen van de pagina

  // Waarden ophalen
  const email = emailInput.value;
  const name = nameInput.value;
  const surname = surnameInput.value;
  const wantsEmail = wantsEmailCheckbox.checked;

  // Data naar Firebase sturen
  const usersRef = ref(database, 'prints');
  push(usersRef, {
    email: email,
    name: name,
    surname: surname,
    wantsEmail: wantsEmail
  })
  .then(() => {
    alert('Gegevens succesvol verzonden!');
    // Optioneel: velden resetten
    emailInput.value = '';
    nameInput.value = '';
    surnameInput.value = '';
    wantsEmailCheckbox.checked = false;
  })
  .catch((error) => {
    console.error('Fout bij verzenden:', error);
  });
});