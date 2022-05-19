import React from 'react'
import onlineIcon from '../../Icons/onlineIcon.png'

import './textContainer.css'
const TextContainer = ({ users }) => {
    // console.log(users);
    return (
        <div className="textContainer">
            <div>
                <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
                <h2>Created with React, Express, Node and Socket.io <span role="img" aria-label="emoji" >❤️</span></h2>
                <h2>Try it out right now! <span role="img" aria-label="emoji" >⬅️</span></h2>
            </div>

            {
                users &&
                <div>
                    <h1>Peple currently chatting:</h1>
                    <div className="activeContainer">
                        <h2>
                            {users.map(({ name }) => {
                                return (
                                    <div key={`${name}room`} className="activeItem">
                                        {name}
                                        <img src={onlineIcon} alt="Online Icon" />
                                    </div>
                                )
                            })}
                        </h2>
                    </div>
                </div>
            }
        </div>
    )
}

export default TextContainer