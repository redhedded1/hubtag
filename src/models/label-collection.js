/**
 * Created by lball on 4/26/16.
 */
import Collection from 'ampersand-rest-collection';  // extends collection with RESTful methods
import Label from './label';
import githubAuthMixin from '../helpers/github-auth-mixin'; // could create a base model with this method
                                                            // and extend that instead of ampersand model
// https://developer.github.com/v3/issues/labels/#list-all-labels-for-this-repository
// GET /repos/:owner/:repo/labels

export default Collection.extend(githubAuthMixin, {
    url(){
        return this.parent.url() + '/labels';
    },
    model: Label
})