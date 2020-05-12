import React from 'react';
import { RouteComponentProps } from '@reach/router';
import './dashboard.scss';

const Dashboard = (props:RouteComponentProps)=> {
    return (
        <div className="text-center">
            <h2 className="text-center">Dashboard</h2>
            <label className="formLabel px-2" htmlFor="username"> Username : </label>
            <input className="mx-2" id="username" name="username" type="text" placeholder="Enter Username"/>
            <button className="btn px-2" style={{backgroundColor:'Blue',color:'white',padding:'5px'}}>Login</button>
        </div>
    );
}
export default Dashboard;