import React from 'react';
import './Toast.css'

class Toast extends React.Component {
    constructor() {
        super()
        this.state = {
            message: '',
            icon: null,
        }
    }

    render() {
        return (
            <div id="toast">
                <div id="img">
                    {this.state.icon}
                </div>
                <div id="desc">
                    {this.state.message}
                </div>
            </div>
        )
    }

    showToast(icon, textMessage) {
        this.setState({
            message: textMessage,
            icon: icon
        });
        let app = this;
        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function(){ 
            x.className = x.className.replace("show", "");
            app.setState({ 
                message: '', 
                icon: null
            });
        }, 5000);
    }
}

export default Toast