import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DataForSaveDTO {
  @IsString()
  @IsNotEmpty()
  stringData: string;
  @IsNumber()
  @IsNotEmpty()
  numberData: number;
  @IsBoolean()
  @IsNotEmpty()
  booleanData: boolean;
}
