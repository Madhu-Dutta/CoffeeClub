import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

//URL
// const apiUrl = 'https://coffe-club.azurewebsites.net/api/records';  
const apiUrl = "http://localhost:51248/api/MemberRecords/23";

//Extract Date
function transformDate(d) {
    const date = new Date(Date.parse(d));
    // const options = { year: "numeric", month: "long", day: "numeric" };
    const dateString = date.toLocaleDateString("en-AU");
    return dateString;
}
//Extract Time 
function transformTime(t) {
    const time = new Date(Date.parse(t));
    const timeString = time.toLocaleTimeString("en-AU");
    return timeString;
}

//Record Component - Display the table values
const Record = props => (
    <tr>        
        <td>{transformDate(props.record.Date)}</td>
        <td>{transformTime(props.record.Time)}</td>
        <td>{props.record.Venue}</td>
        <td>${props.record.Payment}</td>      
    </tr>
)

export default class MyExpenses extends Component { 
    
    constructor(props) {
        super(props);

        this.state = {
            records: [],
            //to delete / edit a record
            recordId: 0            
        }
    }

    //Get call
    componentDidMount(){
        console.log("Component did mount");
        axios.get(apiUrl)
        //get all the data as promise in the response
        .then(result => {
            const records = result.data
            this.setState({records})
        })
        .catch(err => console.log("getting the records error: ", err));

        console.log('print the data', this.state);
    }
    
    //declare the recordList here
    recordList() {
        //Loop through recordList and return the data
        //Declare the Record component as a stateless component outside the Home class
        return this.state.records.map(currentRecord => {
            return <Record record={currentRecord}
                           key={currentRecord.RecordID} />
        })

    }
    
    render() {      
        //check if there is at least 1 record in the database (if mo : just display loading..)
        // if(this.state.records.length > 0) {
        if(this.state.records.length === 0) {
            return(
                <h2>loading........</h2>
            )
        }
         //If at least 1 customer, loop through customers array and display the result
         else {
            return (
                <div>               
                    <Header />
                    <div className="contents">
                    
                        <div className="table-responsive">
                        <Table dark>
                            <thead>
                                <tr>
                                    <td>Date</td>
                                    <td>Time</td>                           
                                    <td>Venue</td>
                                    <td>Payment</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.recordList()}
                            </tbody>
                            </Table>  
                        </div>   
                            <Button color="primary">
                                <Link to="/Home" 
                                    style={{color: 'white'}}>
                                    Back to Home
                                </Link>
                            </Button>                      
                    </div>
                </div>             
            )
         }
    }
}
