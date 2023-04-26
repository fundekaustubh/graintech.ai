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
    // const result = await Axios.
    const translatedText = await translate(
      'Light blight is a fungal disease that affects potato plants.',
      {
        to: 'mr'
      }
    );
    console.log('Translated text: ', translatedText);
    setText(translatedText.text);
    return translatedText;
  };

  useEffect(() => {
    handleTranslate();
  }, []);

  return (
    <div
    // style={{ padding: '100px' }}
    >
      <h1>Home</h1>
      <h2>{text}</h2>
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
