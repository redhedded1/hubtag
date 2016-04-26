import Router from './router';
import styles from './styles/main.styl';
import app from 'ampersand-app';
import User from './models/user';
import icons from 'octicons/octicons/octicons.css';

window.app = app; // so we can access it from the console

app.extend({
    init(){
        this.user = new User();
        this.user.fetchInitialData();
        this.router = new Router();
        this.router.history.start(); //singleton that tracks history
    }
});

app.init();

// Using ampersaqnd, this is a singleton; every time called, we get the same instance of the object
// you can use this to trigger events components might listen for
// don't overuse and complicate this
// https://ampersandjs.com/docs/#ampersand-app