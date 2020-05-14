import React from 'react';
import { RouteComponentProps } from '@reach/router';
import './components.scss';
import DropdownMultiMenu from  '../../components/common/DropdownMultiMenu';
import VerticalPillComponent from '../../components/common/VerticalPillTabs'
import loadData from '../../data/dropdown-multi-menu.data.json';

const dropDownData:any = loadData;
const Components = (props:RouteComponentProps)=> {
    return (
        <div>
            <h2 className="text-center">Components</h2>
            <div>
                <VerticalPillComponent>
                    <DropdownMultiMenu multi={true} active={true} domKey="1" title="Select Department" data={dropDownData}/>
                    {/* <DropdownMultiMenu active={true} domKey="2" title="Select User" data={dropDownData}/> */}
                </VerticalPillComponent>
            </div>
        </div>
    );
}
export default Components;