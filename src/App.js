import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import FightersPage from './pages/FightersPage';
import CreateFightersPage from './pages/CreateFightersPage';
import NavBar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fighters" element={<FightersPage />} />
          <Route path="/fighters/create" element={<CreateFightersPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
