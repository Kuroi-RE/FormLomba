import React, { useState } from "react";
import { db } from "../firebase.js"; // Sesuaikan dengan path Firebase Anda
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const AdminPage = () => {
  const [newCompetition, setNewCompetition] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState("");
  const [eventActivity, setEventActivity] = useState("");
  const [notification, setNotification] = useState("");
  const [competitionOptions, setCompetitionOptions] = useState([]);

  // Fetch competitions to update select options
  const fetchCompetitions = async () => {
    try {
      const q = query(collection(db, "competitions"));
      const querySnapshot = await getDocs(q);
      const options = querySnapshot.docs.map((doc) => ({
        value: doc.id,
        label: doc.data().name,
      }));
      setCompetitionOptions(options);
    } catch (error) {
      console.error("Error fetching competitions: ", error);
    }
  };

  React.useEffect(() => {
    fetchCompetitions();
  }, []);

  const handleAddCompetition = async (e) => {
    e.preventDefault();
    try {
      if (newCompetition) {
        await addDoc(collection(db, "competitions"), {
          name: newCompetition,
        });
        setNotification("Lomba berhasil ditambahkan!");
        setNewCompetition("");
        fetchCompetitions(); // Refresh competition options
      } else {
        setNotification("Nama lomba tidak boleh kosong.");
      }
    } catch (error) {
      console.error("Error adding competition: ", error);
      setNotification("Gagal menambahkan lomba.");
    }
  };

  const handleAddEvent = () => {
    setEvents([...events, { time: eventTime, activity: eventActivity }]);
    setEventTime("");
    setEventActivity("");
  };

  const handleSubmitSchedule = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "schedules"), {
        date,
        events,
      });
      setNotification("Jadwal berhasil ditambahkan!");
      setDate("");
      setEvents([]);
    } catch (error) {
      console.error("Error adding schedule: ", error);
      setNotification("Gagal menambahkan jadwal.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Page</h2>

      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {notification}
        </div>
      )}

      <form onSubmit={handleAddCompetition} className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Tambah Lomba Baru</h3>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="competition">
            Nama Lomba
          </label>
          <input
            type="text"
            id="competition"
            value={newCompetition}
            onChange={(e) => setNewCompetition(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambah Lomba
        </button>
      </form>

      <form onSubmit={handleSubmitSchedule}>
        <h3 className="text-xl font-semibold mb-2">Tambah Jadwal</h3>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="date">
            Tanggal
          </label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="eventTime">
            Waktu Kegiatan
          </label>
          <input
            type="text"
            id="eventTime"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="eventActivity"
          >
            Aktivitas
          </label>
          <input
            type="text"
            id="eventActivity"
            value={eventActivity}
            onChange={(e) => setEventActivity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="button"
          onClick={handleAddEvent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambah Kegiatan
        </button>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mt-4">Daftar Kegiatan</h3>
          <ul className="list-disc pl-5 mt-2">
            {events.map((event, index) => (
              <li key={index}>
                {event.time} - {event.activity}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Simpan Jadwal
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
