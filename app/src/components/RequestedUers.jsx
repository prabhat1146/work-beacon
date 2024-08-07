import React, { useEffect, useId, useState } from 'react';
import { useLocation } from 'react-router';




const RequestedUsers = (props) => {
    const [requestedUsers, setRequestedUsers] = useState();
    // job-id to declied and accept job with user
    const [jobId, setJobId] = useState(null);
    const [providerJobStatus, setProviderJobStatus] = useState();


    const location = useLocation();


    const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;
    useEffect(() => {
        // it is populated by reqestedUser
        const url = `${SERVERBASEURL}/users/get-jobs-by-id?jobId=${location?.state.jobId}`

        // console.log(url)
        fetch(url)
            .then((res) => {

                if (res.ok) {
                    return res.json()
                }
            })
            .then((res) => {
                console.log(res)
                setJobId(res?.data?._id)
                setProviderJobStatus(res?.data?.jobStatusForProvider)
                setRequestedUsers(res?.data?.requestedUsers)

            })
            .catch((error) => {
                console.error(error)
            })
    }, [SERVERBASEURL])

    const acceptob = (userId) => {
        const url = `${SERVERBASEURL}/users/accept-job?jobId=${jobId}&userId=${userId}`
        console.log(userId, jobId)
        if (window.confirm("Are you sure ?")) {
            fetch(url,{credentials:"include"})
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    const rejectJob = (userId) => {
        const url = `${SERVERBASEURL}/users/reject-job?jobId=${jobId}&userId=${userId}`
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

    return (
        < >
            <div className=' min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-12 mt-20 bg-slate-100'>
                {(requestedUsers)?.map((child, ind) => {
                    const requestedJob=child?.jobStatusForProvider?.find((child) => child.job === jobId);
                    console.log('l',requestedJob.currentStatus)
                    return <div key={ind} className=' bg-slate-100 m-1 p-4 pl-8 rounded-md'>
                        <h1>Name: {child.userName}</h1>
                        <h1>Email:  {child.userEmail}</h1>
                        <h1>Mobile No.: {child.userMobile}</h1>
                        <h1>Address: {child.address}</h1>
                        <h1>Skills Rating: {child.rating}</h1>
                        <h1>Skills: {child.skills?.map((skill) => skill)}</h1>
                        <h1>Job/Works Done: {child.jobDone?.length}</h1>
                        <h1>Job/Works Joined: {child.jobConfirmed?.length}</h1>
                        <h1>User's say: {child.userSay}</h1>
                        <h1>User's Review: {child.userReview}</h1>
                        {/* <h1>User's Review: {child._id}</h1> */}
                        {/* <h1>status : {jobStatus}</h1> */}


                        <div>
                            <button onClick={() => { acceptob(child?._id) }} disabled={requestedJob.currentStatus !== "Requested"} className={` ${requestedJob.currentStatus === "Requested" ? ' cursor-pointer hover:bg-green-700' : 'hover:bg-green-800 cursor-not-allowed'} border px-6 py-1 rounded-md  mx-1 mt-2 text-white bg-green-500`}>{requestedJob.currentStatus==="Accepted"? "Accepted": "Accept"}</button>
                            <button onClick={() => { rejectJob(child?._id) }} disabled={requestedJob.currentStatus === "Requested"} className={` ${true ? ' cursor-pointer hover:bg-red-700' : 'hover:bg-red-800 cursor-not-allowed'} border px-6 py-1 rounded-md  mx-1 mt-2 text-white bg-red-500`}>Reject</button>
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Notify Me</button> */}
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Chat</button> */}

                        </div>


                    </div>
                })}



            </div>
        </>
    );
};

export default RequestedUsers;