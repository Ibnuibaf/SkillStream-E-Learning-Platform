// import passport from "passport";
// import dotenv from "dotenv";

// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import userModel from "../models/user.model";

// dotenv.config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       callbackURL: "/api/user/google/callback",
//       scope: ["profile", "email"],
//     },
//     async (_accessToken: string, _refreshToken: string, profile: any, done) => {
//       const user = await userModel.findById(profile.id);
//       if (user) {
//         return done(null, user);
//       } else {
//         const newUser = await userModel.create({
//           name: profile.displayName,
//           email: profile.email[0].value,
//           avatar: profile.photos[0].value,
//           _id: profile.id
//         });
//         return done(null,newUser)
//       }
//     }
//   )
// );

// passport.serializeUser((user:any,done)=>{
//     done(null,user.id)
// })

// passport.deserializeUser(async(id:string,done)=>{
//     const user=await userModel.findById(id)
//     done(null,user)
// })