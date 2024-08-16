const { Router }= require("express");
const ensureAuthenticated=require("../middleware/userAuthentication.js")
const {postJob, getJob,userApplyForJob,userPostedJobs,userDeletePostedJob, getJobById, acceptJob,  joinJob, cancelJob, rejectJob } = require("../controllers/usersControllers.js");
const {login,signUp, getCookie, getUser, getUsers,  getPopulatedUserByReq,getPopulatedUserByCon, logout} = require('../controllers/usersRegistration.js')
const router= Router()
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/sign-up").post(signUp);
router.route("/get-user").get(getUser);
router.route("/get-users").get(getUsers);
router.route("/get-populated-user-by-req").get(getPopulatedUserByReq);
router.route("/get-populated-user-by-con").get(getPopulatedUserByCon);
router.route("/getCookie").get(getCookie);
router.route("/post-jobs").post(postJob);
router.route("/get-jobs").get(getJob);
router.route("/get-jobs-by-id").get(getJobById);
router.route("/accept-job").get(acceptJob);
router.route("/reject-job").get(rejectJob);
router.route("/join-job").get(joinJob);
router.route("/cancel-job").get(cancelJob);
router.route("/application").get(userApplyForJob);
router.route("/posted-job").get(userPostedJobs);
router.route("/delete-job").get(userDeletePostedJob);


module.exports=router