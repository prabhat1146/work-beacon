import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import NavBarContext from '../../context/NavBarContext';
import { Link } from 'react-router-dom';

const NavBar = () => {

    // const [slider,setSlider]=useState("sliderFalse");
    const {setSlider}=useContext(NavBarContext)
    return (
        <div className=' h-20 bg-slate-600 w-full flex flex-row items-center justify-evenly fixed top-0 left-0'>
            <FontAwesomeIcon onClick={()=>{setSlider("sliderTrue")}} className='text-white w-10 h-10 cursor-pointer' icon={faBars} />
            <Link to={'/'} className='text-white'>Home</Link>
            <Link to={'/user/get-jobs'} className='text-white'>Get Job</Link>
            <Link to={"/user/post-jobs"} className='text-white'>Post Job</Link>
            
        </div>
    );
};

export default NavBar;