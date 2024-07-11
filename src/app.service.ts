import { Injectable } from '@nestjs/common';
import { DataForSaveDTO } from './dto/data.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private filePath = path.join('src/db', 'db.json');

  private readJsonFile() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify({}));
      return {};
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    if (!data) {
      return {};
    }
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return {};
    }
  }

  private writeJsonFile(data: any) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing JSON:', error);
    }
  }

  async saveDataToJson(dataForSaveDTO: DataForSaveDTO): Promise<string> {
    try {
      const data = this.readJsonFile();
      const keys = Object.keys(data).map(Number);
      const nextKey = keys.length ? Math.max(...keys) + 1 : 1;
      data[nextKey] = dataForSaveDTO;
      this.writeJsonFile(data);
      return `Данные в файл JSON записаны с id = ${nextKey}`;
    } catch (e) {
      return `Не удалось записать данные в файл: ${e.message}`;
    }
  }
}
