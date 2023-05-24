import React, {useEffect, useState} from 'react';
import './App.css';
import * as icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Circles} from "react-loader-spinner";

function App() {
    const [api, setApi] = useState("")
    const [loader, setLoader] = useState(false)
    const [icon, setIcon] = useState("");
    const [message, setMessage] = useState(null)
    const Icon = icon ? icons[icon] : null;
    const iconsMaxNumber = Object.keys(icons).length

    const getApi = async () => {
        try {
            const response = await fetch(
                'https://6409e587d16b1f3ed6e069fe.mockapi.io/items')
            const data = await response.json()
            setApi(data[0].api)
        } catch (error) {
            console.warn(error)
        }
    }

    const getMessages = async () => {
        setMessage(null)
        setLoader(true)
        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${api}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: 'случайное предсказание астролога основываясь на картинке с именем' + icon.slice(2, icon.length)}],
                max_tokens: 500,
            })
        }
        try {
            const response = await fetch(
                'https://api.openai.com/v1/chat/completions', options)
            const data = await response.json()
            setMessage(data.choices[0].message)
            setLoader(false)
        } catch (error) {
            console.warn(error)
        }
    }

    function randomInteger() {
        let rand = 0 - 0.5 + Math.random() * (iconsMaxNumber - 0 + 1);
        setIcon((Object.keys(icons)[Math.round(rand)]));
    }
    useEffect(() => {
        getMessages()
        getApi()
    }, [icon])

    return (
        <div className="App">
            <button className="random-icon-button" onClick={() => {
                randomInteger()
            }}>Discover your destiny
            </button>

            <div className="chat-container">
                <p className="chat-message">{message  ? message?.content :        <Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    style={{display:"flex", alignItems:'center'}}
                    wrapperClass="chat-message"
                    visible={true}
                />}</p>
            </div>
            {icon ? (
                <div className='icon' onClick={() => getMessages()}>
                    <FontAwesomeIcon icon={Icon}/>
                </div>
            ) : (
                <span className='text'></span>
            )}
        </div>
    );
}

export default App;
