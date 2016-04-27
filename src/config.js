/**
 * Created by lball on 4/27/16.
 */
const config = {
    'localhost': {
        'authUrl': 'https://labelr-github.herokuapp.com/authenticate/',
        'clientId': 'f7cc363e5212d928942a'
    },
    'labelr.surge.sh': {
        'authUrl': 'https://labelr-github-prod.herokuapp.com/authenticate/',
        'clientId': '398c58a95e9d417a9a02'
    }
}[window.location.hostname]

export default config