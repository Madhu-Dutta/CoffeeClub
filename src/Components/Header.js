import React, { Component } from 'react';
import {Button, Row, Col} from 'reactstrap';
import {Redirect, Link} from 'react-router-dom';
import homelogo from '../Styles/Images/homelogo.png';

export default class Header extends Component {
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
                                <Button id="btn-balance">
                                    <Link to="/myExpenses" style={{color: 'white'}}>
                                        My Expenses
                                    </Link>
                                </Button>  
                        <Row>                            
                            <Col md={12}>
                                <Button id="btn-balance">
                                    <Link to="/PastHistory" style={{color: 'white'}}>PastHistory</Link>
                                </Button>   
                                <Button id="btn-balance">
                                    <Link to="/balance" style={{color: 'white'}}>Balance</Link>
                                </Button>                            
                                <Button id="btn-notification">
                                    <Link style={{color: 'white'}} to="/Approval">Approval</Link>
                                </Button>
                            </Col>
                        </Row>
                    </div>                    
                </div>
        )
    }
}
