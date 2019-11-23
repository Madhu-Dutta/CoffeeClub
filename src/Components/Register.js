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

    Email = (e) => {
        this.setState({
            Email: e.target.value
        })
    }
    Password = (e) => {
        this.setState({
            Password: e.target.value
        })
    }
    Fullname = (e) => {
        this.setState({
            Fullname: e.target.value
        })
    }
    Phone = (e) => {
        this.setState({
            Phone: e.target.value
        })
    }
    

    register = (e) => {

        e.preventDefault();
        fetch('http://coffe-club.azurewebsites.net/api/Login/InsertMember', {
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
                        onChange={this.Fullname} 
                        placeholder="Fullname" 
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" 
                        className="form-control" 
                        value={this.state.Email} 
                        onChange={this.Email} 
                        placeholder="Email"
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" 
                        className="form-control" 
                        value={this.state.Password} 
                        onChange={this.Password} 
                        placeholder="Password" 
                        required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="phone" 
                        className="form-control" 
                        value={this.state.Phone} 
                        onChange={this.Phone} 
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
