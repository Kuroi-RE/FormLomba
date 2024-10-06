import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CompetitionForm from "./Components/Form.jsx";
import ParticipantList from "./Components/ParticipantList";
import { ParticipantProvider } from "./Contexts/ParticipantContext";
import background from "./assets/bg.png";
import SchedulePage from "./Components/Schedule.jsx";
import Admin from "./Components/Admin.jsx";

const App = () => {
  return (
    <ParticipantProvider>
      <Router>
        <div
          className="min-h-screen flex flex-col items-center justify-center p-4 bg-contain bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <nav className="w-full z-10 absolute top-0 bg-red-600 p-4 text-white mb-10">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link
                  to="/"
                  className="font-bold hover:text-blue-500 transition-all delay-150"
                >
                  Form Pendaftaran
                </Link>
              </li>
              <li>
                <Link
                  className="font-bold hover:text-blue-500 transition-all delay-150"
                  to="/participants"
                >
                  Daftar Peserta
                </Link>
              </li>
              <li>
                <Link
                  className="font-bold hover:text-blue-500 transition-all delay-150"
                  to="/schedule"
                >
                  Jadwal Lomba
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<CompetitionForm />} />
            <Route path="/participants" element={<ParticipantList />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/a/admin" element={<Admin />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </ParticipantProvider>
  );
};

export default App;
