import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Signup from './components/signup';
import Home from './components/home';
import registerServiceWorker from './registerServiceWorker';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import { HashRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/signup" component={Signup} />
            <Route path="/home/:token" component={Home} />
        </Switch>
    </HashRouter>
    , document.getElementById('root'));
registerServiceWorker();
