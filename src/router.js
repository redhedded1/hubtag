/**
 * Created by lball on 12/8/15.
 */

import app from 'ampersand-app';
import React from 'react';
import xhr from 'xhr';
import qs from 'qs';
import Router from 'ampersand-router';
import PublicPage from './pages/public';
import ReposPage from './pages/repos';
import Layout from './layout';
import RepoDetail from './pages/repo-detail';

// returning a function because this will execute when we require routes
// need function to execute ***later***
function requiresAuth(fn){
    return function(){
        if(app.user.token){
            this[fn].apply(this, arguments);
        }else{
            this.redirectTo('/');
            alert("You must login to access GitHub repositories");
        }
    }
}

export default Router.extend({
    renderPage(page, opts = {layout: true}){
        if (opts.layout) {
            page = (
                <Layout user={app.user}>
                    {page}
                </Layout>
            )
        }
        React.render(page, document.body);
    },
    routes: {
        '': 'public', //as of ES5 we can use reserved words as property names
        'repos': requiresAuth('repos'),
        'login': 'login',
        'logout': 'logout',
        'repo/:owner/:name': requiresAuth('repoDetail'),
        'auth/callback?:query': 'authCallback' // ?:query extracts just the query string
    },
    public(){
        this.renderPage(<PublicPage/>, {layout: false});
    },
    repos(){
        this.renderPage(<ReposPage repos={app.user.repos}/>);
    },
    repoDetail(owner, name){
        const model = app.user.repos.getByFullName(owner + '/' + name);
        this.renderPage(<RepoDetail repo={model} labels={model.labels} />);
    },
    // https://developer.github.com/v3/oauth/#web-application-flow
    // https://github.com/settings/applications
    login(){
        window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
                client_id: 'f7cc363e5212d928942a',
                // window.location.origin is domain and port
                // dynamic so don't have to change when go to production
                redirect_uri: window.location.origin + '/auth/callback',
                scope: 'user,repo'
            })
    },
    authCallback(query){
        query = qs.parse(query);
        console.log(query);
        // Gatekeeper is the microservice we will use to keep the secret secure
        // https://github.com/prose/gatekeeper

        // xhr just does a get
        xhr({
            url: 'https://labelr-github.herokuapp.com/authenticate/' + query.code,
            json: true
        }, (err, req, body) => {
            console.log('body', body)
            app.user.token = body.token;
            this.redirectTo('/repos'); // replace in history, but do not store in history
            // equivalent to this.history.navigate('/repos', {replace: true})
            // window.location would do a full refresh and using the back button would invalidate
            // the token
        });
    },
    logout(){
        window.localStorage.clear();
        window.location = '/';
    }
});