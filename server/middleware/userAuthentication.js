function ensureAuthenticated(req, res, next) {
    const ck = req.cookies["userId"]
    let len=ck?.length();
    console.log("len",ck)
    if (ck) {
        console.log("login success")
        return next(); // User is authenticated, proceed to the next middleware or route
    } else {
        console.log("redirected")
        res.status(404).redirect(process.env.APP_URL); // User is not authenticated, redirect to login page
    }
}

module.exports = ensureAuthenticated;
