import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

// import { WebhookHandler } from './webhook-handler.interface';

@Injectable()
export class WebHookService {
  constructor(private readonly httpService: HttpService) {}

  async webHookSendMessage(
    psid: string,
    message: string,
    pageToken: string,
    pageId: string,
  ): Promise<any> {
    const url = `https://graph.facebook.com/v20.0/${pageId}/messages?access_token=${pageToken}`;

    const payload = {
      recipient: {
        id: psid,
      },
      message: {
        text: message,
      },
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to send message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
