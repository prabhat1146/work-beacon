import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const MyPostedJob = () => {
    const [totalAppliedJobs, setTotalAppliedJobs] = useState();
    const [userId, setUserId] = useState();
    const [user,setUser]=useState();
    // const {setSlider}=useContext(NavBarContext)

    const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;
    useEffect(() => {
        setUserId(cookies.get('userId'))
        const url = `${SERVERBASEURL}/users/get-populated-user-by-req`


        fetch(url,{credentials:"include"})
            .then((res) => {

                if (res.ok) {
                    return res.json()
                }
            })
            .then((res) => {

                // console.log(res.data)
                // console.log(res?.data?.jobConfirmed?.find((id)=>id===cookies.get('userId')))
                setTotalAppliedJobs(res?.data?.jobRequested)
                setUser(res?.data)
                // const myRequestedJobs = res?.data?.map((job) => job?.requestedUsers.find(id => id === cookies.get('userId')))
                // console.log('m', myRequestedJobs, userId)
                // setTotalJobs(res.data)

            })
            .catch((error) => {
                console.error(error)
            })
    }, [SERVERBASEURL])

    const joinJob = (jobId,jobProviderId) => {
        const url = `${SERVERBASEURL}/users/join-job?jobId=${jobId}&jobProviderId=${jobProviderId}`
        console.log(jobProviderId)
        if (window.confirm("Are you sure ?")) {
            fetch(url,{credentials:"include"})
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then(() => {

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    const cancelJob = (jobId,jobProviderId) => {
        const url = `${SERVERBASEURL}/users/cancel-job?jobId=${jobId}&jobProviderId${jobProviderId}`
        if (window.confirm("Are you sure ?")) {
            fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then(() => {

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-12 mt-20 bg-slate-400'>
                {(totalAppliedJobs)?.map((child, ind) => {
                //    console.log(user?.jobAccepted?.find((id)=>id===child._id))
                    return <div key={ind} className=' bg-slate-100 m-1 p-4 pl-8 rounded-md'>
                        <h1>Name: {child.jobNam}</h1>
                        <h1>User-id: </h1>
                        <h1>Email: prabhat@gmail.com</h1>
                        <h1>Job Name: {child.jobName}</h1>
                        <h1>Job-id: {child.jobId}</h1>
                        <h1>Category: {child.category}</h1>
                        <h1>Sub Category: {child.subCategory}</h1>
                        <h1>date: {child.date}</h1>
                        <h1>time: {child.time}</h1>
                        <h1>Location: {child.location}</h1>
                        <h1>district: {child.district}</h1>
                        <h1>State: {child?.state}</h1>
                        <h1>Description: {child.description}</h1>
                        <h1>address: {child?.address}</h1>
                        <h1>User: {child?._id}</h1>
                        <h1>User: {child?.jobCreator}</h1>
                        <h1>Status: {child?.status}</h1>

                        <div>
                            <button onClick={() => { joinJob(child._id,child?.jobCreator) }} disabled={!(user?.jobAccepted?.find((id)=>id===child._id))} className={` ${(user?.jobAccepted?.find((id)=>id===child._id)) ? ' cursor-pointer' : 'hover:bg-green-800 cursor-not-allowed'} border px-6 py-1 rounded-md  mx-1 mt-2 text-white bg-green-500`}>Join</button>
                            <button onClick={() => { cancelJob() }} className='border px-6 py-1 rounded-md mx-1 mt-2 text-white bg-red-500 hover:bg-red-800'>Cancel</button>
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Notify Me</button> */}
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Chat</button> */}

                        </div>


                    </div>
                })}



            </div>
        </>
    );
};

export default MyPostedJob;