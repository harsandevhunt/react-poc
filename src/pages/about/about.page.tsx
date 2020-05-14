import React from 'react';
import { RouteComponentProps } from '@reach/router';
import './about.scss';
import DropdownMenu from '../../components/common/DropdownMenu';
import loadData from '../../data/dropdown-multi-menu.data.json';
let dropDownData:any = loadData;
const About = (props: RouteComponentProps) => {
    return (
        <div className="text-center">
            <h2>About</h2>
            <DropdownMenu data={dropDownData} title="Select Name"/>
        </div>
    );
}
export default About;