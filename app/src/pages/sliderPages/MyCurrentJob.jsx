import React, { useEffect, useState,useContext } from 'react';


const MyCurrentJob = () => {
    const [totalJobs, setTotalJobs] = useState();


    const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;
    useEffect(() => {
        const url = `${SERVERBASEURL}/users/get-populated-user-by-con`
       

        fetch(url,{credentials:"include"})
            .then((res) => {

                if (res.ok) {
                    return res.json()
                }
            })
            .then((res) => {
               
                setTotalJobs(res.data?.jobConfirmed
                )
                console.log(res)

            })
            .catch((error) => {
                console.error(error)
            })
    }, [SERVERBASEURL])

    const completeJob = () => {
        const url = `${SERVERBASEURL}/users/complete-job?userId=${"userId"}&ProviderId=${"p"}&jobId=${"j"}`
        if(window.confirm("Are you sure ?")){
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
    const leaveJob = () => {
       const url = `${SERVERBASEURL}/users/complete-job?userId=${"userId"}&ProviderId=${"p"}&jobId=${"j"}`
        if(window.confirm("Are you sure ?")){
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

    return (
        <>
            <div className=' min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-12 mt-20 bg-slate-100'>
                {(totalJobs)?.map((child, ind) => {
                    // console.log('u', child)
                    return <div key={ind} className=' bg-white m-1 p-4 pl-8 rounded-md'>
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
                        <h1>User: {child?.user?.userName}</h1>

                        <div>
                            <button onClick={()=>{completeJob()}} disabled={child.status !== "confirmed"} className={` ${child.status === "completed" ? ' cursor-pointer':'hover:bg-blue-800 cursor-not-allowed'} border px-6 py-1 rounded-md  mx-1 mt-2 text-white bg-blue-500`}>Complete</button>
                            <button onClick={()=>{leaveJob()}}  className='border px-6 py-1 rounded-md mx-1 mt-2 text-white bg-red-500 hover:bg-red-800'>Leave</button>
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Notify Me</button> */}
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Chat</button> */}

                        </div>


                    </div>
                })}



            </div>
        </>
    );
};

export default MyCurrentJob;