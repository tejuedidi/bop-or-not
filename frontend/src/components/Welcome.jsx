import React from 'react';
import Button from '@mui/material/Button';

// import './Welcome.css';

export default function Welcome() {
    const handleLogin = async () => {
        window.location.href = 'http://localhost:8000/authorize/';
    };

    return (
        <div className="login">
            <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                    backgroundColor: '#85B36B', color: '#386641',
                    '&:hover': { backgroundColor: '#386641', color: '#85B36B' }
                }}
            >
                Login with Spotify
            </Button>
        </div>
    );
}
