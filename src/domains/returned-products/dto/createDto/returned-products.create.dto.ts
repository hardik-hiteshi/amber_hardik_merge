import {
  ArrayMinSize,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { HistoryStateDTO } from './subDto/HistoryStateDTO/historyState.dto';
import { LineDTO } from './subDto/LineDTO/line.dto';
import { ShippingAddressDTO } from './subDto/ShippingAddressDTO/shippingAddress.dto';
import { Type } from 'class-transformer';

export class CreateReturnedProductsDTO {
  @IsOptional()
  @IsString()
  public orderId?: string;

  @IsOptional()
  @IsString()
  public validationMail?: string;

  @IsOptional()
  @IsDateString()
  public date?: Date;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => LineDTO)
  public products: LineDTO[];

  @IsOptional()
  @IsString()
  public state: string;

  @IsOptional()
  // @IsString()
  public customer?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | null
    | undefined;

  @IsOptional()
  public customerValue?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | null
    | undefined;

  @IsOptional()
  @IsString()
  public sapReturnNumber?: string;

  @IsOptional()
  @IsString()
  public carrierLink?: string;

  @IsNotEmpty()
  @IsString()
  public returnReason?: string;

  @IsOptional()
  @IsString()
  public comments?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ShippingAddressDTO)
  public shippingAddress?: ShippingAddressDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => HistoryStateDTO)
  public historyState?: HistoryStateDTO;
}
