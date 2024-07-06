import { db } from "./firebaseConfig";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getCurrentUserId = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
};

const findUserByEmail = async (email) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id;
  }
  throw new Error("User not found");
};

export const addMessageToUser = async (formData) => {
  const { email, name, message } = formData;
  const userId = await findUserByEmail(email);
  const currentUserId = await getCurrentUserId();

  const messageData = {
    fromUserId: currentUserId,
    fromUserName: name,
    message: message,
    timestamp: new Date(),
  };

  const messagesRef = collection(db, "Users", userId, "messages");
  await addDoc(messagesRef, messageData);
  console.log("Message added:", messageData);
};
