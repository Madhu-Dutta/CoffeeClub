import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

//URL
const apiUrl = 'https://coffe-club.azurewebsites.net/api/records';  

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
        <td>{props.record.PaidBy}</td>
        <td>  
            {/* Edit is connected here with the edit component page */}
            <Button><Link to={"/edit/" + props.record.RecordID}>Edit</Link></Button> 
            <Button onClick={() => props.deleteRecord(props.record.RecordID)}>Delete</Button>  
        </td>  

    </tr>
)

export default class Home extends Component { 
    
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

    //Delete Records by id
    deleteRecord = (recordId) => {
        console.log('Delete record check');
        const {records} = this.state;

        //axios call to 'api/delete/:id'
        axios.delete(apiUrl + '/' + recordId)
        .then(result => {
            alert("Do you wanna delete this record?");

            this.setState({
                //set result to response returned from database
                response: result,
                //Only return the records, where the recordId does not match the value of the RecordID in the database 
                records: records.filter(record => record.recordId !== record.RecordID)
            })
            
        })
        .catch(err => console.log("delete error: ", err));
    }    
    
    //declare the recordList here
    recordList() {
        //Loop through recordList and return the data
        //Declare the Record component as a stateless component outside the Home class
        return this.state.records.map(currentRecord => {
            return <Record record={currentRecord}
                           deleteRecord={this.deleteRecord}
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
                                    <td>Paid By</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.recordList()}
                            </tbody>
                            </Table>  
                        </div>   
                            <Button color="primary">
                                <Link to="/postRecord" 
                                    style={{color: 'white'}}>
                                    Create new Record
                                </Link>
                            </Button>                      
                    </div>
                </div>             
            )
         }
    }
}
