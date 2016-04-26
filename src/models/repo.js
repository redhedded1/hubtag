/**
 * Created by lball on 4/25/16.
 */
import Model from 'ampersand-model';

// https://developer.github.com/v3/repos/#list-your-repositories

export default Model.extend({
    props:{
        id: 'number',
        name: 'string',
        full_name: 'string'
    }
})