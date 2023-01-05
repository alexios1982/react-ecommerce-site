import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
//getFirestore ci da il database firestore
//doc ci permette di recuperare i documenti
//getDoc e setDoc ci permettono di recuperare e impostare i dati nei documenti
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//per prima cosa dobbiamo creare, attraverso
//un file di configurazione, l'app che permette
//di connettersi al progetto che abbiamo creato.
//Con questa applicazione faremo tutte le operazioni CRUD con il database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYMLW8QuaRE_1KiEksP3-jLIQCS_TQrQY",
  authDomain: "react-ecommerce-site-b3132.firebaseapp.com",
  projectId: "react-ecommerce-site-b3132",
  storageBucket: "react-ecommerce-site-b3132.appspot.com",
  messagingSenderId: "920922363378",
  appId: "1:920922363378:web:9215011afedd09a2ae876b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//poi dobbiamo gestire l'autenticazione, e per far
//questo importiamo da firebase/auth * (vedi gli import)

//creiamo un provider per l'autenticazione. Noi usiamo Google,
//ma ce ne sono anche altri (come Facebook, github etc)

const googleProvider = new GoogleAuthProvider();

//questo oggetto prevede un oggetto di configurazione
//per dirgli come si deve comportare. Noi vogliamo che
//quando un utente deve fare login, deve scegliere un account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//creiamo quindi l'oggetto per la gestione dell' autenticazione
//che ci viene ritornato dalla funzione getAuth()
//(dovrebbe essere una specie di singleton)
export const auth = getAuth();
//creiamo quindi la funzione che ci permetterà di creare l'autenticazione
//con il popup, a cui passiamo l'oggetto per l'autenticazione e il provider
//che abbiamo creato
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//una volta fatta l'autenticazione, vogliamo salvare le informazioni
//dell'utente, all'interno del nostro database. Abbiamo scelto firestore
//vista che stiamo usando firebase per l'autenticazione
//vedi sopra gli import
//creiamo quindi il database
export const db = getFirestore();
//creiamo quindi una funzione che ci permette di salvare i dati
//degli utenti nel database dalle informazioni di autenticazione
export const createUserDocumentFromAuth = async (auth) => {
  console.log(auth);
  //verifichaimo che non ci siamo già un documento con lo stesso id
  //per scrivere e leggere i documenti, firebase usa un oggetto
  //speciale chiamato docReference, che dovrebbe essere una
  //specie di puntatore al documento
  //come identificatore usiamo l'attribuito uid dell'oggetto auth
  //che riceviamo come risposta da signInWithGooglePopup
  const userDocRef = doc(db, "users", auth.uid);
  //per accedere ai dati, utlizziamo il metodo asincrono getDoc
  //che ci restituisce il cosiddetto snapshot
  const userSnapshot = await getDoc(userDocRef);
  //se il documento non esiste, ne dobbiamo creare uno
  if (!userSnapshot.exists()) {
    const { displayName: name, email } = auth;
    try {
      setDoc(userDocRef, {
        name,
        email,
        creationDate: new Date(),
      });
    } catch (error) {
      console.log("some errors", error.message);
    }
  }
  return userDocRef;
};
