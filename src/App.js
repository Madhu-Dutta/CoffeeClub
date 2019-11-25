import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Components/Home';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register';
import PostRecord from './Components/postRecord';
import EditRecord from './Components/editRecord';

function App() {
  return (
    <BrowserRouter>
        <React.Fragment>
            <Switch>
              <Route exact path='/' component={Landing} />
              {/* Edit & Post Records path */}
              <Route exact path="/edit/:id" component={EditRecord} />
              <Route exact path="/postRecord" component={PostRecord} />
              <Route path='/Login' component={Login} />
              <Route path='/Register' component={Register} />
              <Route path='/Home' component={Home} />
              
            </Switch>
        </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
