/**
 * Created by lball on 4/25/16.
 */
import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';

export default React.createClass({
    mixins: [ampersandMixin],   // again this checks the props and attaches the change handler
                                // prop in this case is "repos" on <ReposPage/> in router.js
                                // at this point we don't have the data
                                // this way we do not have to care about the timing

    render(){
        const {repos} = this.props;
        return (
            <div>
                <h2>Repos</h2>
                <ul>
                    {repos.map((repo) =>
                        <li key={repo.id}><span className="octicon octicon-repo"></span> <a href={repo.appUrl}>{repo.full_name}</a></li>
                    )}
                </ul>
            </div>
            
        )
    }
});

// in the map function shorthand, when the {} block is not specified
// the return statement is implied
// react wants a unique key on iterated children so it knows what changed

// Want to use github's icons for UX https://octicons.github.com/
// https://www.npmjs.com/package/octicons