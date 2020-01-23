import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

function Drones(props) {
    return (
        <div>
            <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Title className="text-center"> {props.modelName} </Card.Title>
                    <ListGroup.Item >Manufacturer: {props.manufacturer} </ListGroup.Item>
                    <ListGroup.Item>Charge: {props.charge} </ListGroup.Item>
                    <ListGroup.Item>Flight Time: {props.fligtTime} </ListGroup.Item>
                    <div className="text-center">
                        <Button
                            value={props.value}
                            onClick={props.handleClick}
                            disabled={props.disable}
                            style={{ marginTop: '20px' }}
                            variant="primary">
                                Rent
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Drones;