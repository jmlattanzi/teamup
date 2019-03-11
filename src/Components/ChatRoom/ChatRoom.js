import React, {Component} from 'react';

//@material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ChatRoom extends Component{
    render(){
        return(
            <Paper>
                <div>
                    <TextField placeholder='type your message here'/>
                </div>
            </Paper>
        )
    }
}

export default ChatRoom;
