import React, {useEffect, useState} from 'react';
import "./predictor.css"
import * as icons from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Circles} from "react-loader-spinner";
import {getMessages} from "../utils/getMessages";
import {getApi} from "../utils/getApi";


function Predictor() {
    const [api, setApi] = useState("")
    const [icon, setIcon] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null)
    const Icon = icon ? icons[icon] : null;
    const iconsMaxNumber = Object.keys(icons).length

    function randomInteger() {
        let rand = 0 - 0.5 + Math.random() * (iconsMaxNumber - 0 + 1);
        setIcon((Object.keys(icons)[Math.round(rand)]));
    }
    useEffect(() => {
        getMessages(api,icon,setMessage,setLoading)
        getApi(setApi)
    }, [icon])

    return (
        <div className="Predictor">
            <button className="random-icon-button" onClick={() => {randomInteger()
            }}>Discover your destiny
            </button>
            <div className="chat-container">
                <p className="chat-message">{message && !loading ? message?.content :
                    <Circles
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperClass="circle"
                        visible={true}
                    />
                }
                </p>
            </div>
            {icon ? (
                <div className='icon' >
                    <FontAwesomeIcon icon={Icon}/>
                </div>
            ) : (
                <span className='text'>Default text</span>
            )}
        </div>
    );
}

export default Predictor;
