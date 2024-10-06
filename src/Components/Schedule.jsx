import React, { useState, useEffect } from "react";
import { db } from "../firebase.js"; // Sesuaikan dengan path Firebase Anda
import { collection, getDocs } from "firebase/firestore";

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleSnapshot = await getDocs(collection(db, "schedules"));
        const scheduleList = scheduleSnapshot.docs.map((doc) => doc.data());
        setSchedule(scheduleList);
      } catch (error) {
        console.error("Error fetching schedule data: ", error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-24 sm:mt-10 p-6 glass sm:bg-white text-gray-800 rounded shadow-md min-h-72 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Jadwal Lomba</h2>
      {schedule.length === 0 ? (
        <p className="text-center text-gray-700">
          Belum ada jadwal yang tersedia.
        </p>
      ) : (
        schedule.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{day.date}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {day.events.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className="flex flex-col border p-3 rounded shadow"
                >
                  <span className="font-bold">
                    {event.time || "Waktu Belum Diisi"}
                  </span>
                  <span>{event.activity || "Aktivitas Belum Diisi"}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SchedulePage;
