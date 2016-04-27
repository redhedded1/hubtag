/**
 * Created by lball on 4/26/16.
 */
import React from 'react';
import ampersandMixin from 'ampersand-react-mixin';
import LabelList from '../components/label-list';

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'RepoDetail',
    onAddClick(){
        // pass in attributes and it will create object
        // collection is sorted, so add to top (at:0)

        // also btw you can't add more than one because model has name as id, and name is empty on add, so as
        // a funny side effect it won't let you add more than one, so don't have to write that logic preventing
        // a bunch of add label forms from appearing on the add new button clicks - it will only add one
        this.props.labels.add({
            name:'',
            color:'',
            editing: true,
            saved: false
        }, {at:0})
    },
    render(){
        const {repo, labels} = this.props;
        return (
            <div className='container'>
                <h1>{repo.full_name}</h1>
                <p>
                    <button onClick={this.onAddClick} className="button">Add New</button>
                </p>
                <ul>
                    {labels.map((label) =>
                        <LabelList key={label.cid} label={label} />
                    )}
                </ul>
            </div>
        )
    }
});