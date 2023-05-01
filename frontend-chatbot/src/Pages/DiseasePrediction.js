import MotionHoc from "./MotionHoc";
import React, { useState } from 'react';
import { TextField, FormControl, Button, Paper } from '@mui/material';


const DiseasePredictionComponent = () => {

  const [picture, setPicture] = useState(null)
  const [upload,setUpload]=useState(false);
  const [submit,setSubmit]=useState(false);

  const onChange=(e)=>{
    setPicture(e.target.files[0])
    setUpload(true);
    console.log(e.target.files)
  }

  const handleSubmit=()=>{
    setSubmit(true)
    setUpload(false)
    console.log()
  }

  return <>
  <h1>Disease Prediction</h1>
  {!submit && <input onChange={onChange} type="file" /> }
  <br/>
  {upload ? <img key={picture} src={URL.createObjectURL(picture)} style={{height:"50%",width:"50%"}} />
 : null}
 <div>
  {!submit && <Button
    variant="outlined"
    color="secondary"
    type="submit"
    onClick={handleSubmit}
  >
    Submit
  </Button>}
  <br/>
  {!upload && submit?
  <p style={{width:"50%",textAlign:"center",marginLeft:"25%"}}>I'm sorry to hear about the early blight disease affecting your potato plants. Here are some stepwise instructions that may help you manage the disease: Identify the symptoms: Early blight disease is characterized by the appearance of small, circular lesions on the lower leaves of the potato plants. These lesions are dark brown or black and may have concentric rings. The infected leaves eventually turn yellow and die, which can lead to a reduction in yield. Remove infected leaves: Once you have identified the infected plants, remove the infected leaves from the plants. This can help prevent the disease from spreading to other plants. Be sure to dispose of the infected leaves far away from your field or burn them to avoid spreading the disease further. Apply fungicide: Apply a suitable fungicide to the plants to control the spread of the disease. Copper-based fungicides are often effective in controlling early blight. Follow the instructions on the fungicide label for dosage and application frequency. Depending on the severity of the disease, you may need to apply the fungicide every 7-10 days for several weeks. Practice crop rotation: To prevent the recurrence of early blight disease in the future, practice crop rotation. Do not plant potatoes or any other related crops (such as tomatoes) in the same field for at least two years. This will help break the disease cycle and reduce the incidence of early blight. Practice good field hygiene: Keep your field clean and free of debris, such as infected leaves and stems, to prevent the disease from spreading. Remove any infected potato tubers before they can infect healthy plants. The total duration of these steps can vary depending on the severity of the disease and the size of your field. Regular monitoring of the plants and prompt action can help minimize the damage and reduce the duration of the disease.</p>
  :"Please submit image"}
</div>
  </>;

};

const DiseasePrediction = MotionHoc(DiseasePredictionComponent);

export default DiseasePrediction;
