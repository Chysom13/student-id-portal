import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import Home from "./pages/Home";
import DisplayCard from "./pages/DisplayCard";
import CapturePhoto from "./pages/CapturePhoto";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>MTU One ID Portal</h1>
        <Link to="/">Search Student</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<DisplayCard />} />
        <Route path="/capture/:id" element={<CapturePhoto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;