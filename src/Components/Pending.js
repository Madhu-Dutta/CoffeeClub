import React, { Component } from 'react';
import {Button} from 'reactstrap';
import homelogo from '../Styles/Images/homelogo.png';
import {Redirect} from 'react-router-dom';

export default class Pending extends Component {
    constructor(props){
        super(props);
        this.state={
            redirect: false
        }
    }
    logout = () => {
        console.log("Logging out");
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }
        return (
        <div>
        <div className="header-home">      
            <div className="text-right">
                <Button 
                    id="logout"
                    onClick={this.logout}
                >Logout</Button>
            </div>     
            <div className="text-center">
                <img className="thumbnail homelogo" width="16%" src={homelogo} alt="HomeLogo" />
            </div>                            
        </div>
        <div className="container">
            Pending Approval ......
        </div> 
        </div>
        )
    }
}
