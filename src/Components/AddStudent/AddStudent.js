import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {Input, TextareaAutosize, TextField} from "@mui/material";
const AddStudent = () => {
    const [name,setName]=useState('');
    const [age,setAge]=useState('');
    const [institution,setInstitution]=useState('');
    const [desc,setDesc]=useState('');
    const [image,setImage]=useState(null);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!image){
            return
        }
        const formData=new FormData();
        formData.append('name',name);
        formData.append('age',age);
        formData.append('institution',institution);
        formData.append('desc',desc);
        formData.append('image',image);
        fetch('https://rocky-falls-13518.herokuapp.com/students',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                alert('A product has been successfully inserted!');
                e.target.reset();
            }
        })
    }
    return (
        <div className='mt-3 text-center'>
            <h3>Add a <span className='text-success'>Student</span></h3>
            <Form onSubmit={handleSubmit}>
            <TextField id="standard-basic" label="Student's Name" variant="standard" style={{ width: 200 }}
                onChange={e=>setName(e.target.value)} required/>
                <br />
                <br />
                <TextField id="standard-basic" label="Student's age" variant="standard" style={{ width: 200 }} onChange={e=>setAge(e.target.value)} required/>
                <br/>
                <br/>
                <TextField id="standard-basic" label="Institution" variant="standard" style={{ width: 200 }} onChange={e=>setInstitution(e.target.value)} required/>
                <br/>
                <br/>
                <TextareaAutosize
                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Description"
                    defaultValue=""
                    style={{ width: 200, height: 100 }}
                    onChange={e=>setDesc(e.target.value)}
                    required
                />
                <br/>
                <br/>
                <Input
                    accept="image/*"
                    type="file"
                    style={{ width: 200 }}
                    onChange={e=>setImage(e.target.files[0])}
                    required
                />
                <br/>
                <br/>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default AddStudent;