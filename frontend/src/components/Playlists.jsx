import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/tracks/', {
            method: 'GET',
            credentials: 'include',  // Ensure cookies (sessions) are sent
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error fetching playlists:', data.error);
                } else {
                    setPlaylists(data.playlists);
                }
            })
            .catch(error => console.error('Error fetching playlists:', error));
    }, []);

    return (
        <div>
            <h1>Spotify Playlists</h1>
            <ul>
                {playlists.map(playlist => (
                    <li key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>
            <ul>
                <Link to="/tempo2">See Tracks by Tempo2 </Link>
            </ul>
        </div>
    );
};
