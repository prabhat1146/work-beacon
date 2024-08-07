import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

const GetJob = () => {
    // total number of jobs
    const [totalJobs, setTotalJobs] = useState();
    //apply button text
    const [totalApply, setTotalApply] = useState(0)
    const [userId,setUserId]=useState();

    const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;
    useEffect(() => {
        const url = `${SERVERBASEURL}/users/get-jobs`

        fetch(url,{credentials:"include"})
            .then((res) => {

                if (res.ok) {
                    return res.json()
                }
                return []
            })
            .then((res) => {
                // console.log(res)
                // const alreadyAppliedUser=res?.data.map((data)=>{return data.requestedUsers.find(id=>id===userId)})
                // if(alreadyAppliedUser){
                //     setJobApplyButtonText("Applied");
                // }
                setTotalJobs(res.data)
                setUserId(cookies.get("userId"))
                // console.log(cookies.getAll())


            })
            .catch((error) => {
                console.error(error)
            })
    }, [SERVERBASEURL,totalApply])

    const applyForJob = async (jobId) => {
        const url = `${SERVERBASEURL}/users/application?jobId=${jobId}`;
        console.log(url)
        fetch(url,{credentials:"include"})
            .then((res) => {

                if (res.ok) {
                    return res.json()
                }
                return []
            })
            .then((res) => {
                if(res.statusCode<400){
                    // setApplyStatus("Applied")
                    setTotalApply(totalApply+1);
                }
                // console.log(res.statusCode)


            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            <div className=' min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-20 bg-slate-100'>
                {(totalJobs)?.map((child, ind) => {
                    // console.log('u',child)
                    return <div key={ind} className=' bg-slate-50 m-1 p-4 pl-8 rounded-md'>
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
                        {/* <h1>User: {child?.user?.userName}</h1> */}
                        <h1>Applied Uers: {child?.requestedUsers?.length}</h1>
                        {/* <h1>Applied Uers: {child?.requestedUsers?.find(id=>id==="66b2154dd429c39ecd1200a8")}</h1> */}
                        {/* <h1>User: {child?._id}</h1> */}

                        <div className='mt-4 mb-2'>
                            <button onClick={() => { applyForJob(child._id) }} disabled={child.status==="Posted"} className={` ${child.status==="Posted"?" cursor-not-allowed  bg-green-700":" "} border px-6 py-1 rounded-md mx-1 mt-2 bg-green-500 shadow-md text-white hover:bg-green-700`}>{child.requestedUsers.find(id=>id===userId)?"Applied":"Apply"}</button>
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Available</button> */}
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Notify Me</button> */}
                            {/* <button className='border px-2 rounded-sm mx-1 mt-2'>Chat</button> */}

                        </div>


                    </div>
                })}



            </div>
        </>
    );
};

export default GetJob;