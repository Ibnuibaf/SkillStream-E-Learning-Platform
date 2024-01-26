import { IOTP } from "../interfaces/otp"
import OTP from "../models/otp.model"

class OtpRepository{
    async storeOtp(details:IOTP){
        try {
            const otpDetails=await OTP.create(details)
            if(!otpDetails){
                return{
                    success:false,
                    message:"OTP not stored"
                }
            }
            return{
                success:true,
                message:"OTP stored"
            }
        } catch (error:any) {
            return{
                success:false,
                message: error.message
            }
        }
    }
    async checkOtp(details:IOTP){
        try {
            const isAvail=await OTP.findOne(details)
            if(!isAvail){
                return{
                    success:false,
                    message:"OTP doesnt match"
                }
            }
            return{
                success:true,
                message:"OTP matched"
            }
        } catch (error:any) {
            return{
                success:false,
                message: error.message
            }
        }
    }
    async deleteOtp(email:string){
        try {
            await OTP.deleteMany({email:email})
            return{
                success:true,
                message:"Removed all existing otp of given email"
            }
        } catch (error:any) {
            return{
                success:false,
                message: error.message
            }
        }
    }
}

export default OtpRepository