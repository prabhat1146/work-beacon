import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const MyPostedJob = () => {
    const [totalJobs, setTotalJobs] = useState();


    const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;

    useEffect(() => {

        const url = `${SERVERBASEURL}/users/get-jobs`

        fetch(url,{credentials:"include"})
            .then((res) => {

                if (res.ok) {
                    return res.json()
                }
            })
            .then((res) => {
                setTotalJobs(res.data)

            })
            .catch((error) => {
                console.error(error)
            })
    }, [SERVERBASEURL])

    const deleteJob = (jobid) => {
        if (window.confirm("Are you sure ?")) {
            const url = `${SERVERBASEURL}/users/delete-job?$jobId=${jobid}`
            fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }

                    return [];
                })
                .then((res) => {

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }


    return (
        <>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-12 mt-20 bg-slate-400'>
                {(totalJobs)?.map((child, ind) => {
                    // console.log('u', child)
                    return <div key={ind} className=' bg-slate-100 m-1 p-4 pl-8 rounded-md'>
                       
                        <h1>Job Name: {child.jobName}</h1>
                        <h1>Job-id: {child.jobId}</h1>
                        <h1>Status: {child.status}</h1>
                        <h1>Category: {child.category}</h1>
                        <h1>Sub Category: {child.subCategory}</h1>
                        <h1>date: {child.date}</h1>
                        <h1>time: {child.time}</h1>
                        <h1>Location: {child.location}</h1>
                        <h1>State: {child?.state}</h1>
                        <h1>district: {child.district}</h1>
                        <h1>address: {child?.address}</h1>
                        <h1>Description: {child.description}</h1>
                        <h1>Total Users Requested: {child?.requestedUsers?.length}</h1>


                        <div className='mt-8 mb-4'>
                            <Link
                                to={{
                                    pathname: "/user/users-requested-for-jobs",

                                }
                                }
                                state={{jobId:child._id}}
                                className='border px-2 py-1 rounded-md mx-1 mt-2 bg-green-600 text-white hover:bg-green-800'
                            >Requested Users
                            </Link>
                            <Link onClick={() => { deleteJob(child._id) }} className='border px-2 py-1 rounded-md mx-1 mt-2 bg-red-600 text-white hover:bg-red-800'>Delete</Link>
                            <Link className='border px-4 py-1 rounded-md mx-1 mt-2 bg-blue-600 text-white hover:bg-blue-800'>Edit</Link>
                            {/* <button className='border px-2 py-1 rounded-md mx-1 mt-2'>Chat</button> */}

                        </div>


                    </div>
                })}



            </div>
        </>
    );
};

export default MyPostedJob;