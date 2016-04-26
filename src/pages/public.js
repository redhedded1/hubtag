/**
 * Created by lball on 4/25/16.
 */
import React from 'react';
import Link from '../components/link';

export default React.createClass({
    render(){
        return (
            <Link>
                <nav className='top-nav top-nav-light cf' role='navigation'>
                    <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
                    <label htmlFor='menu-toggle'>Menu</label>
                    <ul className='list-unstyled list-inline cf'>
                        <li>Labelr</li>
                        <li><a href='/repos'>Repos</a></li>
                        <li className='pull-right'><a href='/logout'>Logout</a></li>
                    </ul>
                </nav>
                <div className='container'>
                    <header role='banner'>
                        <h1>Labelr</h1>
                    </header>
                    <div>
                        <p>We label stuff for you, because, we can&trade;</p>
                        <a href='/login' className='button button-large'>
                            <span className='mega-octicon octicon-mark-github'></span> Login with GitHub
                        </a>
                    </div>
                </div>
            </Link>
        )
    }
});