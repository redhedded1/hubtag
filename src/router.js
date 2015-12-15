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

export default Router.extend({
    renderPage(page, opts = {layout: true}){
        if (opts.layout) {
            page = (
                <Layout>{page}</Layout>
            )
        }
        React.render(page, document.body);
    },
    routes: {
        '': 'public',
        'repos': 'repos',
        'login': 'login',
        'auth/callback?:query': 'authCallback'
    },
    public(){
        this.renderPage(<PublicPage/>, {layout: false})
    },
    repos(){
        this.renderPage(<ReposPage/>)
    },
    login(){
        window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
                client_id: 'f7cc363e5212d928942a',
                redirect_uri: window.location.origin + '/auth/callback',
                scope: 'user,repo'
            })
    },
    authCallback(query){
        query = qs.parse(query);
        console.log(query);

        xhr({
            url: 'https://labelr-github.herokuapp.com/authenticate/' + query.code,
            json: true
        }, (err, req, body) => {
            console.log(body)
            app.user.token = body.token;
        })
    }
});