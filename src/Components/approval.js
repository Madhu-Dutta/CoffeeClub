import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import Header from '../Components/Header';


//URL to get only approved members
// const apiUrl = 'https://coffe-club.azurewebsites.net/api/records';  
const apiUrl = "http://localhost:51248/api/ApproveMembers";

//Record Component - Display the table values
const Member = props => (
    <tr>       
        <td>{props.member.id}</td> 
        <td>{props.member.FullName}</td> 
        <td>{props.member.Email}</td> 
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
            // Hard coded id for
            id: 26,
            Approved: 0 
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
        console.log('Approve member check');
        
        const members = {
            id: this.state.id,
            Approved: 2               
        }
        console.log(members)
        axios({
            url: ("http://localhost:51248/api/Members" + '/' + id),
            method: "PUT",
            headers:  {
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': true
              },
             data: members               
        })
        .then(result => {
            alert('Access permission Rejected', result.data);           
        })
        .catch(err => console.log("Approve error: ", err));        
    }  
    
    //Approve Members by id
    approveMember = (id) => {
        console.log('Approve member check');
        
        const members = {
            id: this.state.id,
            Approved: 1                
        }
        console.log(members)
        axios({
            url: ("http://localhost:51248/api/Members" + '/' + id),
            method: "PUT",
            headers:  {
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': true
              },
             data: members               
        })
        .then(result => {
            alert('Successfully posted', result.data);           
        })
        .catch(err => console.log("Approve error: ", err));        
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
            <div>
                <Header />

                <div className="contents">
                    
                    <div className="table-responsive">
                    <Table dark>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Members</td>
                                <td>Email</td>
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
