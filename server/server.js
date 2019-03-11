require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const session = require('client-sessions')
const massive = require('massive')
const bc = require('bcryptjs')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(
	session({
		secret: 'taste the meat not the heat',
		duration: 24 * 60 * 60 * 1000,
		activeDuration: 1000 * 60 * 5,
	})
)

massive(process.env.CONNECTION_STRING)
	.then((db) => {
		app.set('db', db)
	})
	.catch((err) => console.log(err))

app.post('/', (req, res) => {
	console.log(req.body)
	res.json(req.body)
})

app.post('/login', (req, res) => {
	console.log(req.body)
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

app.post('/register', (req, res) => {
	db.find_user(req.body.username)
		.then((results) => {
			if (results[0] && results[0].username) {
				res.json('User already exists')
			} else {
				bc.hash(password, 12)
					.then((hashed) => {
						db.create_user([req.body.username, hashed])
							.then((res) => {
								req.session.user = {
									username: req.body.username,
								}

								res.json(req.session.user)
							})
							.catch((err) => console.log(err))
					})
					.catch((err) => console.log(err))
			}
		})
		.cathc((err) => console.log(err))
})

io.on('connection', (socket) => {
	console.log('user connected')

	socket.on('disconnect', () => {
		console.log('user disconnected')
	})
})

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
