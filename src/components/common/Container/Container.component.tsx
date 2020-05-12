import React from 'react';
import { Router } from '@reach/router';

import Home from '../../../pages/home';
import About from '../../../pages/about';
import Dashboard from '../../../pages/dashboard';
import Components from '../../../pages/components';

const Container = ()=>{
    return (
        <div className="container-xl">
            <Router>
              <Home path="/" />
              <About path="/about" />
              <Dashboard path="/dashboard" />
              <Components path="/components" />
            </Router>
        </div>
    )
};

export default Container;