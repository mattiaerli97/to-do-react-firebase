import React from 'react'
import './NotFound.css'
import Button from '../Button/Button'
import {
    withRouter
} from 'react-router-dom'

class NotFound extends React.Component {
    constructor() {
        super()
        this.handleReturnToLists = this.handleReturnToLists.bind(this);
    }

    render() {
        return (
            <div className='not-found'>
                PAGE NOT FOUND
                <Button 
                    text="Return to lists"
                    handleClick={this.handleReturnToLists}
                ></Button>
            </div>
        )
    }

    handleReturnToLists() {
        this.props.history.push('/lists');
    }
}

export default withRouter(NotFound)