// src/instagram/instagram.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class InstagramService {
  constructor(private httpService: HttpService) {}

  async getUserProfile(accessToken: string): Promise<any> {
    const url = `https://graph.instagram.com/v20.0/me?fields=id,username&access_token=${accessToken}`;

    try {
      const response: any = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch Instagram name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getConversation(accessToken: string): Promise<any> {
    const url = `https://graph.instagram.com/v20.0/me/conversations?platform=instagram&access_token=${accessToken}`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      );

      console.log('api response', response);

      return response.data;
    } catch (error) {
      console.error('Error fetching Instagram conversations:', error.message);
      throw new HttpException(
        'Failed to fetch Instagram Conversation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //   async getMessagesById(conversationId: string, accessToken: string) {
  //     const url = `https://graph.instagram.com/v20.0/${conversationId}&fields=messages&access_token=${accessToken}`;

  //     try {
  //       const response: any = await lastValueFrom(this.httpService.get(url));

  //       return response.data.message.data;
  //     } catch (error) {
  //       throw new HttpException(
  //         'Failed to fetch Instagram User Conversation',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
}
