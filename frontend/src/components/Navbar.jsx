import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-item'>
                <Link to="/" className='navbar-link'>Welcome</Link>
            </div>
            <div className='navbar-item'>
                <Link to="/playlists" className='navbar-link'>Tracks</Link>
            </div>
            <div className='navbar-item'>
                <Link to="/tempo" className='navbar-link'>Tempo</Link>
            </div>
            <div className='navbar-item'>
                <Link to="analyze" className='navbar-link'>Analyze</Link>
            </div>
        </div>
    );
};
