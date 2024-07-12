// import React, { useEffect, useState } from 'react';

// export default function Tempo() {
//     const [tracks, setTracks] = useState([]);

//     useEffect(() => {
//         fetch(`http://localhost:8000/tempo2/`, {
//             method: 'GET',
//             credentials: 'include',  // Ensure cookies (sessions) are sent
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.error) {
//                     console.error('Error fetching tracks:', data.error);
//                 } else {
//                     setTracks(data.tracks);
//                 }
//             })
//             .catch(error => console.error('Error fetching tracks:', error));
//     }, []);

//     return (
//         <div>
//             <h1>Your Spotify Saved Tracks</h1>
//             <ul>
//                 {tracks.map(track => (
//                     <li key={track.id}>
//                         {track.name} by {track.artist}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

//!!!! popularity and tempo 
import React, { useEffect, useState } from 'react';

const FilteredTracks = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/tempo2/', {
            method: 'GET',
            credentials: 'include'  // Ensure cookies (sessions) are sent
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching tracks:', data.error);
            } else {
                setTracks(data.tracks);
            }
        })
        .catch(error => console.error('Error fetching tracks:', error));
    }, []);

    return (
        <div>
            <h1>Filtered Spotify Tracks by Popularity and Tempo</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        {track.name} by {track.artist} - Popularity: {track.popularity} - Tempo: {track.tempo}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilteredTracks;
