/**
 * Created by lball on 4/26/16.
 */
import Model from 'ampersand-model';
import githubAuthMixin from '../helpers/github-auth-mixin';
import xhr from 'xhr';

export default Model.extend(githubAuthMixin, {
    // set the id of the model very simply like below
    idAttribute: 'name',
    props:{
        name: 'string',
        color: 'string'
    },
    session:{
        //put state on model in case we need elsewhere
        editing:{
            type:'boolean',
            default:false
        },
        // on save determines whether to put or post based on if there is an id
        // on new label we are supplying the name which is the id
        // so we need to be able to track whether or not this has been saved or not (exists)
        saved:{
            type:'boolean',
            default:true
        }
    },
    // override existing isNew() method
    isNew(){
        return !this.saved;
    },
    update(attributes){
        // https://ampersandjs.com/docs/#ampersand-state-getattributes
        const oldAttributes = this.attributes({props:true, session:false}); // just get props - don't want editing to be set to true if fails with error
        xhr({
            url: this.url(),
            json: attributes,
            method: 'PATCH',
            headers: {
                Authorization: 'token ' + app.user.token
            }
        }, (err, req, body) =>
            {
                if (err) {
                    this.set(oldAttributes); // just have props - name && color
                    console.error('something went wrong with update');
                }
            }
        );
        this.set(attributes);
    }
});