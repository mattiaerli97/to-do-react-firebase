import React from 'react'
import Header from '../Header/Header'
import MainContent from '../MainContent/MainContent'
import Login from '../Login/Login'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogged: false
        }
        this.login = this.login.bind(this);
    }
    render() {
        return(
            <div>
                <Header />
                { this.state.isLogged 
                    ? <MainContent /> 
                    : <Login login={this.login} />
                }
            </div>
        )
    }

    login(username, password) {
        console.log(username);
        console.log(password);
    }
}

export default App