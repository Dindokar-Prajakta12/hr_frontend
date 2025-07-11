const apis = ()=>{
    const local = 'https://hr-backend-2-c07c.onrender.com/'

    const list = {
        registerUser:`${local}user/register`,
        loginUser:`${local}user/login`,
        forgetPassword:`${local}user/forget/password`,
        otpVerify: `${local}user/otp/verify`,
        UpdatePassword:`${local}user/password/update`,
    }
    return list

}

export default apis;
