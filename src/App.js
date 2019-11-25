import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Components/Home';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register';
import PostRecord from './Components/PostRecord';
import EditRecord from './Components/EditRecord';

function App() {
  return (
    <BrowserRouter>
        <React.Fragment>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/Login' component={Login} />
              <Route path='/Register' component={Register} />
              <Route path='/Home' component={Home} />
              {/* Edit & Post Records path */}
                <Route exact path="/edit/:id" component={EditRecord} />
                <Route path="/PostRecord" component={PostRecord} />
            </Switch>
        </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
