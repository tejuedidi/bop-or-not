import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from "./components/Welcome";
import Playlists from "./components/Playlists";
import Tempo from "./components/Tempo";
import Navbar from './components/Navbar';
import CustomWebcam from './components/Webcam';

import './App.css';

export default function App() {
    return (
        <Router>
            <>
                <Navbar />
                <div>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/playlists" element={<Playlists />} />
                        <Route path="/tempo" element={<Tempo />} />
                        {/* <Route path="/" element={<CustomWebcam />} /> */}
                    </Routes>
                </div>
                <CustomWebcam />
            </>
        </Router>
    );
}
