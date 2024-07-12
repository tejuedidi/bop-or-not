import React from 'react';

export default function Welcome() {
    const handleLogin = async () => {
        window.location.href = 'http://localhost:8000/authorize/';
    };

    return (
        <>
            <h1>Welcome</h1>
            <button name="login" onClick={handleLogin}>Login with Spotify</button>
        </>
    );
}
