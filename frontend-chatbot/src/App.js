import { Route, Switch, useLocation } from 'react-router';
import Sidebar from './Sidebar';
import Home from './Pages/Home';
import Team from './Pages/Team';
import CropRecommendation from './Pages/CropRecommendation';
import DiseasePrediction from './Pages/DiseasePrediction';
import Projects from './Pages/Projects';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import ActionProvider from './components/ActionProvider';
import MessageParser from './components/MessageParser';
import config from './config';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './App.css';

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Sidebar />
      <Pages>
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Home} />
            <Route path="/team" component={Team} />
            <Route path="/crop-recommendation" component={CropRecommendation} />
            <Route path="/disease-prediction" component={DiseasePrediction} />
            <Route path="/projects" component={Projects} />
          </Switch>
        </AnimatePresence>
      </Pages>
      {/* </> */}
    </div>
  );
}

export default App;
