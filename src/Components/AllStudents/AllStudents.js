import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StudentInformation from '../StudentInformation/StudentInformation';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';
import UpdatePicture from './UpdatePicture';

const AllStudents = () => {
    const [students, setStudents] = useState([]);
    const [change, setChange] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //for update modal
    const [modalShow, setModalShow] = React.useState(false);

    //for update picture
    const [pictureModalShow, setPictureModalShow] = React.useState(false);
    //for delete modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updateId,setUpdateId]=useState('');
    useEffect(() => {
        setIsLoading(true);
        fetch('https://rocky-falls-13518.herokuapp.com/students')
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setIsLoading(false);
            })
    }, [change])

    const navigate = useNavigate();

    const handleDelete = (id, name) => {
        const conf = window.confirm('Are your sure to delete astudent?');
        if (conf) {
            fetch(`https://rocky-falls-13518.herokuapp.com/student/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        handleShow();
                        if (change === false) setChange(true);
                        else setChange(false);
                    }
                })
        }
    }

    const handleUpdate = (id) => {
        setUpdateId(id);
        setModalShow(true);
    }

    const handleUpdatePicture=(id)=>{
        setUpdateId(id);
        setPictureModalShow(true);
    }
    return (
        <div className='container'>
            <h3 className='mt-3'>All <span className='text-success'>Students</span></h3>
            {
                (isLoading === true) &&
                <div className='text-center mt-3'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            {
                (isLoading === false) &&
                <Row xs={1} md={4} className="g-4 container">
                    {
                        students.map(std => <StudentInformation handleUpdatePicture={()=>handleUpdatePicture(std._id)} addpic="yes" key={std._id} student={std}>
                            <p className="text-success">{std.desc.slice(0, 50)}<span>[...]</span></p>
                            <div className='text-center mb-3'>
                                <Button variant="secondary" onClick={() => navigate(`/describeStudent/${std._id}`)}>Details</Button>
                            </div>
                            <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
                                <Button variant="warning" onClick={()=>handleUpdate(std._id)}>Update</Button>
                                <Button variant="danger" onClick={() => handleDelete(std._id, std.name)}>Delete</Button>
                            </div>
                        </StudentInformation>)
                    }
                </Row>
            }
            <DeleteModal show={show} handleShow={handleShow} handleClose={handleClose} />
            <UpdateModal id={updateId} change={change} setChange={setChange} modalShow={modalShow} setModalShow={setModalShow}></UpdateModal>
            <UpdatePicture id={updateId} change={change} setChange={setChange} pictureModalShow={pictureModalShow} setPictureModalShow={setPictureModalShow} ></UpdatePicture>
        </div>
    );
};

export default AllStudents;