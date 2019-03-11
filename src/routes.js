import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Components/Login/Login.js';
import Register from './Components/Register/Register.js';
import ChatRoom from './Components/ChatRoom/ChatRoom.js';

export default (
    <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/register' component={Register} />
        <Route path='/chatroom' component={ChatRoom} />
    </Switch>
)
