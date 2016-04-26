/**
 * Created by lball on 4/25/16.
 */
import React from 'react';
import Link from './components/link';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins:[ampersandMixin], // when component mounts to DOM, runs a function
                            // to check if any props are models or collections
                            // if so, it registers a change handler, debounced
                            // https://github.com/AmpersandJS/ampersand-react-mixin/blob/master/ampersand-react-mixin.js
                            // why this is cool - we aren't diff'ing the entire dom, just this component is re-rendered
                            // when the model is changed
    displayName: 'Layout',
    render(){
        const {user} = this.props;  // extracts props assigned to Layout, e.g., in router.js
                                    // ES6; called a destructuring assignment
        return (
            <Link>
                <nav className='top-nav top-nav-light cf' role='navigation'>
                    <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
                    <label htmlFor='menu-toggle'>Menu</label>
                    <ul className='list-unstyled list-inline cf'>
                        <li>Labelr</li>
                        <li><a href='/repos'>Repos</a></li>
                        <li className='pull-right'><a href='/logout'>Logout</a> {user.login}</li>
                    </ul>
                </nav>
                <div className='container'>
                    {this.props.children}
                </div>
            </Link>
        )
    }
})