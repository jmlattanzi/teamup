import React, { Component } from 'react'
//@material-ui imports
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const styles = (theme) => ({
	div: {
		display: 'flex',
		alignItems: 'center',
		margin: '10px',
	},

	messageText: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginLeft: '20px',
    },
    username:{
        fontWeight:'bold'
    },
    avatar:{
        border:'1px solid black',
        backgroundColor:'gray'
    }
})

class Message extends Component {
	render() {
		const { classes, username, message } = this.props
		return (
			<div className={classes.div}>
				<Avatar src={`https://robohash.org/${username}.png`} className={classes.avatar}></Avatar>
				<div className={classes.messageText}>
					<Typography component='p' variant='subheading' className={classes.username}>
						{username}
					</Typography>
					<Typography component='p' variant='subheading'>
						{message}
					</Typography>
				</div>
			</div>
		)
	}
}

Message.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Message)
