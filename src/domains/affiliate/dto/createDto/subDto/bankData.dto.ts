/* eslint-disable @typescript-eslint/naming-convention */
import { IsBoolean } from 'class-validator';

export class BankDataDto {
  @IsBoolean()
  public send_data: boolean;
}
