import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Components/Home';
// import Landing from './Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register';


function App() {
  return (
    <BrowserRouter>
        <React.Fragment>
            <Switch>
              {/* <Route exact path='/' component={Landing} /> */}
              <Route exact path='/' component={Login} />
              <Route path='/Register' component={Register} />
              <Route path='/Home' component={Home} />
            </Switch>
        </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
