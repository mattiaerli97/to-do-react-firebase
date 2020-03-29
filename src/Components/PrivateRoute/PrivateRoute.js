import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

class PrivateRoute extends React.Component {
    render() {
        return (
            <Route
              render={({ location }) =>
                localStorage.getItem('idUser') ? (
                  this.props.children
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: location }
                    }}
                  />
                )
              }
            />
          );
    }
}

export default PrivateRoute