/**
 * Created by lball on 4/25/16.
 */
import Collection from 'ampersand-rest-collection';  // extends collection with RESTful methods
import Repo from './repo';
import githubAuthMixin from '../helpers/github-auth-mixin';

export default Collection.extend(githubAuthMixin, {
    url: 'https://api.github.com/user/repos',
    model: Repo,
    getByFullName(fullName){
        let model = this.findWhere({full_name: fullName});

        if(!model){
            model = new Repo({full_name: fullName});
        }

        // attempt to fetch if do not already have locally
        model.fetch();

        return model;
    }
})