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
		margin: '0 auto',
		padding: '30px 10px 20px 10px',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		border: '1px solid #eee',
	},

	form: {
		display: 'flex',
		flexDirection: 'column',
		margin: '10px 20px',
	},

	submit: {
		width: '30%',
		margin: '10px auto',
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
				<form onSubmit={(e) => this.submitLogin(e)} className={classes.form}>
					<Input
						placeholder='username'
						name='username'
						onChange={(e) => this.handleChange(e)}
						required
					/>
					<Input placeholder='image url' name='imgURL' onChange={(e) => this.handleChange(e)} />
					<Button type='submit' className={classes.submit}>
						Login
					</Button>
				</form>
			</Paper>
		)
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
