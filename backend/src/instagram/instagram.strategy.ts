// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, Profile, VerifyFunction } from 'passport-instagram';
// import { env } from 'process';

// @Injectable()
// export class InstagramStrategy extends PassportStrategy(Strategy, 'instagram') {
//   constructor() {
//     super({
//       clientID: process.env.INSTA_APP_ID,
//       clientSecret: process.env.APP_SECRET,
//       callbackURL: 'http://localhost:3001/auth/instagram/user',
//       scope: ['user_profile', 'user_media'],
//     });
//   }

// validate: VerifyFunction = (
//   accessToken: string,
//   refreshToken: string,
//   profile: Profile,
//   done: (error: any, user?: any, info?: any) => void,
// ) => {
//   const { id, username } = profile;
//   const user = { id, username, accessToken };
//   done(null, user);
// };
// }
