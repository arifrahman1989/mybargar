import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div style={{ fontWeight: "bold", fontSize: "1.2rem", margin: "auto", marginLeft: "5px" }}>{props.label}</div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>Add</button>
        </div>
    )
}

const Controls = props => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    background: '#3D0C02', color: 'white'
                }}><h3>Add Burgar Elements</h3></CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                added={() => props.addedElement(item.type)}
                                removed={() => props.removedElement(item.type)}
                            />
                        })
                    }
                </CardBody>
                <CardFooter><h4>Price: <strong>{props.price}</strong></h4></CardFooter>
                <Button style={{ backgroundColor: '#810541' }} disabled={!props.purchasable} onClick={props.toggleModal}>Order Now</Button>
            </Card>
        </div>
    )
}

export default Controls;