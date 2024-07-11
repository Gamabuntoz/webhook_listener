import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DataForSaveDTO } from './dto/data.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('save')
  saveData(@Body() dataForSaveDTO: DataForSaveDTO): Promise<string> {
    return this.appService.saveDataToJson(dataForSaveDTO);
  }
}
