import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';

class Router extends Component {
  
    componentDidMount() {
      
    }
  
    render() {
  
      return (
        <BrowserRouter>
          <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
      );
    }
  }
  
  export default Router;
