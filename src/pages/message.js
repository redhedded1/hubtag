/**
 * Created by lball on 4/27/16.
 */
import React from 'react'

export default React.createClass({
    displayName: 'MessagePage',
    render(){
        const {title, body} = this.props
        return (
            <div>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        )
    }
})