//create token and saving in cookies
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken(); // Generate JWT token
    
    // Options for cookie
    const options = {
        expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    };
    
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
}

module.exports = sendToken;
