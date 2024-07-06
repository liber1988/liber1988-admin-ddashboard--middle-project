import { db } from "./firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const fetchMessages = async () => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (!user) {
        resolve([]);
      } else {
        try {
          const messagesRef = collection(db, "Users", user.uid, "messages");
          const q = query(messagesRef, orderBy("timestamp", "desc"));
          const querySnapshot = await getDocs(q);

          const messages = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          resolve(messages);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};
