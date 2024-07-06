import React, { useEffect, useRef } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { cards } from "../data/cards";
import { generateSyntheticData } from "./firebaseOperations";

const NewUserDataCreation = ({ userId }) => {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (userId && !hasRunRef.current) {
      hasRunRef.current = true;
      createUserCollections(userId);
    }
  }, [userId]);

  const createUserCollections = async (uid) => {
    try {
      const cardsCollectionRef = collection(db, "Users", uid, "Cards");
      for (const card of cards) {
        await addDoc(cardsCollectionRef, card);
      }

      const tradesCollectionRef = collection(db, "Users", uid, "Trades");
      await generateSyntheticData(tradesCollectionRef, 50);

      console.log("User collections created successfully!");
    } catch (error) {
      console.error("Error creating user collections:", error.message);
    }
  };

  return null;
};

export default NewUserDataCreation;
