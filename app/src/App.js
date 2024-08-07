
import './App.css';

import {  createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './pages/layout/Layout';
import Home from './pages/layout/Home';
import {Profile, MyAppliedJob,MyCurrentJob,MyPostedJob,PostJob,GetJob, RequestedUsers, SignUp, Login } from './allPages/AllPages';

const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route path='' element={<Home/>} />
    <Route path='user/sign-up' element={<SignUp/>} />
    <Route path='user/login' element={<Login/>} />
    <Route path='user/logout' element={<Home/>} />
    <Route path='user/my-profile' element={<Profile/>} />
    {/* <Route path='user/register' element={<Home/>} /> */}
    <Route path='user/my-applied-jobs' element={<MyAppliedJob/>} />
    <Route path='user/my-current-jobs' element={<MyCurrentJob/>} />
    <Route path='user/my-posted-jobs' element={<MyPostedJob/>} />
    <Route path='user/post-jobs' element={<PostJob/>} />
    <Route path='user/get-jobs' element={<GetJob/>} />
    <Route path='user/users-requested-for-jobs' element={<RequestedUsers/>} />

  </Route>
))

// console.log(process.env)

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
