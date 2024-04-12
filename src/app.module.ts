import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HymnsModule } from './hymns/hymns.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [ConfigModule.forRoot(), HymnsModule, SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
