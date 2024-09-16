import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebHookService } from './webHook.service';
import { FacebookStrategy } from './facebook.strategy';
import { InstagramModule } from './instagram/instagram.module';
@Module({
  imports: [HttpModule, InstagramModule],
  controllers: [AppController],
  providers: [AppService, WebHookService, FacebookStrategy],
})
export class AppModule {}
