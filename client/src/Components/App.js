import React, { Component } from 'react';
import FooterBar from './LayOut/FooterBar.js';
import MenuTop from './LayOut/MenuTop.js';
import HomePages from './Pages/HomePages.js';
import ConnectCamera from './Pages/ConnectCamera.js';
import Training from './Pages/Training.js';
import AllCamera from './Pages/AllCamera.js';
import'./../css/App.css'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <MenuTop/>



      <Switch>
        <Route path="/ConnectCamera">
          <ConnectCamera/>
        </Route>
        <Route path="/training">
          <Training/>
        </Route>
        <Route path="/ALlCam">
          <AllCamera/>
        </Route>
        <Route path="/">
          <HomePages/>
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
