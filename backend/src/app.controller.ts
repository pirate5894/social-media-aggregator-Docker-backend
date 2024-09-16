import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Req,
  HttpException,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import { WebHookService } from './webHook.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
    private readonly webHookService: WebHookService,
  ) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request) {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  //get pages list

  // // // post pages list
  // @Post('/facebook/pages')
  // async getPages(@Req() req: Request) {
  //   // console.log('hello', req.body);
  //   if (!req.body) {
  //     throw new HttpException(
  //       'Access token is required',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const response = await this.appService.getPages(req.body.access_token);
  //   return response;
  // }

  @Post('/facebook/pages/conversations')
  async getPages(@Req() req: Request) {
    const { accessToken } = req.body;
    return await this.appService.getPages(accessToken, 'messages');
  }

  @Post('/facebook/pages/messages')
  async postMessagesLIst(@Req() req: Request) {
    const { conversationId, pageToken } = req.body;

    if (!conversationId || !pageToken) {
      throw new HttpException(
        'PSID and message are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.appService.messagesList(conversationId, pageToken);
  }

  @Post('/facebook/pages/posts')
  async getPagesPosts(@Req() req: Request) {
    const { accessToken } = req.body;
    return await this.appService.getPages(accessToken);
  }

  @Post('/facebook/pages/message/add')
  async postMessages(@Req() req: Request) {
    const { psid, message, pageToken, pageId } = req.body;

    if (!psid) {
      throw new HttpException('PSID are required', HttpStatus.BAD_REQUEST);
    }

    if (!pageToken || !pageId) {
      throw new HttpException(
        ' pageToken or pageId are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.appService.sendMessage(psid, message, pageToken, pageId);
  }

  @Post('/facebook/pages/post/comments')
  async readComments(@Req() req: Request) {
    const { postId, pageToken } = req.body;
    if (!postId) {
      throw new HttpException('postId are required', HttpStatus.BAD_REQUEST);
    }

    return await this.appService.getComments(postId, pageToken);
  }

  @Post('/facebook/pages/post/comment/add')
  async postMessage(@Req() req: Request) {
    const { postId, message, pageToken } = req.body;

    if (!postId) {
      throw new HttpException(
        'postId and message are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.appService.postComments(postId, pageToken, message);
  }
  @Post('/facebook/pages/post/comment/reply/add')
  async postComment(@Req() req: Request) {
    const { commentId, message, pageToken } = req.body;
    if (!commentId || !pageToken) {
      throw new HttpException(
        'commentId or pageToken is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.appService.replyOnComment(commentId, pageToken, message);
  }

  @Post('/facebook/pages/post/comment/reply/read')
  async readComment(@Req() req: Request) {
    const { commentId, pageToken } = req.body;

    if (!commentId || !pageToken) {
      throw new HttpException(
        'commentId or pageToken is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.appService.readCommentReply(commentId, pageToken);
  }

  @Post('/facebook/pages/post/create')
  async createPosts(@Req() req: Request) {
    const { pageToken, pageId, message, photosUrl } = req.body;

    if (!pageToken || !pageId) {
      throw new HttpException(
        'pageId or pageToken is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.appService.createPosts(
      pageToken,
      pageId,
      message,
      photosUrl,
    );
  }
}
