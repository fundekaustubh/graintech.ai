//links to know more about sherbot

import React from 'react';
import './TalkLinks.css';


const TalkLinks=(props)=>{

    const questions = [
        { 
            text : "Bacterial leaf blight", 
            handler: props.actionProvider.handleTalkList1,
            id:1,
        },
        { 
            text:"Citrus greening disease",
            handler:props.actionProvider.handleTalkList2,
            id:2,
        },
        { 
            text:"Red rot",
            handler:props.actionProvider.handleTalkList3,
            id:3,
        },
        { 
            text:"Early blight",
            handler:props.actionProvider.handleTalkList4,
            id:4,
        },
    ];

    const talkMarkup = questions.map((link)=>(
        <button key={link.id} 
        className="talk-links-button"
            onClick={link.handler}>
                {link.text}
            </button>
    ));
    
    return <div className="talk-links-container">{talkMarkup}</div>
};
export default TalkLinks;