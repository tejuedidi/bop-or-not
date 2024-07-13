import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Tempo2 = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleButtonClick = (tempoRange) => {
        setLoading(true); 

        fetch(`http://localhost:8000/tempo2/?tempo_range=${tempoRange}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error fetching tracks:', data.error);
                } else {
                    setTracks(data.tracks);
                }
            })
            .catch(error => {
                console.error('Error fetching tracks:', error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h1>Filtered Spotify Tracks by Tempo Range</h1>
            <Button variant="outlined" color="success" onClick={() => handleButtonClick('80-100')}>Spice Level: 1</Button>

            <ul>
                {loading && <p>Loading...</p>}
                {!loading && tracks.map(track => (
                    <li key={track.id}>
                        {track.name} by {track.artist} - Tempo: {track.tempo}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tempo2;