import React from "react";
import load from '../../images/loader.gif'
import './Loader.css'

class Loader extends React.Component {
    render() {
        return (
            <div className="loader-container">
                <img className="loader" src={ load }></img>
            </div>
        )
    }
}

export default Loader