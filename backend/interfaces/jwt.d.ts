import jwt, { JwtPayload } from 'jsonwebtoken'

interface MyJWTPayLoad extends JwtPayload{
    id:string
    email:string
    role:string
}


export default MyJWTPayLoad