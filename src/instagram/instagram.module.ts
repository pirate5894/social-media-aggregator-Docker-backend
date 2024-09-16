// src/instagram/instagram.module.ts
import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
// import { InstagramStrategy } from './instagram.strategy';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PassportModule, HttpModule],
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}
