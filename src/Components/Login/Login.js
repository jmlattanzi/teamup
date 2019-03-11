import React,{Component} from 'react';


//@material-ui imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card:{
        display:'flex',
        flexDirection:'column',
        width:'33%',
        marginLeft:'auto',
        marginRight:'auto'
    }
})

class Login extends Component{
    constructor() {
        super()

        this.submitLogin = this.submitLogin.bind(this)
    }

    submitLogin(e) {
        console.log('Login submit')
    }

    render(){
        const {classes} = this.props
        return(
            <Paper className={classes.card}>
                <Typography component='h1' variant='h3'>Login</Typography>
                <Input placeholder='username' />
                <Input placeholder='password' />
                <Button>Login</Button>
            </Paper>
        )
    }
}

Login.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);