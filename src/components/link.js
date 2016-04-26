/**
 * Created by lball on 4/25/16.
 */
import app from 'ampersand-app';
import React from 'react';
// we want links to hover and show link in the status bar,
// so need them to be just an anchor tag
// need to know if local or external link
// want to determine if user is holding down a modifier key
// this local-links library deals with all these details for us
import localLinks from 'local-links';

export default React.createClass({
    displayName: 'Link',
    onClick(event){     //synthetic event, can get rawEvent but don't need it ever
        // synthetic event has the usual stuff developers need
        const pathname = localLinks.getLocalPathname(event);
        // check if link is local, if so
        // prevent normal browser action
        // route to internal path
        if(pathname){
            event.preventDefault();
            app.router.history.navigate(pathname);
        }
    },
    render(){
        return(
            <div {...this.props} onClick={this.onClick}>
                {this.props.children}
            </div>
        )
    }
});

