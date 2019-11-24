import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            Fullname: '',
            Email: '',
            Password: '',
            Phone: '',
            //Validation checks
            errors: {
                fullName: '',
                email: '',
                password: '',
            }
        }
    }
    //Handle password and email input changes
    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
        console.log(this.state);
    }
    
    register = (e) => {

        e.preventDefault();
        fetch('https://coffe-club.azurewebsites.net/api/Login/InsertMember', {
        // fetch('http://localhost:51248/api/login/InsertMember', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Fullname: this.state.Fullname,
                Email: this.state.Email,
                Password: this.state.Password,
                Phone: this.state.Phone
            })
        }).then((Response) => Response.json())
            .then((Result) => {
                if (Result.Status === 'Success') {
                    this.props.history.push("/");
                }
                else {
                    alert('Sorrrrrry !!!! Un-authenticated User !!!!!');
                }
            })
    }

    render() {
        const { fullname, email, password, phone } = this.state;
        return (
            <div id="container">
                <div className="header">
                    <h2 className="text-center">Register</h2>
                    <hr />
                </div>
                <div className="msg-block"></div>

                <Form name="form" onSubmit={this.register}>
                    <FormGroup>
                        <Input type="text" 
                        className="form-control" 
                        name="Fullname"
                        value={fullname}
                        onChange={this.handleInputChange} 
                        placeholder="Fullname" 
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" 
                        className="form-control" 
                        name="Email"
                        value={email} 
                        onChange={this.handleInputChange} 
                        placeholder="Email"
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" 
                        className="form-control" 
                        name="Password"
                        value={password} 
                        onChange={this.handleInputChange} 
                        placeholder="Password" 
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="phone" 
                        className="form-control" 
                        name="Phone"
                        value={phone} 
                        onChange={this.handleInputChange} 
                        placeholder="Phone" 
                        required />
                    </FormGroup>

                    <FormGroup>
                        <Input type="submit" 
                        onClick={this.register} 
                        value="Register" 
                        id="button" />
                    </FormGroup>
                    <hr />
                    <FormGroup className="text-center">
                        <div>Already have an account?</div>
                        <Link to="/Login" 
                        alt="Login Link" 
                        aria-label="re-direct to log-in page" 
                        className="btn btn-link" 
                        style={{ color: "black" }}>
                            Log In
                        </Link>
                    </ FormGroup>
                </Form>
            </div >
        )
    }
}