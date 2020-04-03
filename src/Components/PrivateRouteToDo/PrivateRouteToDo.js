import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

class PrivateRouteToDo extends React.Component {
    render() {
        return (
            <Route
              path='/protected/:id'
              render={({ location }) =>
                localStorage.getItem('idUser') ? (
                  this.props.children
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login"
                    }}
                  />
                )
              }
            />
          );
    }
}

export default PrivateRouteToDo