const apis = ()=>{
    const local = 'http://localhost:5000/'

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
