// src/instagram/instagram.controller.ts
import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { InstagramService } from './instagram.service';
import { env } from 'process';

// interface User {
//   id: string;
//   username: string;
//   accessToken: string;
// }

@Controller()
export class InstagramController {
  public accessToken: string = env.INSTAGRAM_ACCESS_TOKEN;
  // public userId: string = env.INSTA_USER_ID;

  constructor(private readonly instagramService: InstagramService) {}

  @Get('/instagram/user')
  async instagramUser() {
    const userProfile = await this.instagramService.getUserProfile(
      this.accessToken,
    );
    return userProfile;
  }

  @Get('/instagram/user/conversations')
  async getConversation() {
    return await this.instagramService.getConversation(this.accessToken);
  }
}
