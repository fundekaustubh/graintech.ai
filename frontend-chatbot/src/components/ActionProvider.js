import config from '../config';

// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  //default
  //handleDefault = () => {
  //    const message = this.createChatBotMessage(
  //    "I'm sorry .I didn't get that. How can I help? Here is the overview.",
  //   {
  //     withAvatar: true,
  //     widget: "sherbotOptions",
  //   }
  // );

  // this.updateChatbotState(message);
  // };

  //function to render message and widgets when gaming sherbot option is clicked
  handleGamingList = () => {
    const message1 = this.createChatBotMessage(
      'You can contact us via email at vishal.gondke@spit.ac.in',
      {
        widget: 'gamingLinks',
        withAvator: true
      }
    );
    this.updateChatbotState(message1);
  };

  //function to render message and widgets when webdev sherbot option is clicked
  handleWebList = () => {
    const message1 = this.createChatBotMessage(
      'There are several common fertilizers used for crops, including:',
      {
        widget: 'webLinks',
        withAvator: true
      }
    );
    this.updateChatbotState(message1);
  };

  //function to render message and widgets when YT LINKS sherbot option is clicked
  handleYTList = () => {
    const message1 = this.createChatBotMessage(
      'Here are approximate market rates for common crops in India',
      {
        widget: 'ytLinks',
        withAvator: true
      }
    );
    this.updateChatbotState(message1);
  };

  //function to render message and widgets when talkLINKS sherbot option is clicked
  handleTalkList = () => {
    const message1 = this.createChatBotMessage(
      'Here is the list of some of the common plant disesaes, you may click on each one of them to get an idea of a probable cause',
      {
        widget: 'talkLinks',
        withAvator: true
      }
    );

    this.updateChatbotState(message1);
  };

  //question1
  handleTalkList1 = () => {
    const message1 = this.createChatBotMessage(
      'Bacterial leaf blight: This disease affects rice plants and is caused by the bacterium Xanthomonas oryzae. It appears as water-soaked lesions on the leaves, which turn yellow and eventually die. The disease can cause significant yield losses.',
      {
        withAvator: true
      }
    );

    this.updateChatbotState(message1);
  };

  //question2
  handleTalkList2 = () => {
    const message1 = this.createChatBotMessage(
      'Citrus greening disease: Also known as Huanglongbing (HLB), this disease affects citrus plants and is caused by the bacterium Candidatus Liberibacter. It causes yellowing and blotchy mottling of the leaves, stunted growth, and bitter, misshapen fruit.',
      {
        withAvator: true
      }
    );

    this.updateChatbotState(message1);
  };

  //question3
  handleTalkList3 = () => {
    const message1 = this.createChatBotMessage(
      'Red Rot: This fungal disease affects sugarcane plants and is caused by the fungus Colletotrichum falcatum. It appears as red, sunken lesions on the stalks, which can cause them to break and reduce yield.',
      {
        withAvator: true
      }
    );

    this.updateChatbotState(message1);
  };

  //question4
  handleTalkList4 = () => {
    const message1 = this.createChatBotMessage(
      'Early blight: This fungal disease affects tomato plants and is caused by the fungus Alternaria solani. It appears as brown spots on the leaves, which can cause defoliation and reduce yield.',
      {
        withAvator: true
      }
    );

    this.updateChatbotState(message1);
  };

  //function to render message and widgets when music sherbot option is clicked
  handleMusicList = () => {
    const message1 = this.createChatBotMessage(
      "Here are some of the portals that you may use to seek Government's help",
      {
        widget: 'musicLinks',
        withAvator: true
      }
    );
    this.updateChatbotState(message1);
  };

  //other messages
  greet() {
    const greetingMessage = this.createChatBotMessage(
      "Hello, I'm the GrainTech chatbot. How may I help you?"
    );
    this.updateChatbotState(greetingMessage);
  }

  // greet1() {
  //   const greetingMessage = this.createChatBotMessage('Da.');
  //   this.updateChatbotState(greetingMessage);
  // }
  // greet2() {
  //   const greetingMessage = this.createChatBotMessage('mindset');
  //   this.updateChatbotState(greetingMessage);
  // }
  // greet3() {
  //   const greetingMessage = this.createChatBotMessage('Do you love me?');
  //   this.updateChatbotState(greetingMessage);
  // }
  //greet4(){
  //  const greetingMessage = this.createChatBotMessage("I'm sorry I didn't catch that.")
  // this.updateChatbotState(greetingMessage)
  //}

  //farewell
  farewell() {
    const greetingMessage = this.createChatBotMessage(
      'Hope you enjoyed your time with me, goodbye!',
      {
        end: true
      }
    );
    this.updateChatbotState(greetingMessage);
  }

  updateChatbotState(message) {
    // NOTE: This function is set in the constructor, and is passed in
    //from the top level Chatbot component. The setState function here
    // actually manipulates the top level state of the Chatbot, so it's
    //important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
