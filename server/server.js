require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const session = require('client-sessions')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(
	session({
		cookieName: 'user-session',
		secret: 'taste the meat not the heat',
		duration: 24 * 60 * 60 * 1000,
		activeDuration: 1000 * 60 * 5,
	})
)

app.get('/', (req, res) => {
	res.json('catch all')
})

io.on('connection', (socket) => {
	console.log('user connected')

	socket.on('disconnect', () => {
		console.log('user disconnected')
	})
})

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
