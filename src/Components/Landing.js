import React, { Component } from 'react';
import {Form, FormGroup, Container, Input} from 'reactstrap';
import logo from '../Styles/Images/logo.png';

export default class Landing extends Component {
    redirectLogin = () => {
        this.props.history.push("/Login");
    }
    redirectSignup = () => {
        this.props.history.push("/Register");
    }
    render() {
        return (
            <Container>
                <div className="header">               
                    <img src={logo} alt="Logo" />
                </div>  
                         
                <Form>
                    <FormGroup>                       
                        <Input 
                        type="button" 
                        onClick={this.redirectSignup} 
                        value="Sign Up" 
                        id="Regbtn"
                        />
                    </FormGroup> 
                    <FormGroup>
                        <Input 
                        type="button" 
                        onClick={this.redirectLogin} 
                        value="Log In" 
                        id="Logbtn"
                        />
                    </FormGroup>  
                </Form>              
            </Container>       
        )
    }
}
