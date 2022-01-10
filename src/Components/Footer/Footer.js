import { SvgIcon } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
    const navigation=useNavigate();
    return (
        <div className='text-center d-flex align-items-center justify-content-center py-4 bg-light bg-gradient'>
            <SvgIcon onClick={()=>navigation('/home')} className="pe-2" sx={{ fontSize: 40,color:'black',cursor:'pointer'}}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
            <FacebookIcon className="pe-2" color="primary" sx={{ fontSize: 40,cursor:'pointer' }} />
            <InstagramIcon className="pe-2" sx={{ fontSize: 40,color:'red',cursor:'pointer' }}/>
            <GitHubIcon color="success" sx={{ fontSize: 40,cursor:'pointer' }}/>
            <SchoolIcon onClick={()=>navigation('/allStudents')} sx={{ fontSize: 40,cursor:'pointer' }}/>
        </div>
    );
};

export default Footer;