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
        width:'25%',
        marginLeft:'auto',
        marginRight:'auto'
    }
})

class Register extends Component{
    render(){
        const {classes} = this.props
        return(
            <Paper className={classes.card}>
                <Typography component='h1' variant='h3'>Register</Typography>
                <Input placeholder='username' variant='contained' />
                <Input placeholder='password' />
                <Input placeholder='confirm password' />
                <Button>Register</Button>
            </Paper>
        )
    }
}

Register.propTypes ={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Register);