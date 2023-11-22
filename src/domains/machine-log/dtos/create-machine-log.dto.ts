/* eslint-disable @typescript-eslint/naming-convention */
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMachineLogDto {
  @IsOptional()
  @IsString()
  public type: string;

  @IsOptional()
  @IsDateString()
  public date: Date;

  @IsOptional()
  @IsNumber()
  public t: number;

  @IsOptional()
  @IsString()
  public T: string;

  @IsOptional()
  @IsString()
  public S: string;

  @IsOptional()
  @IsNumber()
  public scale: number;

  @IsOptional()
  @IsString()
  public error: string;

  @IsOptional()
  @IsString()
  public serial: string;

  @IsOptional()
  @IsString()
  public wifi_status: string;

  @IsOptional()
  @IsString()
  public wifi_rssi: string;

  @IsOptional()
  @IsString()
  public wifi_signal_strength: string;

  @IsOptional()
  @IsString()
  public wifi_link_speed: string;

  @IsOptional()
  @IsNumber()
  public wifi_band: number;

  @IsOptional()
  @IsString()
  public wifi_type: string;

  @IsOptional()
  @IsString()
  public wifi_dbm: string;

  @IsOptional()
  @IsString()
  public wifi_protocol: string;

  @IsOptional()
  @IsString()
  public knob_layout_selected: string;

  @IsOptional()
  @IsString()
  public theme_selected: string;

  @IsOptional()
  @IsString()
  public tablet_boot: string;

  @IsOptional()
  @IsString()
  public tablet_time: string;

  @IsOptional()
  @IsString()
  public loginIP: string;

  @IsOptional()
  @IsString()
  public loginRegion: string;
}
