import React, { Component } from 'react';
import {Button, Row, Col} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import homelogo from '../Styles/Images/homelogo.png';

export default class Home extends Component {
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
                    <div className="balance-wrapper">
                        <Row>
                            <Col md={12}>
                                <Button id="btn-balance">Balance</Button>                            
                                <Button id="btn-notification">Notifications</Button>
                            </Col>
                        </Row>
                    </div>                    
                </div>

                <div className="contents">

                </div>


            </div>             
        )
    }
}
