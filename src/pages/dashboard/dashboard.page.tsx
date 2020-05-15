import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Doughnut, Pie } from "react-chartjs-2";
import "./dashboard.scss";

const data: any = {
	labels: ["React", "Angular", "Vue"],
	datasets: [
		{
			data: [300, 100, 20],
			backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
		},
	],
};
const legendOptions:any = {
    display: true,
    position: 'top',
    fullWidth: true,
    reverse: false,
    labels: {
        fontColor: 'black'
    }
};
const Dashboard = (props: RouteComponentProps) => {
	return (
		<div className="text-center">
			<h2 className="text-center">Dashboard</h2>
			{/* <label className="formLabel px-2" htmlFor="username"> Username : </label>
            <input className="mx-2" id="username" name="username" type="text" placeholder="Enter Username"/>
            <button className="btn px-2" style={{backgroundColor:'Blue',color:'white',padding:'5px'}}>Login</button> */}
			<Container>
				<Row>
					<Col className="p-3">
                        <Card style={{ width: "auto" }}>
                        <Doughnut data={data} />
                            <Card.Body>
                                <Card.Title>Doughnut Chart</Card.Title>
                                <Card.Text>
                                    Hardcoded data just loaded into this graph.
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
					<Col className="p-3">
                        <Card style={{ width: "auto" }}>
                        <Pie data={data} legend={legendOptions} options={{title:{display:true,text:'Pie Chart',position:'bottom'}}} redraw/>
                            <Card.Body>
                                <Card.Title>Pie Chart</Card.Title>
                                <Card.Text>
                                    Hardcoded data just loaded into this graph.
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
				</Row>
			</Container>
		</div>
	);
};
export default Dashboard;