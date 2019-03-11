import React, {Component} from 'react';
import Message from './Message/Message.js';
import socket from 'socket.io-client';

//@material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    inputDiv:{
        display:'flex'
    }
})

class ChatRoom extends Component{
    constructor(props){
        super(props);
        this.state={
            messages:[
                {username:'jeff', message:'my name is jeff'},
                {username:'sheev', message:'i am the senate'},
                {username:'jeff', message:'Cool.'}
            ]
        }
    }

    componentDidMount(){
        const {messages} = this.state;

        socket.on('connection', ()=>{
            messages.push({username:'Discord-Clone-Bot', message:'*INSERT USERNAME HERE* has joined the chatroom'})
        })
        socket.on('message', (message)=>{

        })
    }

    render(){
        const {classes} = this.props;
        const {messages} = this.state;
        return(
            <Paper>
                <div>
                    {
                        messages.map((val, i) => {
                            return(
                                <Message key={i} username={val.username} message={val.message} />
                            )
                        })
                    }
                </div>
                <div className={classes.inputDiv}>
                    <TextField fullWidth placeholder='type your message here'/>
                    <Button>Send</Button>
                </div>
            </Paper>
        )
    }
}

ChatRoom.propTypes ={
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(ChatRoom);
