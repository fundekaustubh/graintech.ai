import MotionHoc from "./MotionHoc";
import React, {useState} from "react";
import { TextField, FormControl, Button ,Paper} from "@mui/material";
import { Link } from "react-router-dom"

const CropRecommendationComponent = () => {

  const [nitrogen, setNitrogen] = useState("")
  const [phosphorus, setPhosphorus] = useState("")
  const [potassium, setPotassium] = useState("")
  const [temperature, setTemperature] = useState("")
  const [humidity, setHumidity] = useState("")
  const [rainfall, setRainfall] = useState("")
  const [pH, setPH] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
 
        setNitrogen("")
        setPhosphorus("")
        setPotassium("")
        setTemperature("")
        setHumidity("")
        setRainfall("")
        setPH("")
        
    }

  return (
    <>
  <React.Fragment>        
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Crop Recommendation</h2>
            {/* <Paper> */}
                <TextField 
                    label="Nitrogen"
                    onChange={e => setNitrogen(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    // sx={{
                    //   mb:1,
                    //   width:{sm:200,md:400}
                    // }}
                    sx={{mb:1,width:{sm:150, md:300}}}
                    fullWidth
                    value={nitrogen}
                 />
                 <TextField 
                    label="Phosphorus"
                    onChange={e => setPhosphorus(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={phosphorus}
                    fullWidth
                    // sx={{
                    //   mb:1,
                    //   width:{sm:200,md:400}
                    // }}     
                    sx={{mb:1}}
                  />
                 <TextField 
                    label="Potassium"
                    onChange={e => setPotassium(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={potassium}
                    fullWidth
                    sx={{mb: 1}}
                 />
                 {/* <TextField 
                    label="Temperature"
                    onChange={e => setTemperature(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={temperature}
                    fullWidth
                    sx={{mb: 1}}
                 />
                 <TextField 
                    label="Humidity"
                    onChange={e => setHumidity(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={humidity}
                    fullWidth
                    sx={{mb: 1}}
                 />
                 <TextField 
                    label="Rainfall"
                    onChange={e => setRainfall(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={rainfall}
                    fullWidth
                    sx={{mb: 1}}
                 />
                 <TextField 
                    label="pH"
                    onChange={e => setPH(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={pH}
                    fullWidth
                    sx={{mb: 1}}
                 /> */}
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
       {/* </Paper>       */}
        </form>
        {/* <small>Need an account? <Link to="/">Register here</Link></small> */}
        </React.Fragment>
  
  </>
  );
};

const CropRecommendation = MotionHoc(CropRecommendationComponent);

export default CropRecommendation;
