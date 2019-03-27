import React from 'react';
import { Route } from 'react-router-dom';

import {
  Home, 
  About
} from 'pages';
import { Menu } from 'components';



const App = () => {
  return (
    <div>
      <Menu/>
      <Route exact path="/" component={Home}/>
      <Route path="/about/:name?" component={About}/>
    </div>
  );

  /*
  about과 about/name이 같이 표시되는 현상에 대해서 해결하는 방법은 
  1. 
  <Route exact path="/about" component={About}/>
  <Route path="/about/:name" component={About}/>

  2. 
  <Route path="/about/:name?" component={About}/>


  */
};

export default App;
