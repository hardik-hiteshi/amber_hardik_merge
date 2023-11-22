/* eslint-disable @typescript-eslint/naming-convention */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateGeoLocationDTO {
  @IsNotEmpty()
  @IsNumber()
  public network_start_ip: number;

  @IsNotEmpty()
  @IsNumber()
  public network_last_ip: number;

  @IsNotEmpty()
  @IsString()
  public latitude: string;

  @IsNotEmpty()
  @IsString()
  public longitude: string;
}
