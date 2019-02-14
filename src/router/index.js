import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Header } from '../containers'
import { Layer, ContactForm } from '../components';
import Routes from './Routes';

class Router extends Component {
  
    componentDidMount() {
      
    }
  
    render() {
  
      return (
        <Layer>
          <BrowserRouter>
              <Fragment>
                <Header />
                <div className="contentWrapper">
                  {renderRoutes(Routes)}
                </div>
      {/*<ContactForm />*/}
              </Fragment>
          </BrowserRouter>
        </Layer>
      );
    }
  }
  
  export default Router;
