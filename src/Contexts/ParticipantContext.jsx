// src/contexts/ParticipantContext.js
import { createContext, useState, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const ParticipantContext = createContext();

const ParticipantProvider = ({ children }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "participants"));
      const participantsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setParticipants(participantsList);
    };

    fetchData();
  }, []);

  const addParticipant = (participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  return (
    <ParticipantContext.Provider value={{ participants, addParticipant }}>
      {children}
    </ParticipantContext.Provider>
  );
};

export { ParticipantContext, ParticipantProvider };
