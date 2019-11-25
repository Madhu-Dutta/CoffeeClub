import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Header from './Header';

//URL
const apiUrl = 'https://coffe-club.azurewebsites.net/api/records'; 

export default class PostRecord extends Component {

    constructor(props){
        super(props);

        this.state = {
            CreatedBy: 3,            
            Venue: '',
            Time: '',
            Date: ''
        }
    }

    //Handle input changes
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            ...this.state,
            [name] : value
        })

        console.log(this.state);
    }

    //Handle submit button
    handleSubmit = (e) => {
        e.preventDefault();        
        console.log("Submit button clicked");

        //body to be passed as data into database
        const record = {
            CreatedBy: this.state.CreatedBy,
            Venue: this.state.Venue,
            Time: this.state.Time,
            Date: this.state.Date
        }

        //Axios post method called - enter ui text into database
        axios({
            url: apiUrl,
            method: "POST",
            headers:  {
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': true
              },
              data: record
        })
        .then(result => {
            alert('Successfully posted', result);
            //Reset the form
            this.setState({
                CreatedBy: '',
                Venue: '',
                Time: '',
                Date: ''
            })
        })
        .catch(err => console.log(err));
    }
    
    render() {
        const {Venue, Time, Date} = this.state;

        return (
        <React.Fragment> 
            <Header />  
                <Container className="postRecord-wrapper">         
                    <Form action="" onSubmit={this.handleSubmit}>
                        <FormGroup>
                                <Label htmlFor="RecordID" style={{fontWeight: 'bolder'}}>Enter Venue</Label>
                                    <Input 
                                    type="text" 
                                    name="Venue"
                                    value={Venue} 
                                    onChange={(e) => this.handleChange(e)} />
                        </FormGroup>
                        <FormGroup>
                                <Label htmlFor="RecordID" style={{fontWeight: 'bolder'}}>Enter Date</Label>
                                    <Input 
                                    type="text" 
                                    name="Date"
                                    value={Date} 
                                    onChange={(e) => this.handleChange(e)} />
                        </FormGroup>
                        <FormGroup>
                                <Label htmlFor="RecordID" style={{fontWeight: 'bolder'}}>Enter Time</Label>
                                    <Input 
                                    type="text" 
                                    name="Time"
                                    value={Time} 
                                    onChange={(e) => this.handleChange(e)} />
                        </FormGroup>
                        <Button color="primary" style={{color: 'white'}}
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                            Add
                        </Button>
                    </Form>

                    <div style={{marginTop: '4%'}}>
                        <Button color="primary"><Link to="/Home"  style={{color: 'white'}}>View Records</Link></Button>  
                    </div>
                </Container>  
        </React.Fragment>    
        )
    }
}
