require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const session = require('client-sessions')
const massive = require('massive')
const bc = require('bcryptjs')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(
	session({
		secret: 'taste the meat not the heat',
		duration: 24 * 60 * 60 * 1000,
		activeDuration: 1000 * 60 * 5,
	})
)
app.use(cors())

massive(process.env.CONNECTION_STRING)
	.then((db) => {
		app.set('db', db)
	})
	.catch((err) => console.log(err))

app.post('/', (req, res) => {
	console.log(req.body)
	res.json(req.body)
})

app.post('/login', async (req, res) => {
	console.log('req.body: ', req.body)
	const db = req.app.get('db')
	db.find_user(req.body.username)
		.then((results) => {
			if (results[0] && results[0].username) {
				bc.compare(req.body.password, results[0].hash).then((isAuth) => {
					if (isAuth) {
						req.session.user = {
							id: results[0].id,
							username: username,
						}
						res.json(req.session.user)
					} else {
						res.json('Invalid password')
					}
				})
			}
		})
		.catch((err) => console.log(err))
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
