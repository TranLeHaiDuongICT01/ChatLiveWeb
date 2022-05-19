import './chat.css'
import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
let socket

const Chat = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState()
    const location = useLocation()
    const END_POINT = 'https://react-chat-live-realtime.herokuapp.com/'
    const [rendered, setRendered] = useState(false)
    const [rendered2, setRendered2] = useState(false)
    useEffect(() => {
        if (rendered) {
            const { name, room } = queryString.parse(location.search)
            // socket = io(END_POINT, { transports: ['websocket'] })
            socket = io(END_POINT, {
                cors: {
                    origin: "https://react-chat-live-realtime.herokuapp.com/",
                    credentials: true
                }, transports: ['websocket']
            });
            setName(name)
            setRoom(room)
            socket.emit('join', { name, room }, () => {

            })
            // return () => {
            //     socket.emit('disconnect')
            //     socket.off()
            // }
        } else {
            setRendered(true)
        }
    }, [location.search, rendered])

    useEffect(() => {
        if (rendered2) {
            if (socket) {
                socket.on('message', (message) => {
                    setMessages(([...messages, message]))
                })
                socket.on('roomData', ({ users }) => {
                    setUsers(users)
                })
            }
            // console.log(message, messages);
        } else {
            setRendered2(true)
        }
    }, [rendered2, messages, message])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }

    return (
        <div className="outerContainer">
            <div className='container'>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat