import React, { useEffect, useState } from 'react';

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/playlists/', {
            method: 'GET',
            credentials: 'include',
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
        </div>
    );
};
