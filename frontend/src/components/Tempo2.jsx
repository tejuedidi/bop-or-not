import React, { useState } from 'react';

const Tempo2 = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchTracks = (tempoRange) => {
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
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching tracks:', error);
            setLoading(false);
        });
    };

    const handlePlayTrack = (trackId) => {
        // Implement playback logic here (e.g., using Spotify Web Playback SDK)
        console.log('Playing track with ID:', trackId);
        // Example: Call a function to play the track using an external library or API
    };

    return (
        <div>
            <h1>Filtered Spotify Tracks by Tempo Range</h1>
            <div>
                <button onClick={() => handleFetchTracks('80-120')}>Spice Level: 1</button>
                <button onClick={() => handleFetchTracks('120-140')}>Spice Level: 2</button>
                <button onClick={() => handleFetchTracks('140-160')}>Spice Level: 3</button>
                <button onClick={() => handleFetchTracks('160-190')}>Spice Level: 4</button>
                {/* Add more buttons for different tempo ranges as needed */}
            </div>
            <ul>
                {loading && <p>Loading...</p>}
                {!loading && tracks.map(track => (
                    <li key={track.id}>
                        {track.name} by {track.artist} - Tempo: {track.tempo}
                        <button onClick={() => handlePlayTrack(track.id)}>Play</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tempo2;
