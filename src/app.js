import Router from './router';
import styles from './styles/main.styl';
import app from 'ampersand-app';
import User from './models/user';

window.app = app;

app.extend({
    init(){
        this.user = new User();
        this.router = new Router();
        this.router.history.start();
    }
});

app.init();

//import React from 'react';
//import styles from './styles/main.styl';
//
//const Hello = React.createClass({
//    render(){
//        return <div>Hello, {this.props.name}</div>
//    }
//});
//
//React.render(<Hello name="Whatever Your Name Is"/>, document.body);
//
