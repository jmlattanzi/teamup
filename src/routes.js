import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './Components/Login/Login.js';
import Register from './Components/Register/Register.js';
import Messages from './Components/Messages/Messages.js';

export default (
    <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/register' component={Register} />
        <Route path='/messages' component={Messages} />
    </Switch>
)