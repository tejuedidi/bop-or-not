import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from "./components/Welcome"
import Playlists from "./components/Playlists"
import Tempo2 from "./components/Tempo2"



export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/tracks" element={<Playlists />} />
                <Route path="/tempo2" element={<Tempo2 />} />
            </Routes>
        </Router>
    );
}

