import React, { createRef } from "react";
import { AiFillCaretRight, AiOutlineCheck, AiOutlineCaretDown } from "react-icons/ai";
import _ from 'lodash';
import "./DropdownMenu.scss";
interface props {
	data: [];
	submenu?: any;
	selectedItem?: any;
	title?: string;
	domKey?:string;
	active?:boolean;
	multi?:boolean;
}

interface state {
	styleObj: any;
	selectedItem?: any;
}

class DropdownMenu extends React.Component<props, state> {
	static componentName = 'DropdownMenu';
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
		let multiFlag:boolean = false;
		function checkSelItem(sel:any,tit:string):boolean{
			let resp = false;
			if(_.isArray(sel) && sel.indexOf(tit) > -1){
				resp = true;
			}else if(_.isString(sel) && sel === tit){
				resp = true;
			}
			return resp;
		}
		if (menuItem.submenu && menuItem.submenu.length > 0) {
			selItem = (this.state.selectedItem || this.props.selectedItem);
			multiFlag = (this.props.multi)?true:false;
			return (
				<li
					key={title + index}
					className={
						checkSelItem(selItem,title) ? "active" : ""
					}
				>
					{title}
					<AiFillCaretRight className="li-icon"/>
					<DropdownMenu
						multi={multiFlag}
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
						checkSelItem(selItem,title) ? "active" : ""
					}
				>
					{title}
					{(checkSelItem(selItem,title)?selIcon:'')}
				</li>
			);
		}
	};

	toggleMenu = (action?:any) => {
		let displayValue = '';
		if(action)
			displayValue = (action === 'show')?'block':'none';
		else
			displayValue = this.state.styleObj.display === "none" ? "block" : "none";
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
			let selObj = (this.state.selectedItem || []);
			if(this.props.multi){
				if(_.isArray(selObj))
					selObj.push(selectedTxt);
				else
					selObj = [selectedTxt];
			}
			else
				selObj = selectedTxt
			this.setState({ selectedItem: selObj });
			if(!this.props.multi)
				this.toggleMenu('hide');
		}else if(
			event.target.innerHTML &&
			event.target.innerHTML.indexOf("li-icon selected") > -1){
				this.removeItem(event);
		}
	};

	removeItem = (event:any)=>{
		if(this.props.multi){
			let { selectedItem } = this.state;
			let item = event.target.innerText;
			selectedItem.splice(selectedItem.indexOf(item),1);
			this.setState({selectedItem: selectedItem});
		}else{
			this.setState({selectedItem: ''});
		}
	};

	handleClick = (e:any)=>{
		if(this.node && !this.node.contains)
			return;
		if(this.node.contains(e.target) && e.target.tagName === 'LI'){
			return;
		}else if(this.node.contains(e.target)){
			this.toggleMenu('show');
		}else{
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

		let titleBlock = "Select";
		if (this.props.title) {
			titleBlock = this.props.title;
		}

		let selectedTxt:any;
		if(this.props.multi && _.isArray(this.state.selectedItem)){
			selectedTxt = this.state.selectedItem.map((item,i)=>{
				return (
				<div className="select-item" key={i} onClick={this.removeItem}>{item}</div>
				)
			});
		}else{
			selectedTxt = this.state.selectedItem;
		}
		return (
			<div className="dropdown-menu-component">
				<div className="dropdown-container">
					<div>
						<label>Selected : </label> {selectedTxt}
					</div>
					<div ref={node => this.node = node}>
						<button
							className="dropdown-btn"
							onClick={this.toggleMenu}
						>
							<div className="dropdown-btn-head">{titleBlock}</div><AiOutlineCaretDown className="dropdown-btn-icon"/>
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

export default DropdownMenu;