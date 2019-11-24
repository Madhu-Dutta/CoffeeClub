import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

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
    //Back to Landing Page
    back = () => {
        this.props.history.push("/");
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
                    this.props.history.push("/Home");
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
                        id="Logbtn"
                        />
                    </FormGroup>     
                    <FormGroup>
                        <Input 
                        type="button" 
                        onClick={this.back} 
                        value="Back" 
                        id="Backbtn"
                        />
                    </FormGroup>

                    <hr/>          
                    
                    <FormGroup className="text-center">
                        <div>Login With Google</div>
                        <Input 
                        type="button" 
                        onClick={this.google} 
                        value="Google" 
                        id="Googlebtn"
                        />
                    </ FormGroup>
                </Form>
            </div>
        )
    }
}