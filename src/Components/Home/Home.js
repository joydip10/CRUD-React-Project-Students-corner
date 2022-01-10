import React, { useEffect, useState } from 'react';
import { Button, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StudentInformation from '../StudentInformation/StudentInformation';

const Home = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        fetch('https://rocky-falls-13518.herokuapp.com/students')
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setIsLoading(false);
            })
    }, [])
    return (
        <div className='container'>
            <h3 className='mt-3'>Home<span className='text-success'>page</span></h3>
            {
                (isLoading === true) &&
                <div className='text-center mt-3'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            {
                (isLoading===false) &&
                <Row xs={1} md={4} className="g-4 container">
                    {
                        students.map(std => <StudentInformation addpic="no" key={std._id} student={std}>
                            <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                                <Button variant="success" as={Link} to="/allStudents">Click here</Button>
                            </div>
                        </StudentInformation>)
                    }
                </Row>
            }
        </div>
    );
};

export default Home;