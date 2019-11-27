import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import Header from '../Components/Header';


//URL
// const apiUrl = 'https://coffe-club.azurewebsites.net/api/records';  
const apiUrl = "http://localhost:51248/api/Members";

//Record Component - Display the table values
const Member = props => (
    <tr>       
        <td>{props.member.id}</td> 
        <td>{props.member.FullName}</td> 
        <td>  
            {/* Approve/reject */}
            <Button color="success" onClick={() => props.approveMember(props.member.id)}>
                Approve</Button>  
            <Button color="danger" onClick={() => props.rejectMember(props.member.id)}>
                Reject</Button>  
        </td>       
    </tr>
)

export default class approval extends Component {

    constructor(props) {
        super(props);

        this.state = {
            members: [],
            id: '',
            approve: 0   
        }
    }

     //Get call
     componentDidMount(){
        console.log("Component did mount");
        axios.get(apiUrl)
        //get all the data as promise in the response
        .then(member => {
            const members = member.data
            this.setState({members})
        })
        .catch(err => console.log("getting the records error: ", err));

        console.log('print the data', this.state);
    }

    //Delete Members by id
    rejectMember = (id) => {
        console.log('Reject member check');
        const {members} = this.state;

        //axios call to 'api/delete/:id'
        axios.delete(apiUrl + '/' + id)
        .then(result => {
            alert("Do you wanna delete this record?");

            this.setState({
                //set result to response returned from database
                response: result,
                //Only return the records, where the recordId does not match the value of the RecordID in the database 
                records: members.filter(member => member.id !== member.id)
            })
            
        })
        .catch(err => console.log("delete error: ", err));
    }
    
    //Approve Members by id
    approveMember = (id) => {
        console.log('Approve member check');
        // const {members} = this.state;
        
        // axios.put(apiUrl + '/' + id)
        // .then(result => {
        //     alert("Do you wanna approve this member?");

        //     this.setState({
        //         //set result to response returned from database
        //         response: result,
        //         members: members.filter(member => member.id !== member.id)
        //     })
            
        // })
        // .catch(err => console.log("Approve error: ", err));        
    }  

    
     //declare the recordList here
     memberList() {
         return this.state.members.map(currentMember => {
            return <Member member={currentMember}
                           approveMember={this.approveMember}
                           rejectMember={this.rejectMember}
                           key={currentMember.id} />
        })
     }

    render() {
        return (
            <div className="container">
                <Header />

                <div className="contents">
                    
                    <div className="table-responsive">
                    <Table   style={{margin: '30px'}} dark>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Members</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.memberList()}
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
