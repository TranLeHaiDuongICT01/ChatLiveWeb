const users = []

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find(user => user.room === room && user.name === name)
    if (existingUser && existingUser.length > 0) {
        return { error: 'Username is taken' }
    }

    const user = { id, name, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => {
    const usersRoom = users.filter(user => user.room === room)
    // console.log(usersRoom);
    // if (usersRoom && usersRoom.length > 0)
        return { users: usersRoom }
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}