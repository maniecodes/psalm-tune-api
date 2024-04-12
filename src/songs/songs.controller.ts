import { Body, Controller, Param, Post } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Post(':hymnId')
  async create(@Body() songData: { songId: string; title: string; verses: [{ verseNumber: string, text: string, }] }, @Param('hymnId') hymnId: string): Promise<any> {
    return this.songsService.create(songData, hymnId);
  }
}
