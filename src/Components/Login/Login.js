import React from 'react'
import './Login.css'
import Button from '../Button/Button'
import {
    withRouter
} from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.updateMail = this.updateMail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    render() {
        let history = this.props.history
        let location = history.location;

        let { from } = location.state || { from: { pathname: '/protected' } };

        return (
            <div className='login-wrapper'>
                <label htmlFor='email_text'>
                    <b>
                        Email
                    </b>
                </label>
                <input
                    value={this.state.email}
                    id='email_text' 
                    type='text'
                    onChange={this.updateMail}
                ></input>
                <br />
                <label htmlFor='password_text'>
                    <b>
                        Password
                    </b>
                </label>
                <input
                    value={this.state.password}
                    id='password_text' 
                    type='password'
                    onChange={this.updatePassword}
                ></input>
                <div className="button-slot-login">
                    <Button 
                        text="Login"
                        handleClick={(event) => 
                            this.props.login(
                                    this.state.email, 
                                    this.state.password,
                                    from,
                                    history
                                )
                            }
                    />
                </div>
            </div>
        )
    }

    updateMail(event) {
        let val = event.target.value;
        this.setState(prevState => {
            let newState = prevState;
            newState.email = val; 
            return newState;
        })
    }

    updatePassword(event) {
        let val = event.target.value;
        this.setState(prevState => {
            let newState = prevState;
            newState.password = val; 
            return newState;
        })
    }
}

export default withRouter(Login)