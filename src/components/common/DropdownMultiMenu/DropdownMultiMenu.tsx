import React from "react";
import './DropdownMultiMenu.scss';
interface props {
    data: [];
    submenu?: any;
    selectedItem?: string;
    title?: string;
}

interface state {
    styleObj: any;
    selectedItem?:string;
}

class DropdownMultiMenu extends React.Component<props,state> {

    constructor(props:props){
        super(props);
        this.state = {styleObj:{display:'none'}};
    }

    getMenuItemTitle = (menuItem: any, index: any, depthLevel: any) => {
        return menuItem.title;
    };

    getMenuItem = (menuItem: any, depthLevel: any, index: any) => {
        let title = this.getMenuItemTitle(menuItem, index, depthLevel);

        if (menuItem.submenu && menuItem.submenu.length > 0) {
            return (
                <li key={title + index} className={(this.state.selectedItem === title)?'active':''}>
                    {title}
                    <DropdownMultiMenu data={menuItem.submenu} submenu={true} selectedItem={this.state.selectedItem}/>
                </li>
            );
        } else {
            return <li key={title + index} className={(this.state.selectedItem === title)?'active':''}>{title}</li>;
        }
    };

    toggleMenu = () => {
        const displayValue = (this.state.styleObj.display === 'none')? 'flex':'none';
        this.setState({styleObj:{display:displayValue}});
    };

    toggleHover = (event: any) => {
        //console.log(event);
    };
    selectRecord = (event: any) => {
        if (event.target.innerHTML && event.target.innerHTML.indexOf('<') === -1) {
            let selectedTxt = event.target.innerText;
            console.log('Selected value is : ', selectedTxt);
            this.setState({ selectedItem: selectedTxt });
            this.toggleMenu();
        }
    };

    componentDidMount() {
        const ddId = document.getElementById('dropdown-custom-menu');
        console.log(ddId);
    }

    render = () => {
        let { data } = this.props;
        let options: any = [];
        data.map((item, index) => {
            return options.push(this.getMenuItem(item, 0, index));
        });

        if (this.props.submenu && this.props.submenu === true)
            return <ul className="sub">{options}</ul>;

        let titleBlock = '';
        if (this.props.title) {
            titleBlock = this.props.title;
        }

        return (
            <div>
                <label>Selected : </label> {this.state.selectedItem}<br></br>
                <button className="dropdown-toggle" onClick={this.toggleMenu}>{titleBlock ? <div>{titleBlock}</div> : ''}</button>
                <ul id="dropdown-custom-menu" className="dropdown-custom-menu" style={this.state.styleObj} onClick={this.selectRecord} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                    {options}
                </ul>
            </div>
        )
    };
}

export default DropdownMultiMenu;