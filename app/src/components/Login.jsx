import React, { useState } from 'react';
import postMethod from '../utility/Post';
import { Link, useNavigate } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your Google client ID

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginText,setLoginText]=useState('Login');
  const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;
  const navigate=useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${SERVERBASEURL}/users/login`
    // console.log(url)
    postMethod({ email: email, password: password },url)
        .then((res) => {
            if (res) {

                setLoginText("Success");
                navigate('/user/get-jobs')
            }
           else{
            setLoginText("Failed");
           }
            
        })
        .catch((err) => {
            // console.log('err',err)
            setLoginText("Failedd");
        })
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google Sign In Success:', response.profileObj);
    // Handle Google sign-in success (e.g., send data to your server)
  };

  const handleGoogleFailure = (response) => {
    console.log('Google Sign In Failure:', response);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            {loginText}
          </button>
          <h1>Not have an account?  <Link to={'/user/sign-up'} className='border border-slate-100 px-4 shadow-md rounded-md'>Sign Up</Link></h1>
         
        </form>
        <div className="flex items-center justify-center mt-6">
          {/* <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            className="w-full"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
