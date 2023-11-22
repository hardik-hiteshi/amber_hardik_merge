import {
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LineDTO } from '../createDto//subDto/LineDTO/line.dto';
import { ShippingAddressDTO } from '../createDto/subDto/ShippingAddressDTO/shippingAddress.dto';
import { Type } from 'class-transformer';

export class UpdateReturnedProductsDTO {
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => LineDTO)
  public products: LineDTO[];

  @IsNotEmpty()
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

  @IsOptional()
  @IsString()
  public comments?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ShippingAddressDTO)
  public shippingAddress?: ShippingAddressDTO;
}
