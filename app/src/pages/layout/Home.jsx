import React from 'react';
import {  Link } from 'react-router-dom';
import '../../index.css'


const Home = () => {
  return (
    <>
    <div  className='min-h-screen mt-20 backgroundIm bg-gradient-to-tr from-slate-400 from-20% via-slate-100 via-60% to-slate-200'>
        <div className=' h-svh flex items-center justify-center'>
            <div className='h-1/4 rounded-md bg-slate-50 border border-spacing-1 border-gray-100 shadow-md flex items-center justify-center'>
                <div className='h-20  pl-16 pr-4 flex items-center justify-center'>
                    <Link to={'/user/login'} className='text-2xl bg-white border border-spacing-2 px-4 py-1 rounded-md shadow-md'>Login</Link>
                </div>
                <div className='h-20  pr-16 pl-4 flex items-center justify-center'>
                    <Link to={'/user/sign-up'} className='text-2xl bg-white border border-spacing-2 px-4 py-1 rounded-md shadow-md'>SignUp</Link>
                </div>
            </div>
        </div>

    </div>
    </>
  );
};

export default Home;
