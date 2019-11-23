import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        //Initial state
        this.state = {
            Email: '',
            Password: ''
        }

    }

    handleUsernameChange = (e) => {
        this.setState({ Email: e.target.value });
    }
    //Password update on input text change
    handlePasswordChange = (e) => {
        this.setState({ Password: e.target.value });
    }
    //OnClick event on the login button
    login = (e) => {
        e.preventDefault();

        // debugger;
        fetch('http://coffe-club.azurewebsites.net/api/Login/login', {
        // fetch('http://localhost:51248/api/Login/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.Email,
                Password: this.state.Password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result.Status === 'Invalid')
                    alert('Invalid User');
                else
                    this.props.history.push("/Register");
            })

    }

    render() {

        return (
            <div id="container">
                <div className="header">
                    <h2 className="text-center">Log In</h2>
                    <div className="text-center">to continue to site</div>
                    <hr />
                </div>
                <div className="msg-block"></div>

                <Form name="form" onSubmit={this.login}>

                    <FormGroup>
                        <Input
                        type="text" 
                        className="form-control" 
                        onChange={this.handleUsernameChange} 
                        name="Email" 
                        placeholder="Email" 
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                        type="password" 
                        className="form-control" 
                        onChange={this.handlePasswordChange} 
                        name="password" 
                        placeholder="Password" required />
                    </FormGroup>
                    
                    <FormGroup>
                        <Input 
                        type="submit" 
                        onClick={this.login} 
                        value="Log In" 
                        id="button" />
                    </FormGroup>
                    
                    <FormGroup className="text-center">
                        <div>Don't have an account?</div>
                        <Link to="/Register" 
                        className="btn btn-link" 
                        aria-label="re-direct to sign-up page" 
                        style={{ color: "black" }}>
                            Sign Up Here
                        </Link>
                    </ FormGroup>
                </Form>
            </div>
        )
    }
}
