import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

export const ParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const querySnapshot = await getDocs(collection(db, "participants"));
      const participantsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setParticipants(participantsList);
    };

    fetchParticipants();
  }, []);

  const addParticipant = (participant) => {
    setParticipants([...participants, participant]);
  };

  return (
    <ParticipantContext.Provider value={{ participants, addParticipant }}>
      {children}
    </ParticipantContext.Provider>
  );
};
