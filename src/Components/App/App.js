import React from 'react'
import Header from '../Header/Header'
import MainContent from '../MainContent/MainContent'
import Login from '../Login/Login'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import { dataBaseRefUsers } from '../../api.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    withRouter,
    useLocation
} from 'react-router-dom'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogged: false
        }
        this.login = this.login.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    render() {
        return(
            <Router>
                <Header />
                <Switch>
                    <Route path='/public'>
                        test
                    </Route>
                    <Route path='/login'>
                        <Login login={this.login} />
                    </Route>
                    <PrivateRoute path='/protected'>
                        <MainContent />
                    </PrivateRoute>
                </Switch>
            </Router>

            /*<div>
                <Header />
                { this.state.isLogged 
                    ? <MainContent /> 
                    : <Login login={this.login} />
                }
            </div>*/
        )
    }

    login(username, password, from, history) {
        dataBaseRefUsers.where("email", "==", username).where("password", "==", password).get().then(snapshot => {
            this.checkUser(snapshot, from, history);
        })
    }

    checkUser(snapshot, from, history) {
        let users = [];
        snapshot.forEach(user => {
            users.push({
                id: user.id,
                email: user.data().email,
                password: user.data().password
            });
        })
        if (users.length === 1) {
            this.setState(prevState => {
                let newState = prevState;
                newState.isLogged = true;
                return newState;
            })
            localStorage.setItem('idUser', users[0].id);
            console.log(from)
            history.replace(from);
        }
    }
}

export default App