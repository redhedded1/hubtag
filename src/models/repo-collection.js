/**
 * Created by lball on 4/25/16.
 */
import Collection from 'ampersand-rest-collection';  // extends collection with RESTful methods
import Repo from './repo';
import githubAuthMixin from '../helpers/github-auth-mixin';

export default Collection.extend(githubAuthMixin, {
    url: 'https://api.github.com/user/repos',
    model: Repo 
})