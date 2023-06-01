import { useEffect, useState } from 'react';
import MotionHoc from './MotionHoc';
import Axios from 'axios';
import { translate } from '@vitalets/google-translate-api';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../components/ActionProvider';
import MessageParser from '../components/MessageParser';
import config from '../config';

const HomeComponent = () => {
  const [text, setText] = useState('');

  const handleTranslate = async () => {
    const translatedText = await translate(
      'As a farmer in India, you may be facing a difficult situation if your apple plants are suffering from Cedar apple rust. This is an infectious fungal disease that can cause serious damage to the foliage, flowers and fruit of many types of apple trees. Fortunately, there are steps you can take to manage this disease and protect your plants. The first step is to consult with an expert in plant disease management. An experienced consultant will be able to assess the severity of the infection and advise on a course of action for treating it. The total duration for this step depends on how quickly you can get in touch with an expert who is knowledgeable about Cedar apple rust, but it should not take more than a couple days or weeks at most. The second step involves applying fungicide sprays as directed by the plant disease consultant. These sprays act as preventative treatments that disrupt the life cycle of Cedar apple rust fungi and reduce their ability to spread throughout your orchard or farm. It usually takes about two weeks for these treatments to become effective, so it\'s important that you follow all instructions provided by your consultant carefully during this period. Finally, pruning any infected branches on affected trees will help reduce the spread of Cedar Apple Rust further into healthy parts of your farm or orchard environment. Pruning should be done carefully as some branches may still contain active spores which could spread even after they have been cut off from the tree – so make sure you wear protective clothing while doing this! The duration for this step depends on how many infected branches need pruning but typically takes no more than a day if done properly with appropriate tools and safety gear. By following these steps closely according to advice received from a qualified plant disease management expert, you should be able to successfully manage Cedar Apple Rust on your farm and protect both its foliage and fruit-bearing potential over time!',
      {
        to: 'mr'
      }
    );
    console.log('Translated text: ', translatedText);
    setText(translatedText.text);
    return translatedText;
  };

  // useEffect(() => {
  //   handleTranslate();
  // }, []);

  return (
    <div
    style={{ width: "75%", marginLeft: '75px' }}
    >
      <h1>Home</h1>
      <p style={{width:"75%",textAlign:"center",marginLeft:"17%", fontFamily:"sans-serif",fontSize:"25px"}}>Introducing <span style={{color:"green",fontWeight:"bolder"}}>GrainTech.ai</span> - your ultimate solution for precision agriculture! Our cutting-edge technology accurately predicts plant diseases and recommends the best crops to sow based on your soil conditions. You can boost your crop yield, reduce waste, and maximize profits.</p>
      {/* <form style={{ width: '100%' }}>
          <input type="text" />
        </form> */}
      {/* <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      /> */}
      {/* </div> */}
    </div>
  );
};

const Home = MotionHoc(HomeComponent);

export default Home;
