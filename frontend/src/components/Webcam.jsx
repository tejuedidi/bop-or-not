import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Button from '@mui/material/Button';

import './Webcam.css';

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);

  useEffect(() => {
    let interval;
    if (showWebcam) {
      interval = setInterval(() => {
        capture();
      }, 5000); // Adjust the interval as needed (e.g., every 10 seconds)
    }
    return () => clearInterval(interval);
  }, [showWebcam]);

  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        await sendToBackend(imageSrc);
      }
    }
  };

  const sendToBackend = async (imageSrc) => {
    try {
      const response = await axios.post('http://localhost:8000/analyze/', { image: imageSrc });
      if (response.data.status === 'success') {
        setEmotion(response.data.emotion); // Update the emotion state
      } else {
        console.warn(response.data.message); // Handle cases where no face is detected
        setEmotion('No face detected');
      }
    } catch (error) {
      console.error('Error sending image to backend:', error);
    }
  };

  const handleAccess = async () => {
    setShowWebcam(true); // set to true to display webcam
  };

  const handleClose = () => {
    setShowWebcam(false);
  };

  return (
    <>
      {!showWebcam && ( // if showWebcam is false then button to access is shown
        <div className='but1'>
          <Button
            variant="contained"
            onClick={handleAccess}
            sx={{
              backgroundColor: '#85B36B', color: '#386641',
              '&:hover': { backgroundColor: '#386641', color: '#85B36B' }
            }}
          >
            Access Webcam
          </Button>
        </div>
      )}

      {showWebcam && (
        <>
          <div className='cam'>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={600}
              height={500}
            />
          </div>

          <div className='but2'>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                backgroundColor: '#FF5733',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#D54500', color: '#FFFFFF' }
              }}
            >
              Close Webcam
            </Button>
          </div>

          <div className='emo'>
            {emotion && <p>Detected Emotion: {emotion}</p>}
          </div>
        </>
      )}
    </>
  );
};

export default CustomWebcam;
