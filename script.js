// Importeer Firebase en PubNub
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

// Firebase Configuratie
const firebaseConfig = {
  apiKey: "AIzaSyAIpUdHpSEk8ahMIO59T-BAx7n5_BcRYW4",
  authDomain: "printer-aid.firebaseapp.com",
  databaseURL: "https://printer-aid-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "printer-aid",
  storageBucket: "printer-aid.firebasestorage.app",
  messagingSenderId: "636113573034",
  appId: "1:636113573034:web:1476a0e2c26c595232acd3",
  measurementId: "G-BFZTJTGYRC",
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// PubNub Configuratie (gebruik een unieke UUID)
const pubnub = new PubNub({
  publishKey: "pub-c-c99cf8bb-3a00-4f2c-a061-2f58c92b61ef",
  subscribeKey: "sub-c-83e02d99-84e9-4b1a-afed-b953fe0c2141",
  uuid: `client-${Date.now()}`, // Gebruik een unieke identifier
});

// Eventlistener voor de registratieknop
document.getElementById("submitButton").addEventListener("click", async function () {
  const email = document.getElementById("email").value;
  const namefirst = document.getElementById("namefirst").value;
  const namelast = document.getElementById("namelast").value;
  const wantsEmail = document.getElementById("wantsEmail").checked;

  try {
    // Voeg gegevens toe aan Firestore
    const docRef = await addDoc(collection(db, "prints"), {
      email: email,
      name: namefirst,
      surname: namelast,
      wantsEmail: wantsEmail,
      date: new Date().toISOString(),
      status: "",
      printer: "",
    });
    alert("Gegevens succesvol verzonden!");

    // Verstuur bericht naar PubNub
    pubnub.publish(
      {
        channel: "prints",
        message: { text: "start_detecting" },
      },
      function (status, response) {
        if (status.error) {
          console.error("Fout bij PubNub:", status);
        } else {
          console.log("Bericht succesvol verzonden naar PubNub:", response);
        }
      }
    );
  } catch (e) {
    console.error("Fout bij verzenden naar Firestore:", e);
  }
});
