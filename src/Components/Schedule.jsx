import React from "react";

const SchedulePage = () => {
  const schedule = [
    {
      date: "13 Agustus",
      events: [
        { time: "08:00 - 09:00", activity: "Upacara Pembukaan" },
        { time: "09:00 - 10:00", activity: "Keprukan" },
        { time: "10:00 - 12:00", activity: "Balap Karung" },
        { time: "12:00 - 13:00", activity: "Istirahat" },
        { time: "13:00 - 15:00", activity: "Futsal" },
        { time: "15:00 - 17:00", activity: "Voli" },
      ],
    },
    {
      date: "14 Agustus",
      events: [
        { time: "08:00 - 09:00", activity: "Makan Kerupuk" },
        { time: "09:00 - 11:00", activity: "Keprukan" },
        { time: "11:00 - 12:00", activity: "Balap Karung" },
        { time: "12:00 - 13:00", activity: "Istirahat" },
        { time: "13:00 - 15:00", activity: "Futsal" },
        { time: "15:00 - 17:00", activity: "Voli" },
        { time: "17:00 - 18:00", activity: "Penutupan" },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-24 sm:mt-10 p-6 glass sm:bg-white text-gray-800 rounded shadow-md min-h-72 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Jadwal Lomba</h2>
      {schedule.map((day) => (
        <div key={day.date} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{day.date}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {day.events.map((event, index) => (
              <div
                key={index}
                className="flex flex-col border p-3 rounded shadow"
              >
                <span className="font-bold">{event.time}</span>
                <span>{event.activity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchedulePage;
