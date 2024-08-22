const { Router }= require("express");
const ensureAuthenticated=require("../middleware/userAuthentication.js")
const {postJob, getJob,getJobUserId,userApplyForJob,userPostedJobs,userDeletePostedJob, getJobById, acceptJob,  joinJob, cancelJob, rejectJob } = require("../controllers/usersControllers.js");
const {login,signUp, getCookie, getUser, getUsers,  getPopulatedUserByReq,getPopulatedUserByCon, logout} = require('../controllers/usersRegistration.js')
const router= Router()
router.route("/login").post(login);
router.route("/logout").get(ensureAuthenticated,logout);
router.route("/sign-up").post(signUp);
router.route("/get-user").get(ensureAuthenticated,getUser);
router.route("/get-users").get(ensureAuthenticated,getUsers);
router.route("/get-populated-user-by-req").get(ensureAuthenticated,getPopulatedUserByReq);
router.route("/get-populated-user-by-con").get(ensureAuthenticated,getPopulatedUserByCon);
router.route("/getCookie").get(getCookie);
router.route("/post-jobs").post(ensureAuthenticated,postJob);
router.route("/get-jobs").get(getJob);
router.route("/get-jobs-userId").get(getJobUserId);
router.route("/get-jobs-by-id").get(ensureAuthenticated,getJobById);
router.route("/accept-job").get(ensureAuthenticated,acceptJob);
router.route("/reject-job").get(ensureAuthenticated,rejectJob);
router.route("/join-job").get(ensureAuthenticated,joinJob);
router.route("/cancel-job").get(ensureAuthenticated,cancelJob);
router.route("/application").get(ensureAuthenticated,userApplyForJob);
router.route("/posted-job").get(ensureAuthenticated,userPostedJobs);
router.route("/delete-job").get(ensureAuthenticated,userDeletePostedJob);


module.exports=router