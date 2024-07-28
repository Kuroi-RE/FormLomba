import { useState, useContext } from "react";
import Select from "react-select";
import { FiFlag } from "react-icons/fi";
import garudaImage from "../assets/pancasilaImage.png";
import { ParticipantContext } from "../Contexts/ParticipantContext";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

const competitions = [
  { value: "competition1", label: "Keprukan" },
  { value: "competition2", label: "Balap Karung" },
  { value: "competition3", label: "Futsal" },
  { value: "competition4", label: "Voli" },
  { value: "competition5", label: "Lomba 2" },
];

const capitalize = (text) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

const CompetitionForm = () => {
  const [name, setName] = useState("");
  const [selectedCompetitions, setSelectedCompetitions] = useState([]);
  const [notification, setNotification] = useState("");
  const { addParticipant } = useContext(ParticipantContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && selectedCompetitions.length > 0) {
      const capitalizedName = capitalize(name);
      const newParticipant = {
        name: capitalizedName,
        competitions: selectedCompetitions.map((comp) => comp.label),
      };

      try {
        const docRef = await addDoc(
          collection(db, "participants"),
          newParticipant
        );
        addParticipant({ id: docRef.id, ...newParticipant });
        setNotification(`${capitalizedName} telah berhasil terdaftar`);
        setName("");
        setSelectedCompetitions([]);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      setNotification("Silakan lengkapi form dengan benar.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto mt-10 bg-white text-gray-800 p-6 rounded shadow-md relative">
      <div className="w-full md:w-1/2 p-4">
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <FiFlag size={40} className="text-red-600" />
            <h1 className="text-3xl font-bold ml-2 text-red-600 text-center md:text-left">
              Pendaftaran Lomba Kemerdekaan
            </h1>
          </div>
          {notification && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{notification}</span>
              <button
                onClick={() => setNotification("")}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 00-.707.707L9.293 10l-3.64 3.64a.5.5 0 00.707.707L10 10.707l3.64 3.64a.5.5 0 00.707-.707L10.707 10l3.64-3.64a.5.5 0 000-.707z" />
                </svg>
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Nama
              </label>
              <input
                type="text"
                autoSave="false"
                id="name"
                value={name}
                onChange={(e) => setName(capitalize(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="competitions"
              >
                Pilih Lomba
              </label>
              <Select
                id="competitions"
                isMulti
                options={competitions}
                value={selectedCompetitions}
                onChange={setSelectedCompetitions}
                className="basic-multi-select"
                classNamePrefix="select"
                maxMenuHeight={150}
                closeMenuOnSelect={false}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center mt-4 md:mt-0">
        <img
          src={garudaImage}
          alt="Patriot"
          className="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg"
        />
      </div>
    </div>
  );
};

export default CompetitionForm;
