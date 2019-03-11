import React, { Component } from 'react'
import Message from './Message/Message.js'
import firebase from '../../firebase.js'

//@material-ui imports
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import socket from 'socket.io-client'
import axios from 'axios'

const styles = (theme) => ({
	container: {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		overflow: 'auto',
	},

	messageContainer: {
		height: '620px',
		overflow: 'auto',
	},

	inputDiv: {
		display: 'flex',
		padding: '10px',
		width: '90%',
	},

	inputField: {
		display: 'flex',
		width: '100%',
	},

	inputBox: {
		minWidth: '100%',
	},

	submitButton: {
		margin: '0 15px',
	},
})

class ChatRoom extends Component {
	constructor(props) {
		super(props)
		this.state = {
			socket: socket(),
			username: '',
			imageURL: '',
			input: '',
			messages: [],
		}

		this.handleChange = this.handleChange.bind(this)
		this.submitMessage = this.submitMessage.bind(this)
	}

	componentDidMount() {
		const { messages, socket } = this.state
		axios
			.get('/getuser')
			.then((res) => {
				console.log(res.data.username)
				this.setState({
					...this.state,
					username: res.data.username,
					imageURL: res.data.imgURL,
				})

				return this.state.username
			})
			.then((user) => {
				socket.on('connect', () => {
					this.setState({
						...this.state,
						messages: [...this.state.messages, { username: 'BœrT', message: `${user} connected` }],
					})
				})
			})
			.catch((err) => console.log(err))

		firebase
			.database()
			.ref(`/messages`)
			.once('value')
			.then((snapshot) => {
				if (snapshot.val()) {
					console.log(snapshot.val(), 'UPDATE MESSAGES')
					if (snapshot.val()) this.setState({ messages: snapshot.val().messages })
				}
			})

		socket.on('message', (message) => {
			console.log(message)
			this.setState({
				...this.state,
				messages: [
					...this.state.messages,
					{ username: message.username, message: message.message },
				],
			})
		})
	}

	componentWillUnmount() {
		socket.on('disconnect', () => {
			socket.disconnect()
		})
	}

	handleChange(e) {
		this.setState({ input: e.target.value })
	}

	submitMessage(e) {
		e.preventDefault()

		this.setState({
			input: '',
		})

		const { socket, messages } = this.state
		socket.emit('message', {
			username: this.state.username,
			message: this.state.input,
		})

		messages.push({ username: this.state.username, message: this.state.input })
		console.log('LOOK AT ME', messages)
		firebase
			.database()
			.ref('messages')
			.set({ messages })
		messages.pop()
	}

	render() {
		const { classes } = this.props
		const { messages, socket } = this.state
		console.log(messages, 'OVER HERE')
		return (
			<Paper className={classes.container}>
				<div className={classes.messageContainer}>
					{messages.map((val, i) => {
						return <Message username={val.username} message={val.message} />
					})}
				</div>
				<div className={classes.inputDiv}>
					<form onSubmit={(e) => this.submitMessage(e)} className={classes.inputField}>
						<TextField
							placeholder='type your message here'
							value={this.state.input}
							onChange={(e) => this.handleChange(e)}
							className={classes.inputBox}
						/>
						<Button type='submit' className={classes.submitButton}>
							Send
						</Button>
					</form>
				</div>
			</Paper>
		)
	}
}

ChatRoom.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChatRoom)
