import React, {useEffect, useState} from 'react';
import './App.css';
import * as icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const API_KEY = process.env.REACT_APP_API

function App() {
  const [value, setValue] = useState("")
  const [icon, setIcon] = useState("");
  const [message, setMessage] = useState(null)
  const [trigger, setTrigger] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [prevChat, setPrevChat] = useState([])
  const Icon = icon ? icons[icon] : null;
  const iconsMaxNumber = Object.keys(icons).length
  const getMessages = async () => {
    console.log(API_KEY)
    console.log('test')
    setMessage(null )
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: 'случайное предсказание в стиле астрологического гороскопа основываясь на картинке с именем'  + icon.slice(2,icon.length) }],
        max_tokens: 500,
      })
    }
    try {
      const response = await fetch(
          'https://api.openai.com/v1/chat/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    } catch (error) {
      console.warn(error)
    }
  }
  function randomInteger() {
    let rand = 0 - 0.5 + Math.random() * (iconsMaxNumber - 0 + 1);
    setIcon((Object.keys(icons)[Math.round(rand)]));
  }
  useEffect(() => {
    if (rendered === true) {

      setTimeout(() => randomInteger(), 2000);
    }
    if ( value && message) {
      setPrevChat((prevChat) => (
          [...prevChat,
            {
              content: value
            },
            {
              content: message.content
            }
          ]
      ))
    }
    getMessages()
    setRendered(true)
  }, [trigger]);

  console.log(prevChat)

  return (
      <div className="App">
        <button className="random-icon-button" onClick={() => {
          setTrigger(!trigger)
        }}>Get random icon

        </button>
        <div className="chat-container">
          <p className="chat-message">{message?.content}</p>
        </div>
        {icon ? (
            <div  className='icon' onClick={()=>  getMessages()} >
              <FontAwesomeIcon icon={Icon}/>
            </div>
        ) : (
            <span className='text'>Discover your destiny</span>
        )}
      </div>
  );
}

export default App;
