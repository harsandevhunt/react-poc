import React from 'react';
import { RouteComponentProps } from '@reach/router';
import './components.scss';
import DropdownMultiMenu from  '../../components/common/DropdownMultiMenu';
import loadData from '../../data/dropdown-multi-menu.data.json';

const dropDownData:any = loadData;
const Components = (props:RouteComponentProps)=> {
    return (
        <div>
            <h2 className="text-center">Components</h2>
            <div>
                <DropdownMultiMenu title="Select Department" data={dropDownData}/>
            </div>
        </div>
    );
}
export default Components;