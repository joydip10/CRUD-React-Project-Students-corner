import { Button, Input, TextareaAutosize } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Form, Modal, Spinner } from 'react-bootstrap';
import { TextField } from '@mui/material';

const UpdateModal = ({ id, change, setChange, modalShow, setModalShow }) => {
    const [student, setStudent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    let [updatedname,setName]=useState('');
    let [updatedage,setAge]=useState('');
    let [updatedinstitution,setInstitution]=useState('');
    let [updateddesc,setDesc]=useState('');

    const [status,changeStatus]=useState('');


    useEffect(() => {
        setIsLoading(true);
        fetch(`https://rocky-falls-13518.herokuapp.com/students/${id}`)
            .then(res => res.json())
            .then(data => {
                setStudent(data);
                setName(data.name);
                setAge(data.age);
                setInstitution(data.institution);
                setDesc(data.desc);
                setIsLoading(false);
                changeStatus('');
            })
    }, [id,change])
    
    
    const { name, age, institution, desc, image } = student; 
    
    
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',updatedname);
        formData.append('age',updatedage);
        formData.append('institution',updatedinstitution);
        formData.append('desc',updateddesc);

        fetch(`https://rocky-falls-13518.herokuapp.com/student/${id}`,{
            method:'PUT',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                alert('A student\'s information has been successfully updated!');
                e.target.reset();
                if (change===false) setChange(true);
                else setChange(false);
                changeStatus('');
            }
            else if(data.modifiedCount===0){
                changeStatus('Nothing has been updated!');
            }
        })
    }

    return (
        <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header onClick={() => setModalShow(false)}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Information
                </Modal.Title>
            </Modal.Header>
            {
                (isLoading===false) ?
                <Modal.Body className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center">
                <div className='px-3'>
                {
                       (image) &&
                       <img src={`data:image/png;base64,${image}`} style={{width:'300px',height:"200px"}} alt="a student" className='img-fluid img-thumbnail rounded-circle' />
                }
                </div>
                <Form onSubmit={handleUpdate}>
                    <TextField id="standard-basic" defaultValue={name} label="Student's Name" variant="standard" style={{ width: 200 }}
                        onChange={e => setName(e.target.value)} required />
                    <br />
                    <br />
                    <TextField id="standard-basic" defaultValue={age} label="Student's age" variant="standard" style={{ width: 200 }} onChange={e => setAge(e.target.value)} required />
                    <br />
                    <br />
                    <TextField defaultValue={institution} id="standard-basic" label="Institution" variant="standard" style={{ width: 200 }} onChange={e => setInstitution(e.target.value)} required />
                    <br />
                    <br />
                    <TextareaAutosize
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Description"
                        defaultValue={desc}
                        style={{ width: 200, height: 100 }}
                        onChange={e => setDesc(e.target.value)}
                        required
                    />
                    <br />
                    <br />
                    <Button type="submit">Update</Button>
                    <h6 className='text-danger'>{status}</h6>
                </Form>
            </Modal.Body>
            :
            <div className='text-center mt-3'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateModal;