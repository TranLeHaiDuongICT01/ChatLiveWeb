const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const router = require('./Router/router')
const cors = require('cors')
const { addUser,
    removeUser,
    getUser,
    getUsersInRoom } = require('./users')

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
})
app.use(cors())
app.use('/', router)

io.on('connect', (socket) => {
    // console.log('New user connection!');

    socket.on('join', ({ name, room }, callback) => {
        // console.log(name, room);
        // console.log(socket.id);
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) {
            return callback(error)
        }
        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })
        // console.log(getUsersInRoom(user.room));
        socket.join(user.room)
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room).users })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        // console.log(socket.id);
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { room: user.room, text: message })
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })
        }
    })
})


const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

