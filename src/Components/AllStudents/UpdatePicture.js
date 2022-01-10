import { Avatar, Button, CircularProgress, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';

const UpdatePicture = (props) => {
    const [image, setImage] = useState(null);
    const [student, setStudent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://rocky-falls-13518.herokuapp.com/students/${props.id}`)
            .then(res => res.json())
            .then(data => {
                setStudent(data);
                setIsLoading(false);
            })
    }, [props.change, props.id])

    const { image: img } = student;
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!image) {
            return;
        }
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://rocky-falls-13518.herokuapp.com/updatePicture/${props.id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('A student\'s picture has been successfully updated!');
                    if (props.change === false) props.setChange(true);
                    else props.setChange(false);
                    e.target.reset();
                }
            })
    }
    return (
        <Modal
            show={props.pictureModalShow}
            onHide={()=>props.setPictureModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center justify-content-between" id="contained-modal-title-vcenter">
                    {
                        (isLoading===false && img) &&
                        <Avatar alt="picture" src={`data:image/png;base64,${img}`} />
                    }
                    <span className='ms-1'>Update Picture</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (isLoading===false)?
                    <Form onSubmit={handleUpdate}>
                    <Input
                        accept="image/*"
                        type="file"
                        style={{ width: 240 }}
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                    <Button type="submit">Update</Button>
                </Form>
                :
                <div className="text-center">
                    <CircularProgress></CircularProgress>
                </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.setPictureModalShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdatePicture;