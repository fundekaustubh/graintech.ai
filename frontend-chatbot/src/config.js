import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import SherbotOptions from './components/SherbotOptions';
import LinkList from './components/LinkList';
import BotAvatar from './components/BotAvatar';
import TalkLinks from './components/TalkLinks';

const config = {
  botName: 'GrainTech.AI Chatbot',
  initialMessages: [
    createChatBotMessage("Hello! I'm the GrainTech.AI chatbot."),

    createChatBotMessage(
      "I'm here to help or chat with you. What do you want to go ahead with?",
      {
        widget: 'sherbotOptions'
      }
    )
  ],
  //initialMessages property from the config is put into
  //the chatbot's internal state in a property called "messages"

  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />
  },

  customStyles: {
    botMessageBox: {
      backgroundColor: '#000000'
    },
    chatButton: {
      backgroundColor: '#000000'
    }
  },

  widgets: [
    {
      widgetName: 'sherbotOptions',
      widgetFunc: (props) => <SherbotOptions {...props} />
    },

    {
      widgetName: 'gamingLinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          // {
          //   text: "Sherbot's Fav : PUBG",
          //   url: 'https://www.pubg.com/',
          //   id: 1
          // },
          // {
          //   text: "Assassin's Creed Valhalla",
          //   url: 'https://www.ubisoft.com/en-us/game/assassins-creed/valhalla',
          //   id: 2
          // },
          // {
          //   text: 'Prince of Persia 🤴',
          //   url: 'https://www.ubisoft.com/en-us/game/prince-of-persia/',
          //   id: 3
          // }
        ]
      }
    },

    {
      widgetName: 'webLinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: 'Urea',
            url: 'https://extension.usu.edu/yardandgarden/research/urea-a-low-cost-nitrogen-fertilizer-with-special-management-requirements#:~:text=Summary,in%20a%20soil%20fertility%20program.',
            id: 1
          },
          {
            text: 'Ammonium nitrate',
            url: 'https://www.cropnutrition.com/resource-library/ammonium-nitrate#:~:text=Ammonium%20nitrate%20is%20a%20popular,immediately%20available%20for%20plant%20uptake.',
            id: 2
          },
          {
            text: 'Seaweeds',
            url: 'https://en.wikipedia.org/wiki/Seaweed_fertiliser#:~:text=Because%20seaweed%20is%20rich%20in,contributing%20to%20improved%20crop%20growth.',
            id: 3
          },
          {
            text: 'Compost',
            url: 'https://www.compostingcouncil.org/page/PlantGrowthBenefits#:~:text=Compost%20helps%20plant%20growth%20by,soil%20contributing%20to%20healthier%20growth.',
            id: 4
          },
          {
            text: 'Bone meal',
            url: 'https://jobescompany.com/blog/what-does-bone-meal-do-for-garden/#:~:text=Bone%20meal%20increases%20phosphorous%20in,flowers%2C%20fruits%2C%20and%20vegetables.',
            id: 5
          }
        ]
      }
    },

    {
      widgetName: 'ytLinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: 'Wheat: Rs. 21 to 23 per kg',
            // url: 'https://www.youtube.com/channel/UCR4z8ccOWNoUThB4VAMNBTg',
            id: 1
          },
          {
            text: 'Rice: Rs. 35 to 40 per kg',
            // url: 'https://www.youtube.com/channel/UCSri6c58uWro3kLTlcuFlVA',
            id: 2
          },
          {
            text: 'Potatoes: Rs. 20 to 25 per kg',
            // url: 'https://www.youtube.com/channel/UC7_gcs09iThXybpVgjHZ_7g',
            id: 3
          },
          {
            text: 'Onions: Rs. 20 to 25 per kg',
            // url: 'https://www.youtube.com/channel/UCVYamHliCI9rw1tHR1xbkfw',
            id: 4
          },
          {
            text: 'Cauliflower: Rs. 20 to 30 per kg',
            // url: 'https://www.youtube.com/channel/UCx9bOYEjkevIDYONBAstK-A',
            id: 5
          }
        ]
      }
    },

    {
      widgetName: 'talkLinks',
      widgetFunc: (props) => <TalkLinks {...props} />
    },

    {
      widgetName: 'musicLinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: 'Agriculture - National Portal of India',
            url: 'https://www.india.gov.in/topics/agriculture',
            id: 1
          },
          {
            text: 'Farmer Portal',
            url: 'https://farmer.gov.in/',
            id: 2
          },
          {
            text: 'mKisan',
            url: 'https://mkisan.gov.in/',
            id: 3
          }
          // {
          //   text: 'Enigma Platinum Collection',
          //   url: 'https://www.youtube.com/watch?v=Jdn1j86xDdY&list=PL2sPxDN9Hp0oK0EahHN-JBUm0Fr3FfGE1',
          //   id: 4
          // },
          // {
          //   text: 'Coke Studio Quarantine Playlist',
          //   url: 'https://www.youtube.com/watch?v=kw4tT7SCmaY&list=PLlYsrzDvIU9QhMdfnJCrPS9XGtxJV0yIu',
          //   id: 5
          // }
        ]
      }
    }
  ]
};

export default config;
