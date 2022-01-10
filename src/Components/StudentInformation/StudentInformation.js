import React from 'react';
import { Card, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const StudentInformation = ({ student, addpic,handleUpdatePicture, children }) => {
    const { name, age, institution, image } = student;
    return (
        <Col>
            <Card bg="light" className='p-4'>
                <Card.Img variant="top" src={`data:image/png;base64,${image}`} style={{ width: '300px', height: '200px' }} className='img-fluid img-thumbnail rounded-circle' />
                {
                        (addpic === "yes") &&
                        <div className='text-center'>
                            <OverlayTrigger key="top"
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Click here to update <strong>picture</strong>.
                                    </Tooltip>
                                }>
                                <Button onClick={handleUpdatePicture} variant="secondary" className="rounded-circle">+</Button>
                            </OverlayTrigger>
                        </div>
                    }
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <h6 className='text-secondary'>Age: {age}</h6>
                        <h6 className='text-secondary'>Institution: {institution}</h6>
                        {children}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default StudentInformation;