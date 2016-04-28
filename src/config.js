/**
 * Created by lball on 4/27/16.
 */
const config = {
    'localhost': {
        'authUrl': 'https://labelr-github.herokuapp.com/authenticate',
        'clientId': 'f7cc363e5212d928942a'
    },
    'labelr-lball.surge.sh': {
        'authUrl': 'https://frozen-bayou-10981.herokuapp.com/authenticate',
        'clientId': '398c58a95e9d417a9a02'
    }
}[location.hostname]

export default config