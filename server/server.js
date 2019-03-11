require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const bc = require('bcryptjs')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(
	session({
		secret: 'taste the meat not the heat',
		resave: false,
		saveUninitialized: true,
		duration: 24 * 60 * 60 * 1000,
		activeDuration: 1000 * 60 * 5,
	})
)

app.use(cors())
app.use(json())

app.post('/login', (req, res) => {
	req.session.user = {
		username: req.body.username,
		imageURL: req.body.imgURL,
	}

	res.json('logged in')
})

app.get('/getuser', (req, res) => {
	res.json(req.session.user)
})

io.set('origins', '*:*')
io.on('connection', (socket) => {
	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on('message', (message) => {
		io.emit('message', message)
	})
})

const PORT = 3001
http.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
