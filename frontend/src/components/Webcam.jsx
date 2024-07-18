// import React, { useRef, useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import Webcam from 'react-webcam';
// import axios from 'axios';

// const CustomWebcam = () => {
//   const webcamRef = useRef(null);
//   const [emotion, setEmotion] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       capture();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const capture = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       sendToBackend(imageSrc);
//     }
//   };

//   const sendToBackend = async (imageSrc) => {
//     try {
//       const response = await axios.post('http://localhost:8000/analyze/', { image: imageSrc });
//       if (response.data.status === 'success') {
//         setEmotion(response.data.emotion); // Update the emotion state
//       } else {
//         console.warn(response.data.message); // Handle cases where no face is detected
//         setEmotion('No face detected');
//       }
//     } catch (error) {
//       console.error('Error sending image to backend:', error);
//     }
//   };
//   //* trying to add button
//   const [showWebcam, setShowWebcam] = useState(false)
//   // showWebcam is false, !showWebcam evaluates to true
//   // showWebcam is true, !showWebcam evaluates to false

//   const handleAccess = async () => {
//     setShowWebcam(true); // set to true to display webcam
//   };

//   const handleClose = () => {
//     setShowWebcam(false);
//   };

//   return (
//     <>
//       {!showWebcam && ( // if showWebcam is false then button to access is shown
//         <Button
//           variant="contained"
//           onClick={handleAccess}
//           sx={{
//             backgroundColor: '#85B36B', color: '#386641',
//             '&:hover': { backgroundColor: '#386641', color: '#85B36B' }
//           }}
//         >
//           Access Webcam
//         </Button>
//       )}
//       {showWebcam && (
//         <div>
//           <Webcam height={600} width={600} />
//           <Button
//             variant="contained"
//             onClick={handleClose}
//             sx={{
//               backgroundColor: '#FF5733',
//               color: '#FFFFFF',
//               '&:hover': { backgroundColor: '#D54500', color: '#FFFFFF' }
//             }}
//           >
//             Close Webcam
//           </Button>
//         </div>
//       )}
//       {emotion && <p>Detected Emotion: {emotion}</p>}
//     </>
//   );
// };

// export default CustomWebcam;



import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Button from '@mui/material/Button';

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);

  useEffect(() => {
    let interval;
    if (showWebcam) {
      interval = setInterval(() => {
        capture();
      }, 10000); // Adjust the interval as needed (e.g., every 10 seconds)
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
      )}
      {showWebcam && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={600}
            height={600}
          />
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
      )}
      {emotion && <p>Detected Emotion: {emotion}</p>}
    </>
  );
};

export default CustomWebcam;
