import React from "react";

import "./SherbotOptions.css";

//options component that will guide the user to possible options.

const SherbotOptions = (props) => {
    const options = [
        {
            text : "Contact Us", 
            handler: props.actionProvider.handleGamingList,
            id:1,
        },
        {
            text : "Common Fertilizers",
            handler:props.actionProvider.handleWebList,
            id:2,
        },
        {
            text : "Common plant diseases", 
            handler:props.actionProvider.handleTalkList,
            id:3,
        },
        {
            text : "Current Market price of some crops",
            handler:props.actionProvider.handleYTList,
            id:4,
        },
        {
            text : "Government help", 
            handler:props.actionProvider.handleMusicList,
            id:5,
        },
    ];


    const optionsMarkup = options.map((option) => (
        <button 
        className="sherbot-option-button"
        key={option.id}
        onClick={option.handler}>
            {option.text}
        </button>
    ));

    return <div className="sherbot-options-container">{optionsMarkup}</div>
};



export default SherbotOptions;