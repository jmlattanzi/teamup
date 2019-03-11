import React,{Component} from 'react';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Login extends Component{
    render(){
        return(
            <Card>
                <Input placeholder='username' />
                <Input placeholder='password' />
                <Button>Login</Button>
            </Card>
        )
    }
}

export default Login;