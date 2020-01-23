import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route 
          {...props} 
          render={props => (
            (localStorage.getItem('Logged In User') !== '' || localStorage.getItem('Logged In User') !== 'null') ?
              <Component {...props} /> :
              <Redirect to='/' />
          )} 
        />
      )
    }
  }

export default ProtectedRoute;