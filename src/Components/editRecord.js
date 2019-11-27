import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import Header from './Header';


//URL
const apiUrl = 'https://coffe-club.azurewebsites.net/api/records'; 

export default class EditRecord extends React.Component {
    constructor(props){
        super(props);

        this.state = {  
            RecordID: 0,                       
            Venue: '',
            Time: '',
            Date: '',
            Payment: 0,
            CreatedBy: 3,   
            PaidBy: 0,
            username: '',
            users: []
        }
    }

    //Display all the pre-filled data from database on the input fields
    componentDidMount() {
        axios
        .get(apiUrl + '/' + this.props.match.params.id)
        .then(res => {
          this.setState({
            RecordID: res.data.RecordID,
            Venue: res.data.Venue,
            Time: res.data.Time,
            Date: res.data.Date,
            Payment: res.data.Payment,
            CreatedBy: res.data.CreatedBy,
            PaidBy: res.data.PaidBy
          });
        })
        .catch(function(err) {
          console.log("Getting all prev values", err);
        });

        axios.get("http://coffe-club.azurewebsites.net/api/Members").then(res => {
        if (res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.id),
        });
      }
    });
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
            // Most imp param is the recordID. Its not displayed but is passed into database as body. 
            // Without this PUT method will fail
            RecordID: this.state.RecordID,   
            CreatedBy: this.state.CreatedBy,    
            Venue: this.state.Venue,
            Time: this.state.Time,
            Date: this.state.Date,
            Payment: this.state.Payment,
            PaidBy: this.state.PaidBy
        }
        console.log(record)
        //Axios post method called - enter ui text into database
        axios({
            url: (apiUrl + '/' + this.props.match.params.id),
            // url: (apiUrl + '/13' ),
            method: "PUT",
            headers:  {
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': true
              },
              data: record
        })
        .then(result => {
            alert('Successfully posted', result);            
        })
        .catch(err => console.log('Put value: ', err));
    }

    render() {
        const {Venue, Time, Date, Payment, PaidBy} = this.state;
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
                        <FormGroup>
                                <Label htmlFor="Payment" style={{fontWeight: 'bolder'}}>Enter Payment</Label>
                                    <Input 
                                    type="text" 
                                    name="Payment"
                                    value={Payment} 
                                    onChange={(e) => this.handleChange(e)} />
                        </FormGroup>

                        <FormGroup>
                                <Label htmlFor="Select Member" style={{fontWeight: 'bolder'}}>Select Member</Label>
                                    <select
                                    ref="userInput"
                                    required                                    
                                    name="PaidBy"
                                    value={PaidBy}
                                    onChange={(e) => this.handleChange(e)}>

                                    {this.state.users.map(function (user) {
                                    return (
                                        <option key={user.id} value={user}>
                                            {user}
                                        </option>
                                        );
                                    })}        

                                    </select>
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
