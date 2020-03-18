import React from 'react';
import './Toast.css'

class Toast extends React.Component {
    render() {
        return (
            <div id="toast"><div id="img">Icon</div><div id="desc">A notification message..</div></div>
        )
    }

    showToast() {
        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    }
}

export default Toast