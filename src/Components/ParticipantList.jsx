// src/components/ParticipantList.js
import { useState, useEffect } from "react";
import Select from "react-select";
import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const competitionOptions = [
  { value: "Keprukan", label: "Keprukan" },
  { value: "Balap Karung", label: "Balap Karung" },
  { value: "Futsal", label: "Futsal" },
  { value: "Voli", label: "Voli" },
  { value: "Lomba 2", label: "Lomba 2" },
];

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "participants"));
        const participantsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParticipants(participantsList);
        setLoading(false);
      } catch (error) {
        console.error("Ada sebuah masalah ketika Fetching Data: ", error);
        setError("ada masalah saat fetching data. Coba lagi nanti.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredParticipants = selectedCompetition
    ? participants.filter((participant) =>
        participant.competitions.includes(selectedCompetition.label)
      )
    : participants;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 glass sm:bg-white text-gray-800 rounded shadow-md min-h-72 w-full md:w-1/2">
      <h2 className="text-2xl font-bold mb-4 text-center">Daftar Peserta</h2>
      <div className="mb-4">
        <Select
          options={competitionOptions}
          value={selectedCompetition}
          onChange={setSelectedCompetition}
          className="basic-select"
          classNamePrefix="select"
          isClearable
          isSearchable={false}
          placeholder="List Peserta Berdasarkan Lomba"
        />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : filteredParticipants.length === 0 ? (
        <p className="text-center">Belum ada nama yang terdaftar</p>
      ) : (
        <ul className="colored_table">
          {filteredParticipants.map((participant) => (
            <li key={participant.id} className="mb-2 p-2 border rounded">
              <p className="text-lg font-bold">Nama: {participant.name}</p>
              <p className="text-sm">
                Lomba: {participant.competitions.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParticipantList;
