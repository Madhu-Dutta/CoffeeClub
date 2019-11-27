import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

//URL
// const apiUrl = 'https://coffe-club.azurewebsites.net/api/records';
const apiUrl = 'http://localhost:51248/api/Payment';  


//Record Component - Display the table values
const Record = props => (
    <tr>       
        <td>{props.record.PaidBy}</td>
        <td>${props.record.Payment}</td>
    </tr>
)

export default class balance extends Component {

    constructor(props){
        super(props);

        this.state = {
            records: []
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
    // if(this.state.records.length > 0) {
    if(this.state.records.length === 0) {
        return(
            <h2>loading........</h2>
        )
    }
    else{
        return (            
            <div>
                <Header />
                balance
                <div className="contents">
                    
                <div className="table-responsive">
                <Table dark>
                    <thead>
                        <tr>
                            <td>Member</td>                           
                            <td>Paid</td> 
                        </tr>
                    </thead>
                    <tbody>
                        {this.recordList()}
                    </tbody>
                    </Table>  
                </div>   
            </div>

                <div style={{marginTop: '4%'}}>
                    <Button color="primary">
                        <Link to="/Home"  style={{color: 'white'}}>View Records</Link>
                    </Button>  
                </div>
            </div>
            )
        }
    }
}   