import React, { Component } from 'react';
import {Table} from 'reactstrap';
import Header from './Header';

export default class Home extends Component {
    
    
    render() {
        
        return (
            <div>               
                 <Header />
                <div className="contents">
                    <Table>
                        
                    </Table>
                </div>

            </div>             
        )
    }
}
