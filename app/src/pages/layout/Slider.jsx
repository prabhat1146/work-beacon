import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import NavBarContext from '../../context/NavBarContext';
import { Link } from 'react-router-dom';

const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;

const Slider = () => {

    const { slider, setSlider } = useContext(NavBarContext)

    const logout=()=>{
        setSlider('sliderFalse');
         const url = `${SERVERBASEURL}/users/logout`
        fetch(url,{credentials:"include"})
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                return []
            }
        })
        .then((res)=>{

        })
        .catch((err)=>{
            console.log(err)
        })

    }
    return (
        <>{slider === "sliderTrue" &&
            <div className={`transform transition-transform duration-500 ease-in-out
                ${slider === "sliderTrue" ? 'translate-x-0' : '-translate-x-full'}
            bg-slate-700 
              w-3/4
              md:w-1/2
              lg:w-1/3
              xl:w-1/4
              h-screen 
              fixed 
              z-50
              top-0 
              left-0`}>
                <div className='flex items-center justify-between mx-6 my-2'>
                    <div className='w-20 h-20 rounded-full bg-white flex items-center justify-center'>
                        <img src="" alt="Profile Pic" />
                    </div>
                    <div>
                        <FontAwesomeIcon onClick={() => { setSlider("sliderFalse") }} className='cursor-pointer w-10 h-10 text-white' icon={faSquareXmark} />
                    </div>
                </div>
                <hr />
                <div >
                    <div className='flex flex-col items-center justify-center w-full mt-6 text-2xl text-white'>
                        <Link onClick={()=>{setSlider('sliderFalse')}} to={'/user/my-profile'} className='border border-slate-600 px-24 py-1 w-full'> Profile</Link>
                        <Link onClick={()=>{setSlider('sliderFalse')}} to={'/user/my-posted-jobs'} className='border border-slate-600 px-24 py-1 w-full'> Posted Job</Link>
                        <Link onClick={()=>{setSlider('sliderFalse')}} to={'/user/my-applied-jobs'} className='border border-slate-600 px-24 py-1 w-full'> Applied Job</Link>
                        <Link onClick={()=>{setSlider('sliderFalse')}} to={'/user/my-current-jobs'} className='border border-slate-600 px-24 py-1 w-full'> current job</Link>
                        {/* <button onClick={()=>{setSlider('asked')}} className='border border-slate-600 py-1'>Asked</button> */}
                        {/* <button onClick={()=>{setSlider('bid')}} className='border border-slate-600 py-1'>Bid</button> */}
                        <Link onClick={()=>{logout()}} to={'/user/logout'} className='border border-slate-600 px-24 py-1 w-full'>Logout</Link>
                        {/* <Link>hi</Link> */}
                    </div>

                </div>

            </div>
        }
        </>
    );
};

export default Slider;