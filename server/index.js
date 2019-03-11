// login
// logout
// register

require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const session = require('client-sessions')

const app = express()
app.use(session({
    cookieName: 'user-session',
    secret: process.env.SECRET
}))

app.get('/', (req, res) => {
	res.json('working')
})

app.post('/login', (req, res) => {
	res.json('login route')
})

app.post('/logout', (req, res) => {
	res.json('logout')
})

app.post('/register', (req, res) => {
	res.json('register')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
