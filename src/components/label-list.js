/**
 * Created by lball on 4/26/16.
 */
import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import {Modal, Button, Alert} from 'react-bootstrap'

export default React.createClass({
    mixins: [ampersandMixin],
    displayName: 'LabelList',
    onEditClick(event){
        event.preventDefault()
        this.props.label.editing = true
    },
    onCancelClick(event){
        event.preventDefault()
        const {label} = this.props
        if(label.saved){
            this.props.label.editing = false
            this.setState(this.getInitialState())
        }else{
            label.destroy()
            this.hideModal()
        }
    },
    showModal() {
        this.setState({showModal: true});
    },

    hideModal() {
        this.setState({showModal: false});
    },
    onDeleteClick(event){
        event.preventDefault()
        this.showModal()
        // if(window.confirm('Are you sure?')){
        //     this.props.label.destroy({
        //         success: function(){
        //             console.log('successful delete')
        //         },
        //         error: function(){
        //             console.log('delete FAILED')
        //         }
        //     })
        // }
        // could also do this to wait until ajax call completes to remove object
        // this.props.label.destroy({wait:true})
    },
    destroy(event){
        event.preventDefault()

        this.props.label.destroy({
            success: function(){
                console.log('successful delete')
            },
            error: function(){
                console.log('delete FAILED')
            }
        })
    },
    getInitialState(){
        const {name, color, showModal} = this.props.label //ES6 destructuring

        return{name, color, showModal}
    },
    // https://developer.github.com/v3/issues/labels/#update-a-label
    // PATCH /repos/:owner/:repo/labels/:name
    // name and color as strings are required (no '#' on the color)
    // - usually patch is a partial update this is more like a put
    // - also name is in the url, what if name is changed, then url you build 404s
    // so we are going to add a custom update method to label.js model
    onNameChange(event){
        event.preventDefault()
        this.setState({
            name: event.target.value
        })
    },
    onColorChange(event){
        event.preventDefault()
        this.setState({
            color: event.target.value.slice(1)
        })
    },
    onSubmit(event){
        event.preventDefault()
        const {label} = this.props

        if(label.saved){
            label.update(this.state) // we don't need to extract from form we have attributes tracked in state
        }else{
            // if(Object.keys(this.state).length !== 0 &&
            //     JSON.stringify(this.state) !== JSON.stringify({})){
            //     debugger
            if(this.state.name && this.state.color){ // make sure user is not saving empty values
                label.save(this.state, { // go ahead and pass the saved state to model session.saved
                    success: function(){
                        label.saved = true
                    }
                })
            }else{
                label.editing = false
                label.destroy()
                // this.setState(this.getInitialState())
            }
        }

        label.editing = false // close form
    },
    render(){
        const {label} = this.props  // ES6 destructuring - can't reassign variable (reference will not change), but does not mean the object will not change
        // const cssColor = '#' + label.color
        const {color} = this.state
        const cssColor = '#' + color
        let content, modal

        //debugger

        modal = (
            <Modal show={this.state.showModal} onHide={this.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure?</h4>
                    <p>Do you really want to delete this label forever?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.hideModal}>Close</Button>
                    <Button onClick={this.destroy} bsStyle="danger">Delete</Button>
                </Modal.Footer>
            </Modal>
        )

        // editing
        if (label.editing) {
            content = (
                <form onSubmit={this.onSubmit} className='label'>
                    <span style={{backgroundColor:cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
                    <input name='name' onChange={this.onNameChange} value={this.state.name} />
                    <input name='color' onChange={this.onColorChange} value={cssColor} />
                    <Button type='submit' className='button button-small'>Save</Button>
                    <Button onClick={this.onCancelClick} type='button' className='button button-small button-unstyled'>Cancel</Button>
                </form>
            )
        } else {
            content = (
                <div className='label'>
                    <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
                    <span>{label.name}</span>
                    <span className='octicon octicon-pencil' onClick={this.onEditClick}></span>
                    <span className='octicon octicon-x' onClick={this.onDeleteClick}></span>
                </div>
            )
        }

        return (
            <div>
                {content}
                {modal}
            </div>
        )
    }
})

// Removing a label from an issue on GitHub
// https://developer.github.com/v3/issues/labels/#remove-a-label-from-an-issue
// DELETE /repos/:owner/:repo/issues/:number/labels/:name
// https://ampersandjs.com/docs/#ampersand-model-destroy

// React and forms
// if give input a value, you can't edit it, unless you specify what to do when value changes
// React's onChange event fires when the value changes, whether typed or pasted in, immediately
// (usually onChange occurs onBlur)