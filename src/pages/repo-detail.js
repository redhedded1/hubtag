/**
 * Created by lball on 4/26/16.
 */
import React from 'react';
import githubAuthMixin from '../helpers/github-auth-mixin';

export default React.createClass({
    mixins: [githubAuthMixin],
    displayName: 'RepoDetail',
    render(){
        const {repo} = this.props;
        return (
            <div className='container'>
                <h1>{repo.full_name}</h1>
                <p></p>
                <ul></ul>
            </div>
        )
    }
});