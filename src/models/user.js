/**
 * Created by lball on 4/25/16.
 */
import Model from 'ampersand-model';
import githubAuthMixin from '../helpers/github-auth-mixin';
import RepoCollection from './repo-collection'

// bind token to local storage


// https://developer.github.com/v3/users/
// route is GET /user

export default Model.extend(githubAuthMixin, {
    url: 'https://api.github.com/user',
    initialize(){
        this.token = window.localStorage.token;
        this.on('change:token', this.onTokenChange);
    },
    onTokenChange(){
        window.localStorage.token = this.token;
        this.fetchInitialData();
    },
    props: {
        // for data from the server that we want
        // to persist and send back to the server
        id: 'number',
        login: 'string',
        avatar_url: 'string'
    },
    session: {
        // data to keep in the browser
        token: 'string'
    },
    // always create a repo collection when creating the user model; a collection within the user model
    collections:{
        repos: RepoCollection
    },
    fetchInitialData(){
        if (this.token) {
            this.fetch();  // ampersand method that does an xhr request and sets the model to the resulting json
            this.repos.fetch(); // fetch the repos collection defined above
        }
    }
});