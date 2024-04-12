import { Body, Controller, Post } from '@nestjs/common';
import { HymnsService } from './hymns.service';

@Controller('hymns')
export class HymnsController {
  constructor(private readonly hymnsService: HymnsService) { }

  @Post()
  create(@Body() hymnData: any): Promise<any> {
    console.log('saving here');
    return this.hymnsService.create(hymnData);
  }
}
