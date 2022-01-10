import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const StudentDescription = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://rocky-falls-13518.herokuapp.com/students/${id}`)
            .then(res => res.json())
            .then(data => {
                setStudent(data);
                setIsLoading(false);
            })
    }, [id])
    const {name,age,institution,desc,image}=student;

    return (
        <div className=' container mt-4'>
            {
                (isLoading === true) &&
                <div className='text-center'>
                    <div className='text-center mt-3'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            }
            <div className='container d-flex flex-column flex-md-row align-items-center justify-content-center'>
                <div id="picture" style={{borderRight:'3px solid forestgreen',borderBottom:'3px solid forestgreen'}}>
                   {
                       (image) &&
                       <img src={`data:image/png;base64,${image}`} style={{width:'400px',height:"300px"}} alt="a student" className='img-fluid img-thumbnail' />
                   }
                </div>
                <div id="description" className='px-4'>
                    <h6 className='text-secondary'>Name: {name}</h6>
                    <h6 className='text-secondary'>Age: {age}</h6>
                    <h6 className='text-danger'>Institution: {institution}</h6>
                    <p className='text-success' style={{textAlign:'justify'}}>{desc}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDescription;