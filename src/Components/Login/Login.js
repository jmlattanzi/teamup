import React, { Component } from 'react'

//@material-ui imports
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const styles = (theme) => ({
	card: {
		display: 'flex',
		flexDirection: 'column',
		width: '25%',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
})

class Login extends Component {
	constructor() {
		super()

		this.state = {
			username: '',
			imgURL: '',
		}

		this.submitLogin = this.submitLogin.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	submitLogin(e) {
		e.preventDefault()
		axios
			.post('/login', { username: this.state.username })
			.then((res) => {
				console.log(res)
				this.props.history.push('/chatroom')
			})
			.catch((err) => console.log(err))
	}

	render() {
		const { classes } = this.props
		return (
			<Paper className={classes.card}>
				<Typography component='h1' variant='h3'>
					Login
				</Typography>
				<form onSubmit={(e) => this.submitLogin(e)}>
					<Input placeholder='username' name='username' onChange={(e) => this.handleChange(e)} />
					<Input placeholder='image url' name='imgURL' onChange={(e) => this.handleChange(e)} />
					<Button type='submit'>Login</Button>
				</form>
			</Paper>
		)
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
