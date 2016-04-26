/**
 * Created by lball on 4/25/16.
 */
import Model from 'ampersand-model';
import githubAuthMixin from '../helpers/github-auth-mixin';
import LabelCollection from './label-collection';
// https://developer.github.com/v3/repos/#list-your-repositories

export default Model.extend(githubAuthMixin, {
    url(){
        return 'https://api.github.com/repos/' + this.full_name;  // get repo per github api
    },
    props: {
        id: 'number',
        name: 'string',
        full_name: 'string'
    },
    // derived properties can also depend on each other, fire change events, and depend on child models
    derived: {
        appUrl: {
            deps: ['full_name'],
            fn(){
                return '/repo/' + this.full_name
            }
        }
    },
    // make labels a child model of repos
    collections: {
        labels: LabelCollection
    },
    fetch(){
        // every JS fn has call and apply methods
        // call takes a comma-separated list of arguments to the fn
        // apply takes an array of args to the fn
        Model.prototype.fetch.apply(this, arguments);
        this.labels.fetch();
    }
})