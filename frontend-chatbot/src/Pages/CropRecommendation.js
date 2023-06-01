import MotionHoc from './MotionHoc';
import React, { useState } from 'react';
import { TextField, FormControl, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
// import { Axios } from 'axios';
import axios from "axios"


const CropRecommendationComponent = () => {
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [pH, setPH] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [apiResult, setApiResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      nitrogen === '' ||
      phosphorus === '' ||
      potassium === '' ||
      temperature === '' ||
      humidity === '' ||
      rainfall === '' ||
      pH === ''
    )
      return 'All Fields Are Compulsory';
    const body = {
      N: nitrogen,
      P: phosphorus,
      K: potassium,
      Temperature: temperature,
      Humidity: humidity,
      Rainfall: rainfall,
      Ph: pH
    };

    //  const result = await axios({
    //    method: 'POST',
    //    url: 'http://localhost:5000/crop-recommendation',
    //    body
    //  });

    //  setApiResult(result.data.crop);

    setSubmitted(true);
    setNitrogen('');
    setPhosphorus('');
    setPotassium('');
    setTemperature('');
    setHumidity('');
    setRainfall('');
    setPH('');
  };

  return (
    <>
      <h1
        style={{
          marginBottom: '25px',
          width: '65%',
          //  marginRight: '50px',
          marginLeft: '50px'
        }}
      >
        {submitted
          ? `GrainTech.AI recommends that you plant MANGO based on the inputs provided`
          : 'Crop Recommendation'}
      </h1>
      {submitted ? null : (
        <form autoComplete="off" style={{ width: '40%' ,margin:"0 auto"}} >
          <TextField
            label="Nitrogen"
            onChange={(e) => setNitrogen(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="number"
            sx={{ mb: 1 }}
            fullWidth
            value={nitrogen}
          />
          <TextField
            label="Phosphorus"
            onChange={(e) => setPhosphorus(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="number"
            value={phosphorus}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Potassium"
            onChange={(e) => setPotassium(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="number"
            value={potassium}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Temperature"
            onChange={(e) => setTemperature(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="number"
            value={temperature}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Humidity"
            onChange={(e) => setHumidity(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="number"
            value={humidity}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Rainfall"
            onChange={(e) => setRainfall(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="number"
            value={rainfall}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="pH"
            onChange={(e) => setPH(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="number"
            value={pH}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

const CropRecommendation = MotionHoc(CropRecommendationComponent);

export default CropRecommendation;
