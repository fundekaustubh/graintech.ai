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
      {/* <p style={{paddingLeft: '50px', paddingRight: '50px', fontSize: '20px'}}>{text}</p> */}
      <p style={{paddingLeft: '50px', paddingRight: '50px', fontSize: '20px'}}>
तुमच्या बटाट्याच्या झाडांवरील इशारा झालेल्या एका उशीरा रोगाबद्दल मला दु:ख आहे. येथे काही चरणदर्शिका आहेत ज्यामुळे तुम्ही रोगाच्या प्रबंधनासाठी मदत करू शकता:

लक्षणे ओळखा: उशीरा रोग हे बटाट्याच्या झाडांवर खालील पानांवरील छोट्या, वृत्ताकार वळणे दाखवते. या वळण्यांमध्ये गहरा तपकिरीतीचा काळा किंवा काळं असतो आणि दुसरे वळणे संयुक्त असू शकतात. इंफेक्टेड पाने अंततः पिवळ्या होतात आणि मात्र यील्डमध्ये कमी येऊ शकते.

इंफेक्टेड पाने काढा: इंफेक्टेड झाडे ओळखल्यानंतर, झाडांमधून इंफेक्टेड पाने काढा. हा रोग इतर झाडांवर पसरण्याचे टाळण्यासाठी मदत करू शकतो. इंफेक्टेड पाने तुमच्या शेतापासून असावे किंवा त्यांना ज्वारपाटीवर टाका किंवा रोगाचे प्रसार कमी करण्यासाठी उजळी दाखवू नका.

फँगिसायड लागवड करा: रोगाचे प्रसार नियंत्रित करण्यासाठी झाडे फँग</p>
      {/* <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100vh',
          width: '30%',
          textAlign: 'center'
        }}
      >
        <h2>Zom The Chatbot!</h2> */}
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
