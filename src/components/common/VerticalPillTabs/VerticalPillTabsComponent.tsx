import React, { Component } from "react";
import { Nav, Tab, Row, Col, Card, Accordion } from "react-bootstrap";
import _ from "lodash";
import "./VerticalPillTabs.scss";
export interface Props {
	title?: string;
	children: React.ReactElement[];
}
export interface tabDetailProps {
	title: string;
	content: string;
	key: string;
}
export default class VerticalPillTabsComponent extends Component {
	selected = "";
	childProps:any[] = [];
	getTabConfigs(): tabDetailProps[] {
		let data: any[] = [];
		// let children = React.Children.toArray(this.props.children);
		if (this.props.children) {
			let title = "";
			React.Children.forEach(this.props.children, (child, i) => {
				if (!React.isValidElement(child)) {
					return child;
				}
				this.childProps.push(JSON.stringify(child.props, null, 2));
				// To get Component Name of Child Component
				title = _.get(child, "type.componentName");
				title = title ? title : "CustomComponent";
				console.log("Component Name is:", title);
				// _.forOwn(child,function(val,key){
				// 	if(key === 'type'){
				// 		title = _.startCase(val['name']);
				// 	}
				// });
				// Format the Component Props based propertyies
				if (child.props.active) {
					this.selected = title + i;
				}
				data.push({
					title: title,
					key: title + i,
					content: child,
				});
			});
		}
		return data;
		// return (
		// 	[{
		// 		title:'Tab Name 1',
		// 		content:'This is Tab Content 1',
		// 		key:'DropdownMultiMenu'
		// 	},
		// 	{
		// 		title:'Tab Name 2',
		// 		content:'This is Tab Content 2',
		// 		key:'DropdownMenu'
		// 	},
		// 	{
		// 		title:'Tab Name 3',
		// 		content:'This is Tab Content 3',
		// 		key:'Dropdown'
		// 	}]
		// );
	}
	render() {
		let config = this.getTabConfigs();
		let navItem: any = [];
		let tabPane: any = [];
		config.forEach((value: tabDetailProps, index: number) => {
			navItem.push(
				<Nav.Item key={index}>
					<Nav.Link eventKey={value.key}>
						{_.startCase(value.title)}
					</Nav.Link>
				</Nav.Item>
			);
			tabPane.push(
				<Tab.Pane key={index} eventKey={value.key}>
					{value.content}
				</Tab.Pane>
			);
		});
		console.log(config);
		return (
			<div className="custom-container">
				<Tab.Container
					id="left-tabs-example"
					defaultActiveKey={this.selected}
				>
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								{navItem}
							</Nav>
						</Col>
						<Col sm={9}>
							{/* Accordion Section */}
							<Accordion defaultActiveKey="0">
								<Card>
									<Accordion.Toggle
										as={Card.Header}
										eventKey="0"
									>
										Component
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
										<Tab.Content className="height-250">
											{tabPane}
										</Tab.Content>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
								<Card>
									<Accordion.Toggle
										as={Card.Header}
										eventKey="1"
									>
										Props
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="1">
										<Card.Body>
											<div>
												<pre className="pretty-custom">
													{this.childProps}
												</pre>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</Col>
					</Row>
				</Tab.Container>
			</div>
		);
	}
}
