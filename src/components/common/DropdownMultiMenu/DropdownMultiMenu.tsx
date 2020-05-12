import React, { createRef } from "react";
import { AiFillCaretRight, AiOutlineCheck } from "react-icons/ai"
import "./DropdownMultiMenu.scss";
interface props {
	data: [];
	submenu?: any;
	selectedItem?: string;
	title?: string;
	domKey?:string;
	active?:boolean;
}

interface state {
	styleObj: any;
	selectedItem?: string;
}

class DropdownMultiMenu extends React.Component<props, state> {
	static componentName = 'DropdownMultiMenu';
	node:any;
	constructor(props: props) {
		super(props);
		this.state = { styleObj: { display: "none" } };
		this.node = createRef<HTMLDivElement>();
		document.addEventListener("click", this.handleClick, false);
	}

	getMenuItemTitle = (menuItem: any, index: any, depthLevel: any) => {
		return menuItem.title;
	};

	getMenuItem = (menuItem: any, depthLevel: any, index: any) => {
		let title = this.getMenuItemTitle(menuItem, index, depthLevel);
		let selItem:any;
		if (menuItem.submenu && menuItem.submenu.length > 0) {
			selItem = (this.state.selectedItem || this.props.selectedItem);
			return (
				<li
					key={title + index}
					className={
						selItem === title ? "active" : ""
					}
				>
					{title}
					<AiFillCaretRight className="li-icon"/>
					<DropdownMultiMenu
						data={menuItem.submenu}
						submenu={true}
						selectedItem={selItem}
					/>
				</li>
			);
		} else {
			selItem = (this.state.selectedItem || this.props.selectedItem);
			let selIcon = <AiOutlineCheck className="li-icon selected"/>;
			return (
				<li
					key={title + index}
					className={
						selItem === title ? "active" : ""
					}
				>
					{title}
					{(selItem === title?selIcon:'')}
				</li>
			);
		}
	};

	toggleMenu = (action?:any) => {
		let displayValue = '';
		if(action)
			displayValue = (action === 'show')?'flex':'none';
		else
			displayValue = this.state.styleObj.display === "none" ? "flex" : "none";
		this.setState({ styleObj: { display: displayValue } });
	};

	toggleHover = (event: any) => {
		//console.log(event);
	};

	selectRecord = (event: any) => {
		if (
			event.target.innerHTML &&
			event.target.innerHTML.indexOf("<") === -1
		) {
			let selectedTxt = event.target.innerText;
			console.log("Selected value is : ", selectedTxt);
			this.setState({ selectedItem: selectedTxt });
			this.toggleMenu('hide');
		}
	};

	handleClick = (e:any)=>{
		if(this.node && !this.node.contains)
			return;
		if(this.node.contains(e.target) && e.target.tagName === 'LI'){
			return;
		}else if(this.node.contains(e.target)){
			console.log('Yes! It contains');
			this.toggleMenu('show');
		}else{
			console.log('No! It doesn\'t contains');
			this.toggleMenu('hide');
		}

	};

	componentWillUnmount() {
		// detaching event listener from this component while leaving
		document.removeEventListener("click", this.handleClick, false);
	}

	render = () => {
		let { data } = this.props;
		let options: any = [];
		data.map((item, index) => {
			return options.push(this.getMenuItem(item, 0, index));
		});

		if (this.props.submenu && this.props.submenu === true)
			return <ul className="sub">{options}</ul>;

		let titleBlock = "";
		if (this.props.title) {
			titleBlock = this.props.title;
		}

		return (
			<div className="dropdown-container">
				<div className="dropdown-container-body">
					<label>Selected : </label> {this.state.selectedItem}
					<br></br>
					<div ref={node => this.node = node}>
						<button
							className="dropdown-toggle"
							onClick={this.toggleMenu}
						>
							{titleBlock ? <div>{titleBlock}</div> : ""}
						</button>
						<ul
							id="dropdown-custom-menu"
							className="dropdown-custom-menu"
							style={this.state.styleObj}
							onClick={this.selectRecord}
							onMouseEnter={this.toggleHover}
							onMouseLeave={this.toggleHover}
						>
							{options}
						</ul>
					</div>
				</div>
			</div>
		);
	};
}

export default DropdownMultiMenu;