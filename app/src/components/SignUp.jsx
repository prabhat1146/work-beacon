import React, { useEffect, useState } from 'react';
import postMethod from '../utility/Post';
import { Link } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your Google client ID

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpText, setSignUpText] = useState("Sign Up");
    const SERVERBASEURL = process.env.REACT_APP_SERVERBASEURL;

    useEffect(() => {
        setSignUpText("Sign Up");
    }, [email, password])

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (e.g., send data to your server)
        const url = `${SERVERBASEURL}/users/sign-up`
        // console.log(url)
        postMethod({ email: email, password: password },url)
            .then((res) => {
                if (res) {

                    setSignUpText("Success");
                }
               else{
                setSignUpText("Failed");
               }
                
            })
            .catch((err) => {
                // console.log('err',err)
                setSignUpText("Failedd");
            })
        // console.log('Email:', email);
        // console.log('Password:', password);
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
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
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
                        {signUpText}
                    </button>
                    <h1>Already have an account?  <Link to={'/user/login'} className='border border-slate-100 px-4 shadow-md rounded-md'>Login</Link></h1>
                </form>
                
                <div className="flex items-center justify-center mt-6">
                    {/* <GoogleLogin
            clientId={clientId}
            buttonText="Sign Up with Google"
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

export default SignUp;
