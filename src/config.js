/**
 * Created by lball on 4/27/16.
 */
const config = {
    'localhost': {
        'authUrl': 'https://labelr-github.herokuapp.com/authenticate/',
        'clientId': 'f7cc363e5212d928942a'
    },
    'labelr.surge.sh': {
        'authUrl': '',
        'clientId': ''
    }
}[window.location.hostname]

export default config