/**
 * Created by lball on 4/25/16.
 */
import app from 'ampersand-app'; // need to import to do fetch with auth

export default{
    ajaxConfig(){ // lets you return an object to modify the request headers
        return {
            headers: {
                Authorization: 'token ' + app.user.token  // from github api docs
            }
        }
    }
}