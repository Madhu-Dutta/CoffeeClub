import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Components/Home';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Register from './Components/Register';
import PostRecord from './Components/postRecord';
import EditRecord from './Components/editRecord';
import Balance from './Components/balance';
import Approval from './Components/approval';
import Pending from './Components/Pending';

import { AuthProvider } from "./state/Auth/AuthContext";
import PastHistory from './Components/pastHistory';
import MyExpenses from './Components/myExpenses';

export default class App extends React.Component {

  state = {
    userId: null
  };

  getAuthContext = () => ({
    userId: this.state.userId,
    setUserId: id => this.setState({ userId: id })
  });

  render(){
  return (
    <AuthProvider value={this.getAuthContext()}>
    <BrowserRouter>
        <React.Fragment>
            <Switch>
              <Route exact path='/' component={Landing} />

              <Route path='/Login' component={Login} />
              <Route path='/Register' component={Register} />
              <Route path='/Home' component={Home} />

              {/* Edit & Post Records path */}
              <Route exact path="/edit/:id" component={EditRecord} />
              <Route exact path="/postRecord" component={PostRecord} />
              <Route exact path="/pastHistory" component={PastHistory} />
              <Route exact path="/myExpenses" component={MyExpenses} /> 
              
              <Route path="/balance" component={Balance}/>
              <Route path="/approval" component={Approval}/>
              <Route path="/Pending" component={Pending}/>
              
            </Switch>
        </React.Fragment>
    </BrowserRouter>
    </AuthProvider>
  );
  }
}

