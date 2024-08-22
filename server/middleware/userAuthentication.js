const ApiResponse = require("../utils/apiResponse");

function ensureAuthenticated(req, res, next) {
    const userId = req.cookies["userId"]
   
    
    if (userId?.toString()?.length==24) {
        console.log("login success")
        return next(); // User is authenticated, proceed to the next middleware or route
    } else {
        console.log("redirected")
        res.status(302).json(new ApiResponse(302," ","unauthorized Access"));
        // Set the Access-Control-Allow-Origin header based on the request's origin
        // res.redirect('http://localhost:3000/user/logout');
         // Perform a 307 (Temporary Redirect) with explicit status and destination URL
    
        

    }
}

module.exports = ensureAuthenticated;
