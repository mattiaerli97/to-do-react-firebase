import React from 'react';
import './Toast.css'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

class Toast extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
    }

    render() {
        return (
            <div id="toast"><div id="img"><CheckCircleOutline /></div><div id="desc">{this.state.message}</div></div>
        )
    }

    showToast(textMessage) {
        this.setState({ message: textMessage });
        let app = this;
        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function(){ 
            x.className = x.className.replace("show", "");
            app.setState({ message: '' });
        }, 5000);
    }
}

export default Toast