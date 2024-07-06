import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { companies } from "../data/companies";

const getCurrentUserId = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        console.log("Authenticated User ID:", user.uid);
        resolve(user.uid);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
};

const getCollectionRef = async (collectionName) => {
  const userId = await getCurrentUserId();
  console.log(
    `Getting reference for collection: ${collectionName}, User ID: ${userId}`
  );
  return collection(db, "Users", userId, collectionName);
};

export const getTrades = async () => {
  const colRef = await getCollectionRef("Trades");
  console.log("Trades Collection Reference Path:", colRef.path);
  const snapshot = await getDocs(colRef);
  let trades = [];
  snapshot.docs.forEach((doc) => {
    console.log(`Trade Document ID: ${doc.id}, Data:`, doc.data());
    trades.push({ ...doc.data(), id: doc.id });
  });
  console.log("Fetched trades from Firestore:", trades);
  return trades;
};

export const addTrade = async (trade) => {
  const colRef = await getCollectionRef("Trades");
  await addDoc(colRef, trade);
  console.log("Trade added:", trade);
};

export const deleteTrade = async (id) => {
  const userId = await getCurrentUserId();
  const docRef = doc(db, "Users", userId, "Trades", id);
  await deleteDoc(docRef);
  console.log("Trade deleted:", id);
};

export const updateTrade = async (id, updatedTrade) => {
  const userId = await getCurrentUserId();
  const docRef = doc(db, "Users", userId, "Trades", id);
  await updateDoc(docRef, updatedTrade);
  console.log("Trade updated:", updatedTrade);
};

//CRUD FOR CARDS
export const getCards = async () => {
  const colRef = await getCollectionRef("Cards");
  console.log("Cards Collection Reference Path:", colRef.path);
  const snapshot = await getDocs(colRef);
  let cards = [];
  snapshot.docs.forEach((doc) => {
    console.log(`Card Document ID: ${doc.id}, Data:`, doc.data());
    cards.push({ ...doc.data(), id: doc.id });
  });
  console.log("Fetched cards from Firestore:", cards);
  return cards;
};

export const addCard = async (card) => {
  const colRef = await getCollectionRef("Cards");
  await addDoc(colRef, card);
  console.log("Card added:", card);
};

export const deleteCard = async (id) => {
  const userId = await getCurrentUserId();
  const docRef = doc(db, "Users", userId, "Cards", id);
  await deleteDoc(docRef);
  console.log("Card deleted:", id);
};

export const updateCard = async (id, updatedCard) => {
  const userId = await getCurrentUserId();
  const docRef = doc(db, "Users", userId, "Cards", id);
  await updateDoc(docRef, updatedCard);
  console.log("Card updated:", updatedCard);
};

export const generateSyntheticData = async (collectionRef, numRows) => {
  const strategies = ["RSI", "MACD", "Support", "Resistance", "Moving Average"];
  const status = ["Closed P", "In process", "Closed L"];
  for (let i = 0; i < numRows; i++) {
    const companyIndex = Math.floor(Math.random() * companies.length);
    const statusIndex = Math.floor(Math.random() * status.length);
    const entryDate = new Date();
    entryDate.setDate(entryDate.getDate() - Math.floor(Math.random() * 365));
    const exitDate = new Date(entryDate);
    exitDate.setDate(exitDate.getDate() + Math.floor(Math.random() * 30));

    const row = {
      company: companies[companyIndex].name,
      ticker: companies[companyIndex].name,
      result: Math.floor(Math.random() * 10000 - 5000),
      volume: Math.floor(Math.random() * 10000),
      strategy: strategies[Math.floor(Math.random() * strategies.length)],
      entryDate: entryDate.toISOString().split("T")[0],
      exitDate: exitDate.toISOString().split("T")[0],
      goalPrice: Math.floor(Math.random() * 500 + 50),
      exitPrice: Math.floor(Math.random() * 500 + 50),
      entryPrice: Math.floor(Math.random() * 500 + 50),
      TradeStatus: status[statusIndex],
    };

    await addDoc(collectionRef, row);
    console.log("Synthetic data row added:", row);
  }
};
