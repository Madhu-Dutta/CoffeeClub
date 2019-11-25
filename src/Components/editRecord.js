import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Header from './Header';


//URL
const apiUrl = 'https://coffe-club.azurewebsites.net/api/records'; 

//Extract Date
function transformDate(d) {
    const date = new Date(Date.parse(d));
    // const options = { year: "numeric", month: "long", day: "numeric" };
    const dateString = date.toLocaleDateString("en-AU");
    return dateString;
}


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
            // PaidBy: ''
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
            Date: transformDate(res.data.Date)
          });
        })
        .catch(function(err) {
          console.log("Getting all prev values", err);
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
            Payment: this.state.Payment
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
        const {Venue, Time, Date, Payment} = this.state;
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
                                <Label htmlFor="RecordID" style={{fontWeight: 'bolder'}}>Enter Payment</Label>
                                    <Input 
                                    type="text" 
                                    name="Payment"
                                    value={Payment} 
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
