import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import About from "./components/About";
import Contact from "./components/Contact";
import "./App.css";

function Footer() {
  return (
    <footer className="w-full bg-cyan-900 text-white text-center py-2 text-sm">
      &copy; {new Date().getFullYear()} Secure Bits. All rights reserved.
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.1),_transparent_80%)] bg-[size:24px_24px]">
      <Router>
        <Navbar />
        <main className="flex-grow p-4 md:mycontainer">
          <Routes>
            <Route path="/" element={<Manager />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
