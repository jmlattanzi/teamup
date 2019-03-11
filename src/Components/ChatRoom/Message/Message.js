import React, {Component} from 'react';
//@material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    div:{
        display:'flex',
        alignItems:'center',
        
    },

    messageText:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        marginLeft:10,
    }
})

class Message extends Component{
    render(){
        const {classes, username, message} = this.props;
        return(
            <div className={classes.div}>
                <Avatar>T</Avatar>
                <div className={classes.messageText}>
                    <Typography component='p' variant='subheading'>{username}</Typography>
                    <Typography component='p' variant='subheading'>{message}</Typography>
                </div>
            </div>
        )
    }
}

Message.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Message);