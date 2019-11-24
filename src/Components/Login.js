import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        //Initial state
        this.state = {
            Email: '',
            Password: '',
            error: ''
        }

    }
    //Handle password and email input changes
    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            [name] : value
         });
         console.log(this.state);
    }
   
    //OnClick event on the login button
    login = (e) => {
        e.preventDefault();

        // debugger;
        fetch('https://coffe-club.azurewebsites.net/api/Login/login', {
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
                if (result.Status === 'Invalid'){
                    alert('Invalid User');
                    this.setState({error: "Please enter valid email & password"})
                }
                else
                    this.props.history.push("/");
            })

    }

    render() {
        const {email, password, error} = this.state;
        return (
            <div id="container">
                <div className="header">
                    <h2 className="text-center">Log In</h2>
                    <div className="text-center">to continue to site</div>
                    <hr />
                </div>
                 
                <Form name="form" onSubmit={this.login}>
                {/*Show error message*/}
                 <span className="errorMsg">{error}</span>
                    <FormGroup>
                        <Input
                        type="text" 
                        className="form-control" 
                        onChange={this.handleChange} 
                        name="Email" 
                        value={email}
                        placeholder="Email" 
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                        type="password" 
                        className="form-control" 
                        onChange={this.handleChange} 
                        name="Password" 
                        value={password}
                        placeholder="Password" required />
                    </FormGroup>
                    
                    <FormGroup>
                        <Input 
                        type="submit" 
                        onClick={this.login} 
                        value="Log In" 
                        id="button"
                        />
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