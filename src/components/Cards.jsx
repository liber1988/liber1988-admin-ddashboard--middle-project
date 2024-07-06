import React, { useState, useEffect } from "react";
import Card from "./Card";
import { getCards } from "../firebase/firebaseOperations";
function Cards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cards = await getCards();
        console.log("Fetched cards from Firestore:", cards);
        setCards(cards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {cards &&
        cards.length > 0 &&
        cards.map((card) => <Card key={card.id} card={card} />)}
    </>
  );
}

export default Cards;
