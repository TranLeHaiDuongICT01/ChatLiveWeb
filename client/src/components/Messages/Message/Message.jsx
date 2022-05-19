import React from 'react'
import ReactEmoji from 'react-emoji'
import './message.css'
const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false
    const trimName = name.trim().toLowerCase()
    if (user === trimName) {
        isSentByCurrentUser = true
    }
    return <React.Fragment>
        {isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )}
    </React.Fragment>
}

export default Message