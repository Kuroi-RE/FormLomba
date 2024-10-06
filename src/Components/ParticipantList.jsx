import React, { useEffect, useState } from "react";
import { db } from "../firebase.js"; // Pastikan path ini sesuai dengan konfigurasi Firebase Anda
import { collection, getDocs } from "firebase/firestore";
import Select from "react-select";

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [filter, setFilter] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantsCollection = collection(db, "participants");
        const participantsSnapshot = await getDocs(participantsCollection);
        const participantsList = participantsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Check if participantsList is valid
        if (participantsList.length === 0) {
          setNotification("Belum ada nama yang terdaftar");
        } else {
          setParticipants(participantsList);
          setFilteredParticipants(participantsList);
        }
      } catch (error) {
        console.error("Error fetching participants: ", error);
        setNotification("Gagal memuat data peserta.");
      }
    };

    fetchParticipants();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredParticipants(
        participants.filter((participant) =>
          participant.competitions.includes(filter.label)
        )
      );
    } else {
      setFilteredParticipants(participants);
    }
  }, [filter, participants]);

  const competitionOptions = [
    { value: "competition0", label: "Semua Lomba" },
    { value: "competition1", label: "Keprukan" },
    { value: "competition2", label: "Balap Karung" },
    { value: "competition3", label: "Futsal" },
    { value: "competition4", label: "Voli" },
    { value: "competition5", label: "Makan Kerupuk" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Daftar Peserta</h2>
      <div className="mb-6">
        <Select
          options={competitionOptions}
          onChange={setFilter}
          placeholder="Pilih Lomba"
          className="basic-single"
          classNamePrefix="select"
        />
      </div>
      {notification && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
          {notification}
        </div>
      )}
      {filteredParticipants.length > 0 ? (
        <ul className="list-disc pl-5">
          {filteredParticipants.map((participant) => (
            <li key={participant.id} className="mb-2">
              {participant.name} - {participant.competitions.join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Belum ada nama yang terdaftar</p>
      )}
    </div>
  );
};

export default ParticipantList;
