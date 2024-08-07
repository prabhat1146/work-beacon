import React, { useEffect, useState } from 'react';
import postMethod from '../../utility/Post';
// import dotenv from  'dotenv'

const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;

const PostJob = () => {

    const [data, setData] = useState([]);
    const [submitText, setSubmitText] = useState("Submit");


    const [jobName, setJobName] = useState();
    const [jobId, setJobId] = useState('Generate');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [location, setLocation] = useState();
    const [description, setDescription] = useState();
    const [state, setState] = useState();
    const [district, setDistrict] = useState();
    const [address, setAddress] = useState();
    const [jobIdGenerated, setJobIdGenerated] = useState(false);

    const [userD,setUserD]=useState([]);

    useEffect(() => {
        setSubmitText("Submit")
    }, [jobName, jobId, price, category, subCategory, date, time, location, state, district, description, address])
    useEffect(()=>{
        const currentDate=new Date();
        console.log(currentDate.toLocaleDateString())
        console.log(currentDate.toLocaleTimeString())
        setTime(currentDate.toLocaleTimeString());
        setDate(currentDate.toLocaleDateString());
    },[date,time])

    //generate job id for later use case
    const generateId = () => {
        const code = "91";
        const url = `${SERVERBASEURL}/users/get-jobs`
        fetch(url,{credentials:"include"})
            .then((res) => {

                if (res.ok) {
                    return res.json()
                }
                return []
            })
            .then((res) => {
                console.log(res.data.length)
                const data = res.data
                const lastJobIndex=data?.length
                if(!lastJobIndex ){
                    if(lastJobIndex===0){

                    }else{

                        return
                    }
                }
                if(lastJobIndex<0){
                    return
                }
                const jobIndexWithCode = code + lastJobIndex?.toString().padStart(10, "0");
                const currentTime = new Date();
                const timeStamps = currentTime.getTime();
                const id = jobIndexWithCode + timeStamps
                setJobId(id);
                setJobIdGenerated(true)

            })
            .catch((error) => {
                console.error(error)
                return 0

            })

  
      

    }

    useEffect(()=>{
        const url = `${SERVERBASEURL}/users/register`;
        const data={
            userName:'prabat Kumar',
            userId:"123",
            email:"prabhat@gmail.com",
            password:'password'

        }

        postMethod(data, url)
            .then((res) => {
                if (res) {
                    // setSubmitText("Submited")
                } else {
                    // setSubmitText("Failed")
                }
                console.log(res)
            })


        setData([])
    },[userD])

    const submit = () => {

        const data={
            jobName:jobName,
            jobId:jobId,
            price:price,
            category:category,
            subCategory:subCategory,
            date:date,
            time:time,
            location:location,
            state:state,
            district:district,
            description:description,
            address:address,
        }

        const url = `${SERVERBASEURL}/users/post-jobs`;
        postMethod(data, url)
            .then((res) => {
                if (res) {
                    setSubmitText("Submited")
                } else {
                    setSubmitText("Failed")
                }
                console.log(res)
            })


        setData([])



    }

    return (
        < > <div className='bg-slate-100'>
            <div className='mt-20 '>

            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 m-4 pt-4'>
                <h1>Name: prabhat Kumar</h1>
                <h1>User-id: prabhat123</h1>
                <h1>Email: prabhat@gmail.com</h1>
            </div>
            <hr />

            <div className='grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-2 px-2 '>
                <div className='flex items-center justify-center flex-col mt-4'>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>Job Name *</h1>
                    <input type="text"
                        value={jobName}
                        onChange={(e) => { setJobName(e.target.value) }}
                        className=' w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    />
                </div>
                <div className='flex items-center justify-center flex-col  '>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>Job id *</h1>

                    <button disabled={jobIdGenerated} onClick={generateId} className='bg-slate-50 border overflow-hidden rounded-md px-2 py-1 w-3/4'>{jobId} </button>
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-50 border rounded-md px-2 py-1 w-3/4'>Price *</h1>
                    <input type="number"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        className='w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    />
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>Category *</h1>
                    <select name="select" id="select"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                        className='w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    >
                        <option value="option">Select</option>
                        <option value="select-1">Category-1</option>
                        <option value="select-2">Category-2</option>
                    </select>
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-100  border rounded-md px-2 py-1 w-3/4'>Sub Category *</h1>
                    <select name="select" id="select"
                        value={subCategory}
                        onChange={(e) => { setSubCategory(e.target.value) }}
                        className='w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    >
                        <option value="option">Select</option>
                        <option value="select-1">Sub Category-1</option>
                        <option value="select-2">Sub Category-2</option>
                    </select>
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>Date *</h1>
                    <input type="date('dd/mm/yy')"
                        value={date}
                        onChange={(e) => { setDate(e.target.value) }}
                        disabled={true}
                        className='w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    />
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>Time *</h1>
                    <input type="time"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                        disabled={true}
                        className='w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    />
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>Location *</h1>
                    <input type="text"
                        value={location}
                        onChange={(e) => { setLocation(e.target.value) }}
                        className='w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    />
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>State *</h1>
                    <input type="text"
                        value={state}
                        onChange={(e) => { setState(e.target.value) }}
                        className='w-3/4  outline-none bg-white border rounded-md px-2 py-1'
                    />
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>District *</h1>
                    <input type="text"
                        value={district}
                        onChange={(e) => { setDistrict(e.target.value) }}
                        className=' w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    />
                </div>
                <div className='flex items-center justify-center flex-col '>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>Address *</h1>
                    <input type="text"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        className=' w-3/4 outline-none bg-white border rounded-md px-2 py-1'
                    />
                </div>

            </div>
            <div className=''>
                <div className='mx-2 p-2 flex flex-col items-center justify-center'>
                    <h1 className='bg-slate-100 border rounded-md px-2 py-1 w-3/4'>Job-description *</h1>
                    <textarea className=' w-3/4  h-24 outline-none bg-white border rounded-md px-2 py-1'
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    >
                        Write job descriptions here
                    </textarea>
                </div>
                <div className=' flex items-center justify-center my-4'>
                    <button disabled={submitText==='Submited'} onClick={submit} className={`border px-8 py-2   p-16 text-white rounded-md ${submitText==='Submited' ? 'bg-green-900 hover:bg-green-900 cursor-not-allowed' : 'bg-green-600 hover:bg-green-600'}`}>{submitText}</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default PostJob;